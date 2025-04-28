
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { NutritionCard } from '@/components/ui/nutrition-card';
import { MenuItem } from '@/types/menu';

interface MealCardProps {
  meal: MenuItem;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const [imageError, setImageError] = useState(false);
  
  // Reliable placeholder images that work well with resizing
  const reliableImages = [
    "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800&auto=format&fit=crop"
  ];
  
  // Category-specific fallback images
  const categoryFallbacks: Record<string, string> = {
    entrees: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&auto=format&fit=crop",
    sides: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop",
    desserts: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&auto=format&fit=crop",
    beverages: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop",
    breakfast: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&auto=format&fit=crop",
    lunch: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop",
    dinner: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&auto=format&fit=crop"
  };
  
  const getImageUrl = (item: MenuItem): string => {
    if (imageError) {
      // If there was an error loading the image, use a reliable fallback
      return categoryFallbacks[item.category.toLowerCase()] || 
             reliableImages[Math.floor(Math.random() * reliableImages.length)];
    }
    
    let imageUrl = item.imageUrl || item.image || categoryFallbacks[item.category.toLowerCase()];
    
    // Ensure unsplash images have proper sizing parameters
    if (imageUrl && imageUrl.includes('unsplash.com') && !imageUrl.includes('w=')) {
      imageUrl = `${imageUrl}?w=800&auto=format&fit=crop`;
    }
    
    return imageUrl || "/placeholder.svg";
  };
  
  console.log("Rendering MealCard for:", meal.id, meal.name, "Image:", getImageUrl(meal));
  
  return (
    <NutritionCard 
      nutrition={meal.nutrition || {calories: 0, protein: 0, carbs: 0, fat: 0}}
      name={meal.name}
    >
      <Link to={`/menu/${meal.id}`} className="block h-full">
        <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm border-white/20 dark:border-white/10 hover:-translate-y-2">
          <div className="aspect-w-16 aspect-h-9 relative h-48 overflow-hidden">
            <img
              src={getImageUrl(meal)}
              alt={meal.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              onError={() => {
                console.log("Image error for:", meal.name);
                setImageError(true);
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
                      ${meal.price.toFixed(2)}
                    </span>
                    <span className="text-red-500 font-semibold">
                      ${meal.discountPrice?.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="font-semibold text-foreground">${meal.price.toFixed(2)}</span>
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
