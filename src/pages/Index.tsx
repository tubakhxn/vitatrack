
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Activity, Heart, Target, CheckCircle, UserCircle, TrendingUp, Clock, ClipboardList } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { supabase } from "@/integrations/supabase/client";

const unsplashBackgrounds = [
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1920",
  "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1920",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1920",
  "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1920",
  "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1920"
];

// Mock data for the dashboard
const mockData = {
  weightChange: "-0.9",
  activeDays: 5,
  avgActivity: 48,
  currentStreak: 3,
};

// Features data for the landing page
const features = [
  {
    icon: <Target className="h-8 w-8" />,
    title: "Personalized Goals",
    description: "Set specific fitness and health goals tailored to your needs and track your progress over time."
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Custom Health Plans",
    description: "Receive AI-generated workout and diet plans customized to your body type and objectives."
  },
  {
    icon: <Activity className="h-8 w-8" />,
    title: "Progress Tracking",
    description: "Monitor your improvements with visual data and analytics to keep you motivated."
  },
  {
    icon: <CheckCircle className="h-8 w-8" />,
    title: "Achievement System",
    description: "Earn badges and rewards as you hit milestones and maintain consistency with your health plan."
  }
];

// Testimonials for the landing page
const testimonials = [
  {
    quote: "VitaTrack helped me lose 15 pounds in just two months with its personalized workout plans!",
    name: "Sarah J.",
    title: "Weight Loss Goal"
  },
  {
    quote: "The AI-generated diet recommendations completely changed my relationship with food and nutrition.",
    name: "Michael T.",
    title: "Nutrition Goal"
  },
  {
    quote: "I've been able to build muscle consistently following VitaTrack's custom workout routines.",
    name: "Alex W.",
    title: "Muscle Building Goal"
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");
  
  useEffect(() => {
    // Select a random background
    const randomIndex = Math.floor(Math.random() * unsplashBackgrounds.length);
    setBackgroundImage(unsplashBackgrounds[randomIndex]);
    
    // Check if the user is logged in
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    
    checkSession();
  }, []);

  if (!isLoggedIn) {
    return (
      <>
        {/* Hero Section */}
        <section className="parallax-container">
          <div 
            className="parallax-bg" 
            style={{ backgroundImage: `url(${backgroundImage || unsplashBackgrounds[0]})` }}
          ></div>
          
          <div className="hero-section">
            <div className="relative z-10 text-center mb-8 mt-10">
              <div className="mx-auto w-20 h-20 rounded-lg health-gradient flex items-center justify-center mb-4">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h1 className="hero-title">VitaTrack</h1>
              <p className="hero-subtitle">
                Your personalized AI health journey to achieve your fitness goals and optimize your wellbeing
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="px-8" onClick={() => navigate("/login")}>
                  Get Started
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate("/login")} 
                  className="bg-transparent border-white text-white hover:bg-white/10 px-8"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="features-section bg-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-white">Powerful Features</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Everything you need to transform your health and fitness journey
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-20 px-4 bg-gray-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-white">How It Works</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Start your fitness journey in just three simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-6">
                  <UserCircle className="h-8 w-8 text-healthTeal" />
                  <div className="absolute -right-1 -top-1 w-8 h-8 rounded-full bg-healthBlue flex items-center justify-center text-white font-bold">1</div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Create Profile</h3>
                <p className="text-gray-400">Sign up and complete your fitness profile with your goals and current metrics</p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-healthTeal" />
                  <div className="absolute -right-1 -top-1 w-8 h-8 rounded-full bg-healthBlue flex items-center justify-center text-white font-bold">2</div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Get Custom Plan</h3>
                <p className="text-gray-400">Receive a personalized workout and nutrition plan based on your goals</p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-6">
                  <TrendingUp className="h-8 w-8 text-healthTeal" />
                  <div className="absolute -right-1 -top-1 w-8 h-8 rounded-full bg-healthBlue flex items-center justify-center text-white font-bold">3</div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Track Progress</h3>
                <p className="text-gray-400">Monitor your improvements and adjust your plan as you reach your goals</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-20 px-4 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-white">Success Stories</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                See how VitaTrack has helped others reach their fitness goals
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((item, index) => (
                <div key={index} className="glass-card p-6">
                  <div className="text-healthBlue mb-4 text-4xl">"</div>
                  <p className="text-gray-300 italic mb-6">{item.quote}</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                      <UserCircle className="h-6 w-6 text-healthTeal" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="text-sm text-gray-400">{item.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="cta-section">
          <div className="cta-bg"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl font-bold mb-4 text-white">Ready to Transform Your Fitness Journey?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join thousands of users who have already achieved their health and fitness goals with VitaTrack
            </p>
            <Button size="lg" className="px-8 py-6 text-lg" onClick={() => navigate("/login")}>
              Start Your Journey Now
            </Button>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-10 px-4 bg-gray-950">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="w-10 h-10 rounded-md health-gradient flex items-center justify-center mr-3">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">VitaTrack</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">© {new Date().getFullYear()} VitaTrack. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </>
    );
  }
  
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1 text-white">Welcome to VitaTrack</h1>
            <p className="text-gray-300">Your personalized health journey</p>
          </div>
          <Button onClick={() => navigate("/plan")} className="mt-4 md:mt-0">
            View Health Plan
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 border-gray-700 rounded-xl p-6 text-white">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-gray-700 mr-4">
                <Target className="h-5 w-5 text-healthTeal" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Active Days</p>
                <p className="text-xl font-semibold">{mockData.activeDays}/7</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border-gray-700 rounded-xl p-6 text-white">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-gray-700 mr-4">
                <Activity className="h-5 w-5 text-healthTeal" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Avg. Activity</p>
                <p className="text-xl font-semibold">{mockData.avgActivity} min</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border-gray-700 rounded-xl p-6 text-white">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-gray-700 mr-4">
                <Heart className="h-5 w-5 text-healthBlue" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Current Streak</p>
                <p className="text-xl font-semibold">{mockData.currentStreak} days</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-gray-800 border-gray-700 rounded-xl text-white">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">Today's Plan</h2>
              <p className="text-gray-300 mb-4">Your scheduled activities for today</p>
              <div className="space-y-4">
                <div className="p-4 bg-gray-700 rounded-md border border-gray-600">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="p-2 bg-gray-800 rounded-full mr-3">
                        <Activity className="h-4 w-4 text-healthBlue" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Upper Body Workout</p>
                        <p className="text-sm text-gray-300">5 exercises • 45 minutes</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-700 rounded-md border border-gray-600">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="p-2 bg-gray-800 rounded-full mr-3">
                        <Clock className="h-4 w-4 text-healthTeal" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Log Activity</p>
                        <p className="text-sm text-gray-300">Daily tracking reminder</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigate("/progress")} className="border-gray-600 hover:bg-gray-600 text-white">
                      Log
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border-gray-700 rounded-xl text-white">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">Weekly Progress</h2>
              <p className="text-gray-300 mb-4">Your activity for the past 7 days</p>
              <div className="h-52 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-healthBlue mb-2">71%</div>
                  <p className="text-gray-300 mb-4">of weekly goal completed</p>
                  <Button variant="link" onClick={() => navigate("/progress")} className="text-healthBlue hover:text-healthTeal">
                    View Detailed Progress
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-white">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate("/goals")} 
              className="h-auto py-6 flex flex-col items-center justify-center border-gray-700 hover:bg-gray-800 hover:border-healthTeal"
            >
              <Target className="h-8 w-8 mb-2 text-healthTeal" />
              <span>Update Goals</span>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate("/plan")} 
              className="h-auto py-6 flex flex-col items-center justify-center border-gray-700 hover:bg-gray-800 hover:border-healthTeal"
            >
              <ClipboardList className="h-8 w-8 mb-2 text-healthTeal" />
              <span>Health Plan</span>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate("/progress")} 
              className="h-auto py-6 flex flex-col items-center justify-center border-gray-700 hover:bg-gray-800 hover:border-healthTeal"
            >
              <Activity className="h-8 w-8 mb-2 text-healthTeal" />
              <span>Log Progress</span>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate("/profile")} 
              className="h-auto py-6 flex flex-col items-center justify-center border-gray-700 hover:bg-gray-800 hover:border-healthTeal"
            >
              <UserCircle className="h-8 w-8 mb-2 text-healthTeal" />
              <span>Profile</span>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
