
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
      <Salad size={size} className={`text-primary ${color ? color : ""}`} />
      <span className="ml-2 font-bold text-lg">TastyHub</span>
    </div>
  );
};

export default AppLogo;
