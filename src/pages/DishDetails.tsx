
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Star, Clock, Info, FileText, Leaf, AlertTriangle, Heart } from 'lucide-react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import BlurImage from '@/components/ui/blur-image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { useFavoriteMeals } from '@/context/FavoriteMealsContext';
import { getMenuItemById } from '@/data/menu';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const DishDetails = () => {
  const { dishId } = useParams<{ dishId: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addFavoriteMeal, removeFavoriteMeal, isFavoriteMeal } = useFavoriteMeals();
  const [dish, setDish] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      if (dishId) {
        const foundDish = getMenuItemById(dishId);
        setDish(foundDish);
      }
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [dishId]);
  
  const handleAddToCart = () => {
    if (dish) {
      addItem({
        id: dish.id,
        name: dish.name,
        price: dish.price,
        image: dish.image,
        category: dish.category
      });
    }
  };
  
  const handleFavoriteToggle = () => {
    if (!dish) return;
    
    if (isFavoriteMeal(dish.id)) {
      removeFavoriteMeal(dish.id);
    } else {
      addFavoriteMeal({
        id: dish.id,
        name: dish.name,
        price: dish.price,
        image: dish.image,
        category: dish.category
      });
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-secondary rounded mb-4"></div>
            <div className="h-4 w-40 bg-secondary rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!dish) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Dish Not Found</h2>
            <p className="text-muted-foreground mb-6">The dish you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/menu')}>Return to Menu</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <section className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/menu')}
            className="mb-6 flex items-center"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Menu
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-[300px] md:h-full rounded-lg overflow-hidden"
            >
              <BlurImage
                src={dish.image}
                alt={dish.name}
                className="object-cover"
              />
              
              <Button 
                variant="outline" 
                size="icon" 
                className={cn(
                  "absolute top-4 right-4 bg-background/80 hover:bg-background",
                  isFavoriteMeal(dish.id) && "bg-primary/10 border-primary text-primary"
                )}
                onClick={handleFavoriteToggle}
              >
                <Heart className={cn("h-5 w-5", isFavoriteMeal(dish.id) && "fill-primary")} />
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    {dish.tags?.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <h1 className="text-3xl font-bold mb-2">{dish.name}</h1>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                    {dish.rating && (
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span>{dish.rating}/5</span>
                      </div>
                    )}
                    
                    {dish.preparationTime && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{dish.preparationTime}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-2xl font-bold text-primary">{dish.price}</div>
              </div>
              
              <p className="text-muted-foreground mb-6">{dish.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {dish.vegetarian && (
                  <Badge variant="outline" className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-200">
                    Vegetarian
                  </Badge>
                )}
                
                {dish.vegan && (
                  <Badge variant="outline" className="bg-green-600/10 text-green-700 hover:bg-green-600/20 border-green-200">
                    Vegan
                  </Badge>
                )}
                
                {dish.glutenFree && (
                  <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20 border-yellow-200">
                    Gluten-Free
                  </Badge>
                )}
                
                {dish.cuisineType && (
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-blue-200">
                    {dish.cuisineType} Cuisine
                  </Badge>
                )}
              </div>
              
              {dish.allergens && dish.allergens.length > 0 && (
                <div className="flex items-center mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-300">
                  <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <div className="text-sm">
                    <span className="font-medium">Allergens:</span> {dish.allergens.join(', ')}
                  </div>
                </div>
              )}
              
              <div className="flex space-x-2 mb-8">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center"
                  size="lg"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Order
                </Button>
                
                <Button 
                  onClick={handleFavoriteToggle}
                  variant={isFavoriteMeal(dish.id) ? "default" : "outline"}
                  className={cn(
                    "px-4",
                    isFavoriteMeal(dish.id) && "bg-primary/10 text-primary hover:bg-primary/20 border-primary"
                  )}
                  size="lg"
                >
                  <Heart className={cn("h-5 w-5", isFavoriteMeal(dish.id) && "fill-primary")} />
                </Button>
              </div>
              
              <Tabs defaultValue="ingredients">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="ingredients" className="flex items-center">
                    <Leaf className="h-4 w-4 mr-2" />
                    Ingredients
                  </TabsTrigger>
                  <TabsTrigger value="nutrition" className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Nutrition
                  </TabsTrigger>
                  <TabsTrigger value="details" className="flex items-center">
                    <Info className="h-4 w-4 mr-2" />
                    Details
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="ingredients" className="pt-4 animate-in fade-in-50 duration-300">
                  <h3 className="font-medium mb-3">Ingredients</h3>
                  {dish.ingredients && dish.ingredients.length > 0 ? (
                    <ul className="space-y-2">
                      {dish.ingredients.map((ingredient: string, index: number) => (
                        <motion.li 
                          key={index} 
                          className="flex items-center"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mr-3"></div>
                          {ingredient}
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">Ingredients information not available.</p>
                  )}
                </TabsContent>
                
                <TabsContent value="nutrition" className="pt-4 animate-in fade-in-50 duration-300">
                  <h3 className="font-medium mb-3">Nutrition Facts</h3>
                  {dish.nutrition ? (
                    <>
                      <div className="border-t border-b py-2">
                        <div className="font-semibold">Calories: {dish.nutrition.calories || "N/A"}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Fat</span>
                            <span className="font-medium">{dish.nutrition.fat || "N/A"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Carbs</span>
                            <span className="font-medium">{dish.nutrition.carbs || "N/A"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Protein</span>
                            <span className="font-medium">{dish.nutrition.protein || "N/A"}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Sodium</span>
                            <span className="font-medium">{dish.nutrition.sodium || "N/A"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Fiber</span>
                            <span className="font-medium">{dish.nutrition.fiber || "N/A"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Sugar</span>
                            <span className="font-medium">{dish.nutrition.sugar || "N/A"}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        * Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.
                      </p>
                    </>
                  ) : (
                    <p className="text-muted-foreground">Nutrition information not available.</p>
                  )}
                </TabsContent>
                
                <TabsContent value="details" className="pt-4 animate-in fade-in-50 duration-300">
                  <h3 className="font-medium mb-3">Preparation Details</h3>
                  <p className="text-muted-foreground mb-4">
                    This {dish.name.toLowerCase()} is prepared fresh to order using high-quality ingredients 
                    sourced from local suppliers whenever possible.
                  </p>
                  {dish.category && (
                    <p className="text-muted-foreground">
                      Our {dish.category === 'sandwiches' ? 'bread' : 
                           dish.category === 'soups' ? 'broths' : 
                           dish.category === 'coffee' ? 'coffee beans' : 'ingredients'} are {' '}
                      {dish.category === 'coffee' ? 'ethically sourced and freshly roasted' : 'prepared fresh daily'}.
                    </p>
                  )}
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default DishDetails;
