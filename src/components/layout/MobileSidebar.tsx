
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Target, Activity, Clipboard, UserRound, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);

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
    }
  };

  const navItems = [
    { name: "My Goals", path: "/goals", icon: <Target className="w-5 h-5" /> },
    { name: "Health Plan", path: "/plan", icon: <Clipboard className="w-5 h-5" /> },
    { name: "Progress", path: "/progress", icon: <Activity className="w-5 h-5" /> },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 flex md:hidden">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative flex flex-col w-64 max-w-xs bg-gray-800 pt-5 pb-4 overflow-y-auto">
        <div className="px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? "bg-gray-700 text-healthBlue"
                    : "text-gray-300 hover:bg-gray-700"
                }`
              }
              onClick={onClose}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </div>
        {userEmail && (
          <div className="mt-auto p-4 border-t border-gray-700">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <UserRound className="h-5 w-5 text-healthBlue" />
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-300 truncate">{userEmail}</p>
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
      </div>
    </div>
  );
};

export default MobileSidebar;
