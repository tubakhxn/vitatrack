
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Meal {
  title: string;
  options: string[];
}

interface DietPlanProps {
  plan: {
    overview: string;
    calories: string;
    macros: {
      protein: string;
      carbs: string;
      fats: string;
    };
    meals: Meal[];
  };
}

const DietPlan: React.FC<DietPlanProps> = ({ plan }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Diet Plan</CardTitle>
          <CardDescription>{plan.overview}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="font-medium mb-2">Daily Target:</h3>
            <p className="text-white">{plan.calories}</p>
          </div>
          <div className="mb-6">
            <h3 className="font-medium mb-2">Recommended Macronutrient Split:</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-healthGray p-3 rounded-lg text-center">
                <p className="text-xs text-gray-500">Protein</p>
                <p className="font-semibold text-healthBlue">{plan.macros.protein}</p>
              </div>
              <div className="bg-healthGray p-3 rounded-lg text-center">
                <p className="text-xs text-gray-500">Carbs</p>
                <p className="font-semibold text-healthTeal">{plan.macros.carbs}</p>
              </div>
              <div className="bg-healthGray p-3 rounded-lg text-center">
                <p className="text-xs text-gray-500">Fats</p>
                <p className="font-semibold text-healthGreen">{plan.macros.fats}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Meal Plan</CardTitle>
          <CardDescription>
            Choose from these meal options each day to meet your nutritional goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {plan.meals.map((meal, index) => (
              <div key={index} className="border-t pt-4 first:border-0 first:pt-0">
                <h3 className="font-bold text-lg mb-2">{meal.title}</h3>
                <ul className="space-y-2">
                  {meal.options.map((option, i) => (
                    <li key={i} className="bg-black p-3 rounded-md font-normal text-white">
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DietPlan;
