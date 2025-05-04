
import React from "react";
import WeightTracker from "@/components/progress/WeightTracker";
import MainLayout from "@/components/layout/MainLayout";

const Weight = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Weight Tracker</h1>
          <p className="text-white">Monitor your weight changes over time</p>
        </div>
        <WeightTracker />
      </div>
    </MainLayout>
  );
};

export default Weight;
