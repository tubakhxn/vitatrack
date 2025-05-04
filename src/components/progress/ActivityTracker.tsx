
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const ActivityTracker: React.FC = () => {
  const [newMinutes, setNewMinutes] = useState("");
  const [activityType, setActivityType] = useState("Cardio");
  const [userId, setUserId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Get the user's ID on component mount
  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id || null);
    };
    getUser();
  }, []);

  // Fetch activity data from Supabase
  const { data: activityData = [], isLoading } = useQuery({
    queryKey: ["activityLogs"],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from("activity_logs")
        .select("date, minutes, activity_type")
        .order("date", { ascending: true });
      
      if (error) {
        toast.error("Failed to fetch activity data");
        console.error(error);
        throw error;
      }
      
      return data.map(entry => ({
        date: entry.date,
        minutes: entry.minutes,
        type: entry.activity_type
      }));
    },
    enabled: !!userId
  });

  // Add or update activity log
  const mutation = useMutation({
    mutationFn: async ({ date, minutes, type }: { date: string; minutes: number; type: string }) => {
      if (!userId) {
        throw new Error("User not authenticated");
      }
      
      const { data: existingEntry } = await supabase
        .from("activity_logs")
        .select()
        .eq("date", date)
        .single();
      
      if (existingEntry) {
        // Update existing entry
        const { error } = await supabase
          .from("activity_logs")
          .update({ minutes, activity_type: type })
          .eq("date", date);
        
        if (error) throw error;
        return { isNew: false };
      } else {
        // Insert new entry
        const { error } = await supabase
          .from("activity_logs")
          .insert({ 
            date, 
            minutes, 
            activity_type: type,
            user_id: userId
          });
        
        if (error) throw error;
        return { isNew: true };
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["activityLogs"] });
      
      if (result.isNew) {
        toast.success("Activity logged successfully");
      } else {
        toast.success("Today's activity updated successfully");
      }
      
      setNewMinutes("");
    },
    onError: (error) => {
      toast.error("Failed to log activity");
      console.error(error);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      toast.error("You must be logged in to log your activity");
      return;
    }

    if (!newMinutes) {
      toast.error("Please enter activity duration");
      return;
    }

    const today = format(new Date(), "yyyy-MM-dd");
    const minutesValue = parseInt(newMinutes);
    
    mutation.mutate({ 
      date: today, 
      minutes: minutesValue,
      type: activityType 
    });
  };

  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem);
    return format(date, "MMM d");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Activity Progress</CardTitle>
          <CardDescription>Track your workout activity over time</CardDescription>
        </CardHeader>
        <CardContent className="h-72">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p>Loading data...</p>
            </div>
          ) : activityData.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">No activity data yet. Start by logging your activity below.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={activityData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={formatXAxis} />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`${value} min`, "Duration"]}
                  labelFormatter={(label) => format(new Date(label), "MMM d, yyyy")}
                />
                <Bar
                  dataKey="minutes"
                  name="Activity Minutes"
                  fill="#4ECDC4"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Log Today's Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="Duration in minutes"
                  value={newMinutes}
                  onChange={(e) => setNewMinutes(e.target.value)}
                  disabled={mutation.isPending}
                />
              </div>
              <div className="w-40">
                <Select
                  value={activityType}
                  onValueChange={setActivityType}
                  disabled={mutation.isPending}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cardio">Cardio</SelectItem>
                    <SelectItem value="Strength">Strength</SelectItem>
                    <SelectItem value="Yoga">Yoga</SelectItem>
                    <SelectItem value="Rest">Rest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button 
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Saving..." : "Log Activity"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityTracker;
