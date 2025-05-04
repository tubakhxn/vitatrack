
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import WorkoutPlan from "./WorkoutPlan";
import DietPlan from "./DietPlan";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { HealthPlanData } from "@/types/healthPlan";
import { useNavigate } from "react-router-dom";
import { premadeHealthPlans } from "@/utils/premadeHealthPlans";

const HealthPlanGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Get the user's ID on component mount
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user?.id) {
          console.log("No user session found");
          toast.error("Please log in to access your health plan");
          navigate("/login");
          return;
        }
        setUserId(session.user.id);
        console.log("User ID set:", session.user.id);
      } catch (error) {
        console.error("Error getting user session:", error);
        toast.error("Failed to authenticate user");
        navigate("/login");
      }
    };
    getUser();
  }, [navigate]);

  // Fetch user profile with more detailed error handling
  const { data: userProfile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: async () => {
      if (!userId) {
        console.log("Cannot fetch profile: No user ID");
        return null;
      }
      
      console.log("Fetching user profile for userId:", userId);
      
      try {
        const { data, error } = await supabase
          .from("user_profiles")
          .select("age, gender, height, weight, completed_onboarding")
          .eq("user_id", userId)
          .limit(1)
          .single();
        
        if (error) {
          console.error("Error fetching user profile:", error);
          // Return default values instead of null when no profile is found
          if (error.code === 'PGRST116') {
            console.log("No profile found, using default values");
            return {
              age: 30,
              gender: "male",
              height: 175,
              weight: 75,
              completed_onboarding: false
            };
          }
          throw error;
        }
        
        console.log("User profile data:", data);
        return data;
      } catch (error) {
        console.error("Profile fetch exception:", error);
        // Return default values on any error
        return {
          age: 30,
          gender: "male",
          height: 175,
          weight: 75,
          completed_onboarding: false
        };
      }
    },
    enabled: !!userId,
    retry: 1
  });

  // Fetch user goal
  const { data: userGoal, isLoading: isLoadingGoal } = useQuery({
    queryKey: ["userGoal", userId],
    queryFn: async () => {
      if (!userId) {
        console.log("Cannot fetch goal: No user ID");
        return "stay-fit"; // Default goal
      }
      
      console.log("Fetching user goal for userId:", userId);
      
      try {
        const { data, error } = await supabase
          .from("user_goals")
          .select("goal_type")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        
        if (error) {
          console.error("Error fetching user goal:", error);
          throw error;
        }
        
        console.log("User goal data:", data);
        return data?.goal_type || "stay-fit"; // Default to "stay-fit" if no goal
      } catch (error) {
        console.error("Goal fetch exception:", error);
        return "stay-fit"; // Default to "stay-fit" on error
      }
    },
    enabled: !!userId,
    retry: 1
  });

  // Fetch existing health plan
  const { data: healthPlan, isLoading: isLoadingPlan } = useQuery({
    queryKey: ["healthPlan", userId],
    queryFn: async () => {
      if (!userId) {
        console.log("Cannot fetch health plan: No user ID");
        return null;
      }
      
      console.log("Fetching health plan for userId:", userId);
      
      try {
        const { data, error } = await supabase
          .from("health_plans")
          .select("plan_data")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        
        if (error) {
          console.error("Error fetching health plan:", error);
          throw error;
        }

        console.log("Raw health plan data:", data);

        // Validate the health plan structure
        if (data && data.plan_data) {
          try {
            // Safely parse and validate the plan data
            const planData = typeof data.plan_data === 'string' 
              ? JSON.parse(data.plan_data) 
              : data.plan_data;
            
            // Verify it has the expected structure
            if (planData && 
                typeof planData === 'object' && 
                'workout' in planData && 
                'diet' in planData) {
              
              console.log("Valid health plan found");
              return planData as HealthPlanData;
            }
          } catch (e) {
            console.error("Error parsing health plan data:", e);
          }
        }
        
        return null;
      } catch (error) {
        console.error("Health plan fetch exception:", error);
        return null;
      }
    },
    enabled: !!userId,
    retry: 1
  });

  // Generate and save health plan
  const generatePlanMutation = useMutation({
    mutationFn: async () => {
      if (!userId) {
        throw new Error("User not authenticated");
      }

      setIsGenerating(true);
      
      try {
        const profile = userProfile || {
          gender: "male",
          age: 30,
          weight: 75,
          goal: "stay-fit"
        };
        
        const goal = userGoal || "stay-fit";
        
        console.log("Generating health plan for profile:", {
          gender: profile.gender,
          age: profile.age,
          weight: profile.weight,
          goal: goal
        });
        
        // Get appropriate premade health plan based on user data
        let planKey = `${goal}-${profile.gender}`;
        
        // Add age group to key
        if (profile.age < 30) {
          planKey += "-young";
        } else if (profile.age < 50) {
          planKey += "-middle";
        } else {
          planKey += "-senior";
        }
        
        console.log("Looking for plan with key:", planKey);
        
        // Try to find an exact match, then fall back to progressively less specific plans
        let healthPlan = premadeHealthPlans[planKey] || 
                        premadeHealthPlans[`${goal}-${profile.gender}`] || 
                        premadeHealthPlans[goal] || 
                        premadeHealthPlans["general"];
        
        console.log("Selected health plan key:", healthPlan ? "Found" : "Not found");
        
        if (!healthPlan) {
          throw new Error("Failed to find suitable health plan");
        }
        
        // Convert the HealthPlanData object to a plain JSON string for Supabase storage
        const healthPlanJson = JSON.stringify(healthPlan);
        
        // Save the selected plan to Supabase
        const { error: saveError } = await supabase
          .from("health_plans")
          .insert({ 
            plan_data: healthPlanJson,
            user_id: userId
          });

        if (saveError) throw saveError;

        return healthPlan;
      } finally {
        setIsGenerating(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["healthPlan"] });
      toast.success("Your personalized health plan is ready!");
    },
    onError: (error: any) => {
      console.error("Error generating health plan:", error);
      toast.error("Failed to generate health plan. Please try again.");
    }
  });

  const handleGeneratePlan = () => {
    if (!userId) {
      toast.error("You must be logged in to generate a plan");
      return;
    }
    
    generatePlanMutation.mutate();
  };

  const isLoading = isLoadingProfile || isLoadingGoal || isLoadingPlan;
  // Always show the healthPlan if it exists or display the generate button
  const showGenerateButton = !healthPlan || Object.keys(healthPlan).length === 0;

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto flex justify-center items-center py-10">
        <p className="text-white">Loading your health plan...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-white">Your Personalized Health Plan</h1>
        <p className="text-gray-300">
          Get a custom workout and diet plan based on your goals and profile
        </p>
      </div>

      {showGenerateButton ? (
        <Card className="bg-gray-950 border-gray-800 text-white">
          <CardHeader>
            <CardTitle>Generate Your Health Plan</CardTitle>
            <CardDescription className="text-gray-300">
              We'll analyze your profile data and fitness goals to create a personalized plan
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-6">
            <img
              src="https://images.unsplash.com/photo-1594882645126-14020914d58d"
              alt="Health Planning"
              className="w-full max-w-md h-auto rounded-lg opacity-80"
            />
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <Button 
              onClick={handleGeneratePlan} 
              disabled={isGenerating}
              className="mb-2"
            >
              {isGenerating ? "Generating..." : "Generate My Plan"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <Button
              variant="outline"
              onClick={handleGeneratePlan}
              disabled={isGenerating}
            >
              {isGenerating ? "Regenerating..." : "Regenerate Plan"}
            </Button>
          </div>
          <Tabs defaultValue="workout">
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8 bg-black">
              <TabsTrigger value="workout" className="data-[state=active]:bg-healthBlue">Workout Plan</TabsTrigger>
              <TabsTrigger value="diet" className="data-[state=active]:bg-healthBlue">Diet Plan</TabsTrigger>
            </TabsList>
            <TabsContent value="workout">
              {healthPlan && 'workout' in healthPlan && (
                <WorkoutPlan plan={healthPlan.workout} />
              )}
            </TabsContent>
            <TabsContent value="diet">
              {healthPlan && 'diet' in healthPlan && (
                <DietPlan plan={healthPlan.diet} />
              )}
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default HealthPlanGenerator;
