
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Exercise {
  name: string;
  sets: number;
  reps: string;
}

interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

interface WorkoutPlanProps {
  plan: {
    overview: string;
    schedule: WorkoutDay[];
  };
}

const WorkoutPlan: React.FC<WorkoutPlanProps> = ({ plan }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Workout Plan</CardTitle>
          <CardDescription>{plan.overview}</CardDescription>
        </CardHeader>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        {plan.schedule.map((day, index) => (
          <AccordionItem key={index} value={day.day}>
            <AccordionTrigger className="hover:bg-black px-4">
              <div className="flex justify-between w-full">
                <span className="font-medium">{day.day}</span>
                <span className="text-gray-500">{day.focus}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-4 py-2">
                <div className="bg-black rounded-lg p-4">
                  <h4 className="font-medium mb-2">Exercises:</h4>
                  <ul className="space-y-3">
                    {day.exercises.map((exercise, i) => (
                      <li key={i} className="flex justify-between items-center border-b pb-1 bg-black last:border-0">
                        <span>{exercise.name}</span>
                        <span className="bg-black">
                          {exercise.sets} sets × {exercise.reps}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default WorkoutPlan;
