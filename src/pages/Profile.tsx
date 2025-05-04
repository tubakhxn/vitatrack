
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import MainLayout from "@/components/layout/MainLayout";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [profileData, setProfileData] = useState({
    gender: "",
    age: "",
    weight: "",
    height: "",
    goal: ""
  });
  const [loading, setLoading] = useState(true);

  // Get user session
  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        toast.error("You need to be logged in to view this page");
        navigate("/login");
        return;
      }
      
      setUserId(session.user.id);
      setEmail(session.user.email || "");
    };

    getUser();
  }, [navigate]);

  // Fetch user profile from Supabase
  const { data: userProfile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: async () => {
      if (!userId) return null;
      
      const { data, error } = await supabase
        .from("user_profiles")
        .select("gender, age, weight, height")
        .eq("user_id", userId)
        .limit(1)
        .single();
      
      if (error && error.code !== "PGRST116") { // PGRST116 is "no rows returned" error
        console.error("Error fetching user profile:", error);
        return null;
      }
      
      return data;
    },
    enabled: !!userId
  });

  // Fetch user goal from Supabase
  const { data: userGoal, isLoading: isLoadingGoal } = useQuery({
    queryKey: ["userGoal", userId],
    queryFn: async () => {
      if (!userId) return null;
      
      const { data, error } = await supabase
        .from("user_goals")
        .select("goal_type")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
      
      if (error && error.code !== "PGRST116") {
        console.error("Error fetching user goal:", error);
        return null;
      }
      
      return data?.goal_type || "stay-fit";
    },
    enabled: !!userId
  });

  // Update state when data is loaded
  useEffect(() => {
    if (userProfile) {
      setProfileData(prev => ({
        ...prev,
        gender: userProfile.gender || "",
        age: userProfile.age ? String(userProfile.age) : "",
        weight: userProfile.weight ? String(userProfile.weight) : "",
        height: userProfile.height ? String(userProfile.height) : ""
      }));
    }
    
    if (userGoal) {
      setProfileData(prev => ({
        ...prev,
        goal: userGoal
      }));
    }

    if (!isLoadingProfile && !isLoadingGoal) {
      setLoading(false);
    }
  }, [userProfile, userGoal, isLoadingProfile, isLoadingGoal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (value: string) => {
    setProfileData(prev => ({ ...prev, gender: value }));
  };

  const handleGoalChange = (value: string) => {
    setProfileData(prev => ({ ...prev, goal: value }));
  };

  // Update user profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("Not authenticated");
      
      // Update user profile
      const { error: profileError } = await supabase
        .from("user_profiles")
        .upsert({
          user_id: userId,
          gender: profileData.gender,
          age: profileData.age ? parseInt(profileData.age) : null,
          weight: profileData.weight ? parseFloat(profileData.weight) : null,
          height: profileData.height ? parseInt(profileData.height) : null
        });
      
      if (profileError) throw profileError;
      
      // Update user goal if changed
      if (profileData.goal) {
        const { error: goalError } = await supabase
          .from("user_goals")
          .insert({
            user_id: userId,
            goal_type: profileData.goal
          });
        
        if (goalError) throw goalError;
      }
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["userGoal"] });
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate();
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex justify-center">
            <p>Loading your profile...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
          <p className="text-white">Manage your personal information</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your account details here</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={email}
                  disabled
                  className="bg-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup
                  value={profileData.gender}
                  onValueChange={handleGenderChange}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={profileData.age}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    step="0.1"
                    value={profileData.weight}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    value={profileData.height}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal">Fitness Goal</Label>
                <Select
                  value={profileData.goal}
                  onValueChange={handleGoalChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stay-fit">Stay Fit</SelectItem>
                    <SelectItem value="bulking">Bulking</SelectItem>
                    <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                    <SelectItem value="fat-loss">Fat Loss</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit"
                disabled={updateProfileMutation.isPending}
              >
                {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Profile;
