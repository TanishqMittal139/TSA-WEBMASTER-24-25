
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { NutritionCard } from '@/components/ui/nutrition-card';
import { MenuItem } from '@/data/menu-data';

interface MealCardProps {
  meal: MenuItem;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const fallbackImage = "/placeholder.svg";
  
  return (
    <NutritionCard 
      nutrition={meal.nutrition || {calories: 0, protein: 0, carbs: 0, fat: 0}}
      name={meal.name}
    >
      <Link to={`/menu/${meal.id}`} className="block h-full">
        <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm border-white/20 dark:border-white/10 hover:-translate-y-2">
          <div className="aspect-w-16 aspect-h-9 relative h-48 overflow-hidden">
            <img
              src={meal.image || fallbackImage}
              alt={meal.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = fallbackImage;
              }}
            />
            {meal.hasDiscount && (
              <div className="absolute top-2 right-2 animate-pulse">
                <Badge className="bg-red-500 text-white font-semibold px-3 py-1">
                  Special Offer
                </Badge>
              </div>
            )}
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-foreground">{meal.name}</h3>
              <div>
                {meal.hasDiscount ? (
                  <div className="text-right">
                    <span className="line-through text-muted-foreground text-sm mr-2">
                      {meal.price}
                    </span>
                    <span className="text-red-500 font-semibold">
                      {meal.discountPrice}
                    </span>
                  </div>
                ) : (
                  <span className="font-semibold text-foreground">{meal.price}</span>
                )}
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm mt-2 mb-3 line-clamp-2">
              {meal.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {meal.vegetarian && (
                <Badge variant="outline" className="text-xs border-green-500 text-green-600 dark:text-green-400">
                  Vegetarian
                </Badge>
              )}
              {meal.vegan && (
                <Badge variant="outline" className="text-xs border-green-600 text-green-700 dark:text-green-500">
                  Vegan
                </Badge>
              )}
              {meal.glutenFree && (
                <Badge variant="outline" className="text-xs border-amber-500 text-amber-600 dark:text-amber-400">
                  Gluten-Free
                </Badge>
              )}
              {meal.cuisineType && (
                <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                  {meal.cuisineType.charAt(0).toUpperCase() + meal.cuisineType.slice(1)}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </NutritionCard>
  );
};

export default MealCard;
