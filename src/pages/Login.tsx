
import React from "react";
import AuthForm from "@/components/auth/AuthForm";
import { Heart } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 rounded-lg health-gradient flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">VitaTrack</h1>
          <p className="text-gray-400 mt-2">Your personalized health journey</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default Login;
