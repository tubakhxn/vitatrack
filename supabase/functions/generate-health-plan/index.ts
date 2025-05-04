
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Premade health plans for different goals and user profiles
const generatePremadeHealthPlan = (
  goal: string,
  gender: string,
  age: number,
  weight: number
) => {
  // Base modifiers depending on age group
  let intensityModifier = 1.0;
  let calorieBase = gender === "male" ? 2400 : 2000;

  // Adjust modifiers based on age
  if (age < 30) {
    intensityModifier = 1.2;
    calorieBase = gender === "male" ? 2600 : 2200;
  } else if (age > 50) {
    intensityModifier = 0.8;
    calorieBase = gender === "male" ? 2200 : 1800;
  }

  // Calculate calorie target based on goal
  let calorieTarget = calorieBase;
  let proteinPercentage = "30%";
  let carbsPercentage = "40%";
  let fatsPercentage = "30%";

  switch (goal) {
    case "fat-loss":
      calorieTarget = Math.round(calorieBase * 0.8);
      proteinPercentage = "35-40%";
      carbsPercentage = "30-35%";
      fatsPercentage = "25-30%";
      break;
    case "muscle-gain":
    case "bulking":
      calorieTarget = Math.round(calorieBase * 1.2);
      proteinPercentage = "35-40%";
      carbsPercentage = "40-45%";
      fatsPercentage = "20-25%";
      break;
    default: // stay-fit
      calorieTarget = calorieBase;
      proteinPercentage = "30-35%";
      carbsPercentage = "40-45%";
      fatsPercentage = "25-30%";
  }

  // Generate plan based on goal type
  switch (goal) {
    case "fat-loss":
      return fatLossPlan(gender, intensityModifier, calorieTarget, proteinPercentage, carbsPercentage, fatsPercentage);
    case "muscle-gain":
      return muscleGainPlan(gender, intensityModifier, calorieTarget, proteinPercentage, carbsPercentage, fatsPercentage);
    case "bulking":
      return bulkingPlan(gender, intensityModifier, calorieTarget, proteinPercentage, carbsPercentage, fatsPercentage);
    default:
      return stayFitPlan(gender, intensityModifier, calorieTarget, proteinPercentage, carbsPercentage, fatsPercentage);
  }
};

// Plan templates
const fatLossPlan = (
  gender: string,
  intensityModifier: number,
  calorieTarget: number,
  proteinPercentage: string,
  carbsPercentage: string,
  fatsPercentage: string
) => {
  return {
    workout: {
      overview: "This fat loss plan combines high-intensity interval training (HIIT) with strength training to maximize calorie burn while preserving lean muscle mass.",
      schedule: [
        {
          day: "Monday",
          focus: "Full Body HIIT",
          exercises: [
            { name: "Jumping Jacks", sets: 3, reps: "30 seconds" },
            { name: "Burpees", sets: 3, reps: "10-15" },
            { name: "Mountain Climbers", sets: 3, reps: "30 seconds" },
            { name: "Bodyweight Squats", sets: 3, reps: "15-20" },
            { name: "Push-ups", sets: 3, reps: "10-15" },
            { name: "Planks", sets: 3, reps: "30-45 seconds" }
          ]
        },
        {
          day: "Tuesday",
          focus: "Cardio & Abs",
          exercises: [
            { name: "Jogging/Running", sets: 1, reps: "20-30 minutes" },
            { name: "Bicycle Crunches", sets: 3, reps: "15-20 per side" },
            { name: "Russian Twists", sets: 3, reps: "15-20 per side" },
            { name: "Leg Raises", sets: 3, reps: "12-15" },
            { name: "Plank Rotations", sets: 3, reps: "10 per side" }
          ]
        },
        {
          day: "Wednesday",
          focus: "Upper Body & HIIT",
          exercises: [
            { name: "Push-ups", sets: 3, reps: "10-15" },
            { name: "Dumbbell Rows", sets: 3, reps: "12 per side" },
            { name: "Shoulder Press", sets: 3, reps: "10-12" },
            { name: "Tricep Dips", sets: 3, reps: "10-15" },
            { name: "30-second Sprints", sets: 5, reps: "30 sec on, 30 sec off" }
          ]
        },
        {
          day: "Thursday",
          focus: "Rest & Recover",
          exercises: [
            { name: "Light Walking", sets: 1, reps: "20-30 minutes" },
            { name: "Stretching", sets: 1, reps: "10-15 minutes" }
          ]
        },
        {
          day: "Friday",
          focus: "Lower Body & Core",
          exercises: [
            { name: "Bodyweight Squats", sets: 3, reps: "15-20" },
            { name: "Lunges", sets: 3, reps: "12 per leg" },
            { name: "Glute Bridges", sets: 3, reps: "15" },
            { name: "Calf Raises", sets: 3, reps: "15-20" },
            { name: "Planks", sets: 3, reps: "30-45 seconds" },
            { name: "Mountain Climbers", sets: 3, reps: "30 seconds" }
          ]
        },
        {
          day: "Saturday",
          focus: "HIIT Circuit",
          exercises: [
            { name: "Jumping Jacks", sets: 1, reps: "30 seconds" },
            { name: "High Knees", sets: 1, reps: "30 seconds" },
            { name: "Burpees", sets: 1, reps: "30 seconds" },
            { name: "Mountain Climbers", sets: 1, reps: "30 seconds" },
            { name: "Squat Jumps", sets: 1, reps: "30 seconds" },
            { name: "Rest", sets: 1, reps: "60 seconds" },
            { name: "Repeat Circuit 3-5 times", sets: 1, reps: "" }
          ]
        },
        {
          day: "Sunday",
          focus: "Active Recovery",
          exercises: [
            { name: "Walk/Light Jog", sets: 1, reps: "30-45 minutes" },
            { name: "Full Body Stretching", sets: 1, reps: "15-20 minutes" }
          ]
        }
      ]
    },
    diet: {
      overview: "This calorie-controlled diet emphasizes protein and fiber-rich foods to keep you feeling full while in a caloric deficit. Focus on whole foods and proper hydration.",
      calories: `${calorieTarget} calories daily`,
      macros: {
        protein: proteinPercentage,
        carbs: carbsPercentage,
        fats: fatsPercentage
      },
      meals: [
        {
          title: "Breakfast",
          options: [
            "Protein smoothie with spinach, berries, and protein powder",
            "Egg white omelet with vegetables and a slice of whole grain toast",
            "Greek yogurt with berries and a tablespoon of nuts"
          ]
        },
        {
          title: "Lunch",
          options: [
            "Grilled chicken salad with mixed greens and light dressing",
            "Turkey and vegetable wrap with whole grain tortilla",
            "Tuna salad (made with Greek yogurt) on a bed of greens"
          ]
        },
        {
          title: "Dinner",
          options: [
            "Baked fish with steamed vegetables and quinoa",
            "Lean protein (chicken/tofu) stir-fry with lots of vegetables",
            "Turkey meatballs with zucchini noodles and tomato sauce"
          ]
        },
        {
          title: "Snacks",
          options: [
            "Apple slices with 1 tablespoon almond butter",
            "Protein shake or bar (under 200 calories)",
            "Carrot sticks with hummus",
            "Greek yogurt with berries"
          ]
        }
      ]
    }
  };
};

const muscleGainPlan = (
  gender: string,
  intensityModifier: number,
  calorieTarget: number,
  proteinPercentage: string,
  carbsPercentage: string,
  fatsPercentage: string
) => {
  return {
    workout: {
      overview: "This muscle gain program follows a push/pull/legs split with an emphasis on progressive overload. Focus on compound movements and gradually increasing weight.",
      schedule: [
        {
          day: "Monday",
          focus: "Push (Chest, Shoulders, Triceps)",
          exercises: [
            { name: "Bench Press or Push-ups", sets: 4, reps: "8-10" },
            { name: "Overhead Press", sets: 3, reps: "8-10" },
            { name: "Incline Dumbbell Press", sets: 3, reps: "10-12" },
            { name: "Lateral Raises", sets: 3, reps: "12-15" },
            { name: "Tricep Pushdowns", sets: 3, reps: "12-15" },
            { name: "Tricep Dips", sets: 3, reps: "8-12" }
          ]
        },
        {
          day: "Tuesday",
          focus: "Pull (Back, Biceps)",
          exercises: [
            { name: "Pull-ups or Lat Pulldowns", sets: 4, reps: "8-10" },
            { name: "Bent-over Rows or Dumbbell Rows", sets: 3, reps: "8-10" },
            { name: "Face Pulls", sets: 3, reps: "12-15" },
            { name: "Bicep Curls", sets: 3, reps: "10-12" },
            { name: "Hammer Curls", sets: 3, reps: "10-12" },
            { name: "Reverse Flyes", sets: 3, reps: "12-15" }
          ]
        },
        // More workout plan details...
        {
          day: "Sunday",
          focus: "Rest & Active Recovery",
          exercises: [
            { name: "Light Walking", sets: 1, reps: "30 minutes" },
            { name: "Full Body Stretching", sets: 1, reps: "20 minutes" },
            { name: "Mobility Work", sets: 1, reps: "10-15 minutes" }
          ]
        }
      ]
    },
    diet: {
      overview: "This muscle building diet focuses on a calorie surplus with high protein intake. Meals are timed around workouts for optimal muscle recovery and growth.",
      calories: `${calorieTarget} calories daily`,
      macros: {
        protein: proteinPercentage,
        carbs: carbsPercentage,
        fats: fatsPercentage
      },
      meals: [
        {
          title: "Breakfast",
          options: [
            "Protein oatmeal with banana and nut butter",
            "Whole eggs with whole grain toast and avocado",
            "Protein smoothie with oats, banana, protein powder, and milk"
          ]
        },
        // More meal options...
      ]
    }
  };
};

const bulkingPlan = (
  gender: string,
  intensityModifier: number, 
  calorieTarget: number,
  proteinPercentage: string,
  carbsPercentage: string,
  fatsPercentage: string
) => {
  return {
    workout: {
      overview: "This bulking program focuses on heavy compound lifts and progressive overload to maximize muscle and strength gains during a calorie surplus phase.",
      schedule: [
        {
          day: "Monday",
          focus: "Heavy Lower Body",
          exercises: [
            { name: "Squats", sets: 5, reps: "5-6" },
            { name: "Deadlifts", sets: 4, reps: "5-6" },
            { name: "Leg Press", sets: 3, reps: "8-10" },
            { name: "Leg Curls", sets: 3, reps: "10-12" },
            { name: "Standing Calf Raises", sets: 4, reps: "12-15" }
          ]
        },
        // More workout plan details...
      ]
    },
    diet: {
      overview: "This bulking diet provides a significant calorie surplus to support maximum muscle growth. Focus on nutrient-dense whole foods with strategic higher-calorie options.",
      calories: `${calorieTarget} calories daily`,
      macros: {
        protein: proteinPercentage,
        carbs: carbsPercentage,
        fats: fatsPercentage
      },
      meals: [
        {
          title: "Breakfast",
          options: [
            "5 whole eggs scrambled with cheese, vegetables, and 2 slices of toast with butter",
            "Protein pancakes (2 scoops protein powder, 1 banana, 2 eggs) with maple syrup and berries",
            "Large bowl of oatmeal with protein powder, banana, nut butter, and milk"
          ]
        },
        // More meal options...
      ]
    }
  };
};

const stayFitPlan = (
  gender: string,
  intensityModifier: number,
  calorieTarget: number,
  proteinPercentage: string,
  carbsPercentage: string,
  fatsPercentage: string
) => {
  return {
    workout: {
      overview: "This balanced fitness plan incorporates a mix of strength training, cardio, and flexibility work to maintain overall health and fitness.",
      schedule: [
        {
          day: "Monday",
          focus: "Full Body Strength",
          exercises: [
            { name: "Bodyweight Squats", sets: 3, reps: "12-15" },
            { name: "Push-ups", sets: 3, reps: "10-12" },
            { name: "Dumbbell Rows", sets: 3, reps: "10-12 per arm" },
            { name: "Lunges", sets: 2, reps: "10 per leg" },
            { name: "Plank", sets: 3, reps: "30-45 seconds" }
          ]
        },
        // More workout plan details...
      ]
    },
    diet: {
      overview: "This balanced diet focuses on whole foods, proper portion control, and regular meals to maintain your current fitness level and support overall health.",
      calories: `${calorieTarget} calories daily`,
      macros: {
        protein: proteinPercentage,
        carbs: carbsPercentage,
        fats: fatsPercentage
      },
      meals: [
        {
          title: "Breakfast",
          options: [
            "Overnight oats with Greek yogurt, berries, and a sprinkle of nuts",
            "Whole grain toast with avocado and poached egg",
            "Breakfast smoothie (protein powder, spinach, banana, almond milk)"
          ]
        },
        // More meal options...
      ]
    }
  };
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body
    const { userProfile, goalType } = await req.json();
    
    if (!userProfile || !goalType) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { headers: { 'Content-Type': 'application/json', ...corsHeaders }, status: 400 }
      );
    }

    // Generate the health plan based on user profile
    const healthPlan = generatePremadeHealthPlan(
      goalType,
      userProfile.gender || 'male',
      userProfile.age || 30,
      userProfile.weight || 70
    );
    
    // Return the health plan
    return new Response(
      JSON.stringify({ healthPlan }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders }, status: 500 }
    );
  }
});
