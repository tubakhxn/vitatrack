
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const OnboardingForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    weight: "",
    height: "",
    goal: "stay-fit"
  });

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error checking session:', error);
          setIsLoading(false);
          return;
        }
        
        if (!session) {
          toast.error('You must be logged in to access this page');
          navigate('/login');
          return;
        }
        
        setUserId(session.user.id);

        // Check if user already has profile data
        const { data: profileData } = await supabase
          .from("user_profiles")
          .select("gender, age, height, weight, completed_onboarding")
          .eq("user_id", session.user.id)
          .limit(1)
          .single();

        // If user already completed onboarding, redirect to goals page
        if (profileData && profileData.completed_onboarding) {
          navigate('/goals');
          return;
        }

        // If user has some profile data but hasn't completed onboarding, use it
        if (profileData) {
          setFormData(prev => ({
            ...prev,
            gender: profileData.gender || "",
            age: profileData.age ? String(profileData.age) : "",
            weight: profileData.weight ? String(profileData.weight) : "",
            height: profileData.height ? String(profileData.height) : "",
          }));
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Session check failed:', err);
        toast.error('Failed to verify your session. Please log in again.');
        navigate('/login');
      }
    };
    
    checkUserSession();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const handleGoalChange = (value: string) => {
    setFormData((prev) => ({ ...prev, goal: value }));
  };

  const handleNext = () => {
    if (step === 1 && !formData.gender) {
      toast.error("Please select your gender");
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId) {
      toast.error('User session not found');
      return;
    }

    try {
      // Save user profile data
      const { error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: userId,
          gender: formData.gender,
          age: parseInt(formData.age),
          weight: parseFloat(formData.weight),
          height: parseInt(formData.height),
          completed_onboarding: true
        });

      if (profileError) throw profileError;

      // Save user goal
      const { error: goalError } = await supabase
        .from('user_goals')
        .insert({
          user_id: userId,
          goal_type: formData.goal
        });

      if (goalError) throw goalError;
      
      // Redirect to goals page after successful profile creation
      toast.success("Profile information saved!");
      navigate("/goals");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile information. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto bg-gray-800 text-white">
        <CardContent className="pt-6">
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-healthBlue"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-800 text-white">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Tell us about yourself</CardTitle>
        <CardDescription className="text-gray-300">We need some information to personalize your experience</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= i ? "bg-healthBlue text-white" : "bg-gray-700 text-gray-400"
              }`}
            >
              {i}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-gray-200">Gender</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={handleGenderChange}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2 border border-gray-700 rounded-md p-3 bg-gray-700">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="text-gray-200">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2 border border-gray-700 rounded-md p-3 bg-gray-700">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="text-gray-200">Female</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="text-gray-200">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="bg-gray-700 text-white border-gray-600"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-gray-200">Weight (kg)</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  step="0.1"
                  placeholder="Enter your weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  className="bg-gray-700 text-white border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height" className="text-gray-200">Height (cm)</Label>
                <Input
                  id="height"
                  name="height"
                  type="number"
                  placeholder="Enter your height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                  className="bg-gray-700 text-white border-gray-600"
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goal" className="text-gray-200">Fitness Goal</Label>
                <Select 
                  value={formData.goal} 
                  onValueChange={handleGoalChange}
                >
                  <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-white border-gray-700">
                    <SelectItem value="stay-fit">Stay Fit</SelectItem>
                    <SelectItem value="bulking">Bulking</SelectItem>
                    <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                    <SelectItem value="fat-loss">Fat Loss</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button variant="outline" onClick={handleBack} className="border-gray-600 text-white hover:bg-gray-700">
            Back
          </Button>
        )}
        {step < 4 ? (
          <Button onClick={handleNext} className={`${step === 1 ? "ml-auto" : ""}`}>
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit}>Complete Profile</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default OnboardingForm;
