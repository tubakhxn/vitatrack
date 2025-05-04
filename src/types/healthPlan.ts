
export interface Exercise {
  name: string;
  sets: number;
  reps: string;
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface WorkoutPlanData {
  overview: string;
  schedule: WorkoutDay[];
}

export interface Meal {
  title: string;
  options: string[];
}

export interface DietPlanData {
  overview: string;
  calories: string;
  macros: {
    protein: string;
    carbs: string;
    fats: string;
  };
  meals: Meal[];
}

export interface HealthPlanData {
  workout: WorkoutPlanData;
  diet: DietPlanData;
}
