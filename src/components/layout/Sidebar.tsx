
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Target, ClipboardList, Activity, UserRound, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Sidebar = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserEmail(session?.user?.email || null);
    };
    getSession();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
    } else {
      toast.success("Signed out successfully");
      navigate("/"); // Redirect to home page after logout
    }
  };

  const navItems = [
    { name: "My Goals", path: "/goals", icon: <Target className="w-5 h-5" /> },
    { name: "Health Plan", path: "/plan", icon: <ClipboardList className="w-5 h-5" /> },
    { name: "Progress", path: "/progress", icon: <Activity className="w-5 h-5" /> },
  ];

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-black border-r border-gray-800 min-h-screen">
      <div className="p-4">
        <div className="py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? "bg-gray-900 text-healthTeal"
                    : "text-gray-300 hover:bg-gray-900"
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
      {userEmail && (
        <div className="mt-auto p-4 border-t border-gray-800">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-gray-900 flex items-center justify-center">
                <UserRound className="h-5 w-5 text-healthTeal" />
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-300 truncate">{userEmail}</p>
              <NavLink to="/profile" className="text-xs text-gray-400 hover:text-healthTeal">
                Manage Profile
              </NavLink>
            </div>
            <button 
              onClick={handleSignOut} 
              className="text-gray-400 hover:text-red-500"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
