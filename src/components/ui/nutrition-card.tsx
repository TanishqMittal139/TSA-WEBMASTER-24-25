
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Card } from "@/components/ui/card";
import React from "react";

type NutritionData = {
  calories: string | number;
  protein: string | number;
  carbs: string | number;
  fat: string | number;
  sodium?: string | number;
  fiber?: string | number;
  sugar?: string | number;
};

interface NutritionCardProps {
  children: React.ReactNode;
  nutrition: NutritionData;
  name: string;
}

export const NutritionCard = ({ children, nutrition, name }: NutritionCardProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">{name} Nutrition Facts</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">Calories:</span>
              <span>{nutrition.calories}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Protein:</span>
              <span>{nutrition.protein}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Carbs:</span>
              <span>{nutrition.carbs}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Fat:</span>
              <span>{nutrition.fat}</span>
            </div>
            {nutrition.sodium && (
              <div className="flex justify-between">
                <span className="font-medium">Sodium:</span>
                <span>{nutrition.sodium}</span>
              </div>
            )}
            {nutrition.fiber && (
              <div className="flex justify-between">
                <span className="font-medium">Fiber:</span>
                <span>{nutrition.fiber}</span>
              </div>
            )}
            {nutrition.sugar && (
              <div className="flex justify-between">
                <span className="font-medium">Sugar:</span>
                <span>{nutrition.sugar}</span>
              </div>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
