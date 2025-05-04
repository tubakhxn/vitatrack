
import React from "react";
import OnboardingForm from "@/components/onboarding/OnboardingForm";

const Onboarding = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="max-w-md w-full">
        <OnboardingForm />
      </div>
    </div>
  );
};

export default Onboarding;
