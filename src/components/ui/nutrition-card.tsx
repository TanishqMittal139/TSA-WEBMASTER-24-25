
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
      <HoverCardContent className="w-80 bg-card border border-border">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">{name} Nutrition Facts</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium text-foreground">Calories:</span>
              <span className="text-foreground">{nutrition.calories}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-foreground">Protein:</span>
              <span className="text-foreground">{nutrition.protein}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-foreground">Carbs:</span>
              <span className="text-foreground">{nutrition.carbs}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-foreground">Fat:</span>
              <span className="text-foreground">{nutrition.fat}</span>
            </div>
            {nutrition.sodium && (
              <div className="flex justify-between">
                <span className="font-medium text-foreground">Sodium:</span>
                <span className="text-foreground">{nutrition.sodium}</span>
              </div>
            )}
            {nutrition.fiber && (
              <div className="flex justify-between">
                <span className="font-medium text-foreground">Fiber:</span>
                <span className="text-foreground">{nutrition.fiber}</span>
              </div>
            )}
            {nutrition.sugar && (
              <div className="flex justify-between">
                <span className="font-medium text-foreground">Sugar:</span>
                <span className="text-foreground">{nutrition.sugar}</span>
              </div>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
