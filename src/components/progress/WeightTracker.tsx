
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface WeightEntry {
  date: string;
  weight: number;
}

const WeightTracker: React.FC = () => {
  const [newWeight, setNewWeight] = useState("");
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

  // Fetch weight data from Supabase
  const { data: weightData = [], isLoading } = useQuery({
    queryKey: ["weightLogs"],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from("weight_logs")
        .select("date, weight")
        .order("date", { ascending: true });
      
      if (error) {
        toast.error("Failed to fetch weight data");
        console.error(error);
        throw error;
      }
      
      return data.map(entry => ({
        date: entry.date,
        weight: Number(entry.weight)
      }));
    },
    enabled: !!userId
  });

  // Add or update weight log
  const mutation = useMutation({
    mutationFn: async ({ date, weight }: { date: string; weight: number }) => {
      if (!userId) {
        throw new Error("User not authenticated");
      }
      
      const { data: existingEntry } = await supabase
        .from("weight_logs")
        .select()
        .eq("date", date)
        .single();
      
      if (existingEntry) {
        // Update existing entry
        const { error } = await supabase
          .from("weight_logs")
          .update({ weight })
          .eq("date", date);
        
        if (error) throw error;
        return { isNew: false };
      } else {
        // Insert new entry
        const { error } = await supabase
          .from("weight_logs")
          .insert({ 
            date,
            weight,
            user_id: userId 
          });
        
        if (error) throw error;
        return { isNew: true };
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["weightLogs"] });
      
      if (result.isNew) {
        toast.success("Weight logged successfully");
      } else {
        toast.success("Today's weight updated successfully");
      }
      
      setNewWeight("");
    },
    onError: (error) => {
      toast.error("Failed to log weight");
      console.error(error);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId) {
      toast.error("You must be logged in to log your weight");
      return;
    }
    
    if (!newWeight) {
      toast.error("Please enter a weight value");
      return;
    }

    const today = format(new Date(), "yyyy-MM-dd");
    const weightValue = parseFloat(newWeight);
    
    mutation.mutate({ date: today, weight: weightValue });
  };

  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem);
    return format(date, "MMM d");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Weight Progress</CardTitle>
          <CardDescription>Track changes in your body weight over time</CardDescription>
        </CardHeader>
        <CardContent className="h-72">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p>Loading data...</p>
            </div>
          ) : weightData.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">No weight data yet. Start by logging your weight below.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={weightData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={formatXAxis} />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                <Tooltip 
                  formatter={(value) => [`${value} kg`, "Weight"]}
                  labelFormatter={(label) => format(new Date(label), "MMM d, yyyy")}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#45B7D1"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Log Today's Weight</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <div className="flex-1">
              <Input
                type="number"
                step="0.1"
                placeholder="Weight in kg"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                disabled={mutation.isPending}
              />
            </div>
            <Button 
              type="submit" 
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Saving..." : "Log Weight"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeightTracker;
