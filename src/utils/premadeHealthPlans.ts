
import { WorkoutPlanData, DietPlanData, HealthPlanData } from "@/types/healthPlan";

// Define all plan template functions first
const fatLossPlan = (
  gender: string,
  intensityModifier: number,
  calorieTarget: number,
  proteinPercentage: string,
  carbsPercentage: string,
  fatsPercentage: string
): HealthPlanData => {
  const workoutPlan: WorkoutPlanData = {
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
  };

  const dietPlan: DietPlanData = {
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
  };

  return { workout: workoutPlan, diet: dietPlan };
};

const muscleGainPlan = (
  gender: string,
  intensityModifier: number,
  calorieTarget: number,
  proteinPercentage: string,
  carbsPercentage: string,
  fatsPercentage: string
): HealthPlanData => {
  const workoutPlan: WorkoutPlanData = {
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
      {
        day: "Wednesday",
        focus: "Legs & Core",
        exercises: [
          { name: "Squats or Leg Press", sets: 4, reps: "8-10" },
          { name: "Romanian Deadlifts", sets: 3, reps: "8-10" },
          { name: "Lunges", sets: 3, reps: "10-12 per leg" },
          { name: "Leg Extensions", sets: 3, reps: "12-15" },
          { name: "Leg Curls", sets: 3, reps: "12-15" },
          { name: "Planks", sets: 3, reps: "30-60 seconds" },
          { name: "Russian Twists", sets: 3, reps: "15-20 per side" }
        ]
      },
      {
        day: "Thursday",
        focus: "Rest & Recover",
        exercises: [
          { name: "Light Cardio", sets: 1, reps: "20-30 minutes" },
          { name: "Stretching", sets: 1, reps: "15-20 minutes" }
        ]
      },
      {
        day: "Friday",
        focus: "Push (Chest, Shoulders, Triceps)",
        exercises: [
          { name: "Incline Bench Press", sets: 4, reps: "8-10" },
          { name: "Dumbbell Shoulder Press", sets: 3, reps: "8-10" },
          { name: "Chest Flyes", sets: 3, reps: "10-12" },
          { name: "Front Raises", sets: 3, reps: "12-15" },
          { name: "Skull Crushers", sets: 3, reps: "10-12" },
          { name: "Overhead Tricep Extensions", sets: 3, reps: "12-15" }
        ]
      },
      {
        day: "Saturday",
        focus: "Pull & Legs",
        exercises: [
          { name: "Deadlifts", sets: 4, reps: "6-8" },
          { name: "Pull-ups or Chin-ups", sets: 3, reps: "8-10" },
          { name: "Cable Rows", sets: 3, reps: "10-12" },
          { name: "Calf Raises", sets: 4, reps: "15-20" },
          { name: "Preacher Curls", sets: 3, reps: "10-12" },
          { name: "Leg Raises", sets: 3, reps: "12-15" }
        ]
      },
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
  };

  const dietPlan: DietPlanData = {
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
      {
        title: "Lunch",
        options: [
          "Chicken breast with brown rice and vegetables",
          "Tuna or salmon wrap with whole grain tortilla and avocado",
          "Lean beef or turkey burger with sweet potato fries"
        ]
      },
      {
        title: "Pre-Workout Snack",
        options: [
          "Banana with 1 tablespoon of peanut butter",
          "Greek yogurt with berries",
          "Apple with protein shake"
        ]
      },
      {
        title: "Post-Workout Meal",
        options: [
          "Protein shake with banana and a handful of berries",
          "Grilled chicken with rice and vegetables",
          "Greek yogurt with granola and fruit"
        ]
      },
      {
        title: "Dinner",
        options: [
          "Salmon with quinoa and roasted vegetables",
          "Lean steak with baked potato and broccoli",
          "Chicken stir-fry with brown rice or rice noodles"
        ]
      },
      {
        title: "Evening Snack",
        options: [
          "Cottage cheese with berries",
          "Protein shake with almond milk",
          "Greek yogurt with a drizzle of honey and nuts"
        ]
      }
    ]
  };

  return { workout: workoutPlan, diet: dietPlan };
};

const bulkingPlan = (
  gender: string,
  intensityModifier: number, 
  calorieTarget: number,
  proteinPercentage: string,
  carbsPercentage: string,
  fatsPercentage: string
): HealthPlanData => {
  const workoutPlan: WorkoutPlanData = {
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
      {
        day: "Tuesday",
        focus: "Heavy Upper Body",
        exercises: [
          { name: "Bench Press", sets: 5, reps: "5-6" },
          { name: "Barbell Rows", sets: 4, reps: "6-8" },
          { name: "Overhead Press", sets: 4, reps: "6-8" },
          { name: "Weighted Dips", sets: 3, reps: "8-10" },
          { name: "Barbell Curls", sets: 3, reps: "8-10" },
          { name: "Tricep Pushdowns", sets: 3, reps: "10-12" }
        ]
      },
      {
        day: "Wednesday",
        focus: "Rest & Recovery",
        exercises: [
          { name: "Light Walking", sets: 1, reps: "20-30 minutes" },
          { name: "Stretching & Foam Rolling", sets: 1, reps: "15-20 minutes" }
        ]
      },
      {
        day: "Thursday",
        focus: "Hypertrophy Lower Body",
        exercises: [
          { name: "Front Squats", sets: 4, reps: "8-10" },
          { name: "Romanian Deadlifts", sets: 4, reps: "8-10" },
          { name: "Walking Lunges", sets: 3, reps: "10-12 per leg" },
          { name: "Hack Squats", sets: 3, reps: "10-12" },
          { name: "Seated Calf Raises", sets: 4, reps: "15-20" },
          { name: "Weighted Ab Crunches", sets: 3, reps: "12-15" }
        ]
      },
      {
        day: "Friday",
        focus: "Hypertrophy Upper Body",
        exercises: [
          { name: "Incline Dumbbell Press", sets: 4, reps: "8-10" },
          { name: "Pull-ups or Lat Pulldowns", sets: 4, reps: "8-10" },
          { name: "Dumbbell Shoulder Press", sets: 4, reps: "8-10" },
          { name: "Cable Flyes", sets: 3, reps: "10-12" },
          { name: "Concentration Curls", sets: 3, reps: "10-12" },
          { name: "Skullcrushers", sets: 3, reps: "10-12" }
        ]
      },
      {
        day: "Saturday",
        focus: "Strongman/Functional",
        exercises: [
          { name: "Farmer's Walks", sets: 4, reps: "30-40 steps" },
          { name: "Tire Flips or Kettlebell Swings", sets: 4, reps: "8-10" },
          { name: "Sled Push/Pull", sets: 3, reps: "30 seconds" },
          { name: "Medicine Ball Slams", sets: 3, reps: "12-15" },
          { name: "Sandbag Carries", sets: 3, reps: "30-40 steps" }
        ]
      },
      {
        day: "Sunday",
        focus: "Complete Rest",
        exercises: [
          { name: "Rest & Recovery", sets: 1, reps: "Full day" },
          { name: "Optional Light Stretching", sets: 1, reps: "10-15 minutes" }
        ]
      }
    ]
  };

  const dietPlan: DietPlanData = {
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
      {
        title: "Mid-Morning Snack",
        options: [
          "Protein smoothie with 2 scoops protein, banana, oats, peanut butter, and whole milk",
          "2-3 hard boiled eggs and an apple with nut butter",
          "Greek yogurt with granola, berries, and honey"
        ]
      },
      {
        title: "Lunch",
        options: [
          "2 cups of rice with 8oz chicken breast and avocado",
          "Beef burrito with rice, beans, cheese, and avocado",
          "Large tuna melt sandwich with cheese and side of chips"
        ]
      },
      {
        title: "Pre-Workout Meal",
        options: [
          "2 pieces of fruit and protein shake",
          "Bagel with cream cheese or peanut butter",
          "Rice cakes with jam and protein shake"
        ]
      },
      {
        title: "Post-Workout",
        options: [
          "Protein shake with banana and 2 tbsp honey",
          "White rice with ground beef/turkey and vegetables",
          "Chicken wrap with rice and vegetables"
        ]
      },
      {
        title: "Dinner",
        options: [
          "12oz steak with baked potato and vegetables",
          "Salmon with rice and asparagus",
          "Large pasta dish with ground beef, vegetables, and sauce"
        ]
      },
      {
        title: "Before Bed",
        options: [
          "Cottage cheese with nut butter and berries",
          "Casein protein shake with almond butter",
          "Greek yogurt with honey and nuts"
        ]
      }
    ]
  };

  return { workout: workoutPlan, diet: dietPlan };
};

const stayFitPlan = (
  gender: string,
  intensityModifier: number,
  calorieTarget: number,
  proteinPercentage: string,
  carbsPercentage: string,
  fatsPercentage: string
): HealthPlanData => {
  const workoutPlan: WorkoutPlanData = {
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
      {
        day: "Tuesday",
        focus: "Cardio",
        exercises: [
          { name: "Brisk Walking or Jogging", sets: 1, reps: "30 minutes" },
          { name: "Jumping Jacks", sets: 3, reps: "30 seconds" },
          { name: "High Knees", sets: 3, reps: "30 seconds" },
          { name: "Stretching", sets: 1, reps: "10 minutes" }
        ]
      },
      {
        day: "Wednesday",
        focus: "Upper Body & Core",
        exercises: [
          { name: "Modified Push-ups", sets: 3, reps: "10-12" },
          { name: "Dumbbell Shoulder Press", sets: 3, reps: "10-12" },
          { name: "Tricep Dips", sets: 3, reps: "10-12" },
          { name: "Bicycle Crunches", sets: 3, reps: "15-20" },
          { name: "Russian Twists", sets: 3, reps: "10-12 each side" }
        ]
      },
      {
        day: "Thursday",
        focus: "Rest or Light Activity",
        exercises: [
          { name: "Walking", sets: 1, reps: "20-30 minutes" },
          { name: "Gentle Stretching", sets: 1, reps: "10-15 minutes" }
        ]
      },
      {
        day: "Friday",
        focus: "Lower Body",
        exercises: [
          { name: "Bodyweight Squats", sets: 3, reps: "15" },
          { name: "Step-ups", sets: 3, reps: "10 each leg" },
          { name: "Glute Bridges", sets: 3, reps: "12-15" },
          { name: "Calf Raises", sets: 3, reps: "15-20" },
          { name: "Wall Sit", sets: 3, reps: "30-45 seconds" }
        ]
      },
      {
        day: "Saturday",
        focus: "Cardio & Flexibility",
        exercises: [
          { name: "Brisk Walking, Cycling or Swimming", sets: 1, reps: "30-45 minutes" },
          { name: "Full Body Stretching", sets: 1, reps: "15-20 minutes" },
          { name: "Foam Rolling", sets: 1, reps: "5-10 minutes" }
        ]
      },
      {
        day: "Sunday",
        focus: "Rest Day",
        exercises: [
          { name: "Complete Rest or Light Walking", sets: 1, reps: "As desired" },
          { name: "Optional Yoga or Stretching", sets: 1, reps: "15-20 minutes" }
        ]
      }
    ]
  };

  const dietPlan: DietPlanData = {
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
      {
        title: "Lunch",
        options: [
          "Mixed green salad with grilled chicken, vegetables, and olive oil dressing",
          "Whole grain wrap with turkey, avocado, and vegetables",
          "Quinoa bowl with roasted vegetables and chickpeas"
        ]
      },
      {
        title: "Dinner",
        options: [
          "Baked fish with roasted sweet potatoes and steamed vegetables",
          "Stir-fry with lean protein (tofu/chicken), vegetables, and brown rice",
          "Hearty vegetable soup with a side of whole grain bread"
        ]
      },
      {
        title: "Snacks",
        options: [
          "Apple with 1-2 tablespoons of nut butter",
          "Greek yogurt with berries",
          "Hummus with carrot and cucumber sticks",
          "Small handful of mixed nuts and dried fruit"
        ]
      }
    ]
  };

  return { workout: workoutPlan, diet: dietPlan };
};

// Health plan generator function for different goals and user profiles
// Now that all plan functions are defined, we can define the generator function
const generatePremadeHealthPlan = (
  goal: string,
  gender: string,
  age: number,
  weight: number
): HealthPlanData => {
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

// Create concrete health plan templates for different goals and user profiles
// Now we can create the premade plans using our generator function
export const premadeHealthPlans: Record<string, HealthPlanData> = {
  "general": generatePremadeHealthPlan("stay-fit", "male", 35, 75),
  
  // Fat loss plans
  "fat-loss": generatePremadeHealthPlan("fat-loss", "male", 35, 75),
  "fat-loss-male": generatePremadeHealthPlan("fat-loss", "male", 35, 75),
  "fat-loss-female": generatePremadeHealthPlan("fat-loss", "female", 35, 65),
  "fat-loss-male-young": generatePremadeHealthPlan("fat-loss", "male", 25, 75),
  "fat-loss-female-young": generatePremadeHealthPlan("fat-loss", "female", 25, 65),
  "fat-loss-male-middle": generatePremadeHealthPlan("fat-loss", "male", 45, 80),
  "fat-loss-female-middle": generatePremadeHealthPlan("fat-loss", "female", 45, 70),
  "fat-loss-male-senior": generatePremadeHealthPlan("fat-loss", "male", 60, 80),
  "fat-loss-female-senior": generatePremadeHealthPlan("fat-loss", "female", 60, 70),
  
  // Muscle gain plans
  "muscle-gain": generatePremadeHealthPlan("muscle-gain", "male", 35, 75),
  "muscle-gain-male": generatePremadeHealthPlan("muscle-gain", "male", 35, 75),
  "muscle-gain-female": generatePremadeHealthPlan("muscle-gain", "female", 35, 65),
  "muscle-gain-male-young": generatePremadeHealthPlan("muscle-gain", "male", 25, 75),
  "muscle-gain-female-young": generatePremadeHealthPlan("muscle-gain", "female", 25, 65),
  "muscle-gain-male-middle": generatePremadeHealthPlan("muscle-gain", "male", 45, 80),
  "muscle-gain-female-middle": generatePremadeHealthPlan("muscle-gain", "female", 45, 70),
  
  // Bulking plans
  "bulking": generatePremadeHealthPlan("bulking", "male", 35, 75),
  "bulking-male": generatePremadeHealthPlan("bulking", "male", 35, 75),
  "bulking-female": generatePremadeHealthPlan("bulking", "female", 35, 65),
  "bulking-male-young": generatePremadeHealthPlan("bulking", "male", 25, 75),
  
  // Stay fit plans
  "stay-fit": generatePremadeHealthPlan("stay-fit", "male", 35, 75),
  "stay-fit-male": generatePremadeHealthPlan("stay-fit", "male", 35, 75),
  "stay-fit-female": generatePremadeHealthPlan("stay-fit", "female", 35, 65),
  "stay-fit-male-senior": generatePremadeHealthPlan("stay-fit", "male", 60, 75),
  "stay-fit-female-senior": generatePremadeHealthPlan("stay-fit", "female", 60, 65),
};

// Export the generator function too
export { generatePremadeHealthPlan };
