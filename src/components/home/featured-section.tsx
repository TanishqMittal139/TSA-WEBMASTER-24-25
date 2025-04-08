
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getPopularMeals } from '@/data/menu-data';
import { NutritionCard } from '../ui/nutrition-card';

const FeaturedSection = () => {
  const popularItems = getPopularMeals().slice(0, 4);
  
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4 md:mb-0">Popular Items</h2>
          <Link to="/menu">
            <Button variant="outline">View Full Menu</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularItems.map((item) => (
            <NutritionCard key={item.id} nutrition={item.nutrition || {calories: 0, protein: 0, carbs: 0, fat: 0}} name={item.name}>
              <Link to={`/menu/${item.id}`}>
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="relative h-48">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {item.vegetarian && (
                      <Badge className="absolute top-2 right-2 bg-green-600 text-white">
                        Vegetarian
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                    <p className="text-muted-foreground text-sm mt-1 mb-3">
                      {item.description.length > 100
                        ? `${item.description.substring(0, 100)}...`
                        : item.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">{item.price}</span>
                      {item.rating && (
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-yellow-500 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 15.585l-6.327 3.325 1.209-7.04-5.117-4.981 7.079-1.027L10 0l3.156 6.62 7.079 1.027-5.117 4.981 1.209 7.04L10 15.585z"
                            />
                          </svg>
                          <span className="ml-1 text-sm text-foreground">
                            {item.rating}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </NutritionCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
