
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Activity, Heart, Target, CheckCircle, UserCircle, TrendingUp, Clock, ClipboardList } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileSidebar from "./MobileSidebar";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="sticky top-0 z-10 w-full bg-black border-b border-black shadow-sm">
      <div className="px-4 mx-auto sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="mr-2"
                onClick={toggleSidebar}
              >
                {isSidebarOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            )}
            <div 
  className="flex items-center cursor-pointer" 
  onClick={() => navigate("/")}
>
  <div className="flex items-center justify-center w-8 h-8 mr-2 rounded-md health-gradient">
    <Heart className="h-5 w-5 text-white" />
  </div>
  <span className="text-xl font-bold text-white">VitaTrack</span>
</div>
          </div>
        </div>
      </div>

      {isMobile && <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
    </nav>
  );
};

export default Navbar;
