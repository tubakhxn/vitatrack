
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Target, TrendingDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ProgressMetrics: React.FC = () => {
  // Fetch weight data
  const { data: weightData = [] } = useQuery({
    queryKey: ["weightLogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("weight_logs")
        .select("date, weight")
        .order("date", { ascending: true });
      
      if (error) {
        console.error("Error fetching weight logs:", error);
        return [];
      }
      
      return data.map(entry => ({
        date: entry.date,
        weight: Number(entry.weight)
      }));
    },
  });

  // Fetch activity data
  const { data: activityData = [] } = useQuery({
    queryKey: ["activityLogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("activity_logs")
        .select("date, minutes, activity_type")
        .order("date", { ascending: true });
      
      if (error) {
        console.error("Error fetching activity logs:", error);
        return [];
      }
      
      return data.map(entry => ({
        date: entry.date,
        minutes: entry.minutes,
        type: entry.activity_type
      }));
    },
  });

  // Calculate weight change
  const initialWeight = weightData.length > 0 ? weightData[0].weight : 0;
  const currentWeight = weightData.length > 0 ? weightData[weightData.length - 1].weight : 0;
  const weightChange = currentWeight - initialWeight;
  const weightChangeDisplay = weightChange.toFixed(1);
  const isWeightLoss = weightChange < 0;

  // Calculate weekly active days
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);
  
  const last7DaysActivities = activityData.filter(activity => {
    const activityDate = new Date(activity.date);
    return activityDate >= oneWeekAgo && activity.minutes > 0;
  });
  
  const activeDays = last7DaysActivities.length;

  // Calculate total active minutes
  const totalMinutes = activityData.reduce((sum, entry) => sum + entry.minutes, 0);
  const avgMinutesPerDay = activityData.length > 0
    ? Math.round(totalMinutes / activityData.length)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="flex items-center p-6">
          <div className="p-2 rounded-full bg-healthGray mr-4">
            {isWeightLoss ? (
              <TrendingDown className="h-6 w-6 text-healthTeal" />
            ) : (
              <TrendingDown className="h-6 w-6 text-healthBlue" />
            )}
          </div>
          <div>
            <p className="text-sm text-gray-500">Weight Change</p>
            <p className="text-2xl font-semibold">
              {weightChangeDisplay} kg
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center p-6">
          <div className="p-2 rounded-full bg-healthGray mr-4">
            <Target className="h-6 w-6 text-healthBlue" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Days (Week)</p>
            <p className="text-2xl font-semibold">{activeDays}/7</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center p-6">
          <div className="p-2 rounded-full bg-healthGray mr-4">
            <Activity className="h-6 w-6 text-healthTeal" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Avg. Daily Activity</p>
            <p className="text-2xl font-semibold">{avgMinutesPerDay} min</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressMetrics;
