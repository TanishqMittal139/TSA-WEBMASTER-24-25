
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
      <div className="relative group">
        <Salad size={size} className={`text-primary ${color ? color : ""} transition-transform duration-300 group-hover:scale-110`} />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
        <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500" />
      </div>
      <span className="ml-2 font-bold text-lg text-foreground tracking-wide">
        <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Tasty</span>
        <span className="text-foreground">Hub</span>
      </span>
    </div>
  );
};

export default AppLogo;
