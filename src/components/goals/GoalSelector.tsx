
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import GoalCard from "./GoalCard";
import { supabase } from "@/integrations/supabase/client";
import { useMutation, useQuery } from "@tanstack/react-query";

const goals = [
  {
    id: "stay-fit",
    title: "Stay Fit",
    description: "Maintain your current fitness level with balanced workouts and nutrition.",
    icon: "target",
  },
  {
    id: "bulking",
    title: "Bulking",
    description: "Increase muscle mass and strength with progressive overload training.",
    icon: "dumbbell",
  },
  {
    id: "muscle-gain",
    title: "Muscle Gain",
    description: "Focus on building lean muscle while minimizing fat gain.",
    icon: "activity",
  },
  {
    id: "fat-loss",
    title: "Fat Loss",
    description: "Reduce body fat while preserving muscle mass for a leaner physique.",
    icon: "weight",
  },
];

const GoalSelector = () => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Get the user's ID on component mount
  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id || null);
    };
    getUser();
  }, []);

  // Fetch user's current goal from Supabase
  const { data: userGoal, isLoading } = useQuery({
    queryKey: ["userGoal"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_goals")
        .select("goal_type")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
      
      if (error && error.code !== "PGRST116") { // PGRST116 is "no rows returned" error
        toast.error("Failed to fetch your goal");
        console.error(error);
      }
      
      return data?.goal_type || null;
    },
  });

  // Set selected goal from fetched data
  useEffect(() => {
    if (userGoal) {
      setSelectedGoal(userGoal);
    }
  }, [userGoal]);

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
  };

  // Save goal to Supabase
  const mutation = useMutation({
    mutationFn: async (goalType: string) => {
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const { error } = await supabase
        .from("user_goals")
        .insert({ 
          goal_type: goalType,
          user_id: userId
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Fitness goal saved!");
      navigate("/plan");
    },
    onError: (error) => {
      toast.error("Failed to save goal");
      console.error(error);
    }
  });

  const handleSubmit = () => {
    if (!selectedGoal) {
      toast.error("Please select a fitness goal");
      return;
    }

    if (!userId) {
      toast.error("You must be logged in to save a goal");
      navigate("/login");
      return;
    }

    mutation.mutate(selectedGoal);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto flex justify-center items-center py-10">
        <p>Loading your goals...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Choose Your Fitness Goal</h1>
        <p className="text-white">
          Select the fitness goal that best aligns with what you want to achieve
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            isSelected={selectedGoal === goal.id}
            onSelect={handleGoalSelect}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button 
          onClick={handleSubmit} 
          size="lg"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Saving..." : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default GoalSelector;
