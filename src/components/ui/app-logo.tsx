
import React from "react";
import { Salad } from "lucide-react";

interface AppLogoProps {
  size?: number;
  color?: string;
  className?: string;
}

const AppLogo: React.FC<AppLogoProps> = ({ size = 24, color, className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <Salad size={size} className={`text-primary ${color ? color : ""}`} />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
      </div>
      <span className="ml-2 font-bold text-lg text-foreground">TastyHub</span>
    </div>
  );
};

export default AppLogo;
