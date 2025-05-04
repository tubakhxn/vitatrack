
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WeightTracker from "./WeightTracker";
import ActivityTracker from "./ActivityTracker";
import ProgressMetrics from "./ProgressMetrics";

const ProgressTracker = () => {
  const [activeTab, setActiveTab] = useState("weight");

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Track Your Progress</h1>
        <p className="text-white">Monitor your health journey with detailed metrics</p>
      </div>

      <ProgressMetrics />

      <Tabs defaultValue="weight" value={activeTab} onValueChange={setActiveTab} className="mt-8">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="weight">Weight Log</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>
        <TabsContent value="weight">
          <WeightTracker />
        </TabsContent>
        <TabsContent value="activity">
          <ActivityTracker />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProgressTracker;
