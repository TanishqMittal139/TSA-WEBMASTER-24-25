
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Star, Clock, Info, FileText, Leaf, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import BlurImage from '@/components/ui/blur-image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';

// Mock data for dish nutrition and ingredients
const dishesData = {
  // Sandwiches
  'grilled-cheese': {
    id: 'grilled-cheese',
    name: 'Grilled Cheese Deluxe',
    description: 'Classic melted cheddar & mozzarella with a crispy golden crust.',
    price: '$8.99',
    category: 'sandwiches',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=2573&auto=format&fit=crop',
    preparationTime: '10 minutes',
    rating: 4.7,
    tags: ['Vegetarian', 'Comfort Food'],
    ingredients: [
      'Sourdough bread',
      'Sharp cheddar cheese',
      'Mozzarella cheese',
      'Unsalted butter',
      'Garlic powder',
      'Sea salt'
    ],
    allergens: ['Dairy', 'Gluten'],
    nutrition: {
      calories: 450,
      fat: '24g',
      carbs: '35g',
      protein: '21g',
      sodium: '780mg',
      fiber: '2g',
      sugar: '3g'
    }
  },
  'caprese-panini': {
    id: 'caprese-panini',
    name: 'Caprese Panini',
    description: 'Fresh mozzarella, basil, and tomatoes with balsamic glaze on ciabatta.',
    price: '$9.99',
    category: 'sandwiches',
    image: 'https://images.unsplash.com/photo-1521986329282-0436c1f1e212?q=80&w=2613&auto=format&fit=crop',
    preparationTime: '8 minutes',
    rating: 4.8,
    tags: ['Vegetarian', 'Italian'],
    ingredients: [
      'Ciabatta bread',
      'Fresh mozzarella',
      'Vine-ripened tomatoes',
      'Fresh basil leaves',
      'Balsamic glaze',
      'Extra virgin olive oil',
      'Sea salt',
      'Black pepper'
    ],
    allergens: ['Dairy', 'Gluten'],
    nutrition: {
      calories: 420,
      fat: '18g',
      carbs: '42g',
      protein: '20g',
      sodium: '620mg',
      fiber: '3g',
      sugar: '5g'
    }
  },
  // Soups
  'tomato-soup': {
    id: 'tomato-soup',
    name: 'Tomato Basil Soup',
    description: 'Creamy roasted tomato soup with fresh basil and a hint of garlic.',
    price: '$6.99',
    category: 'soups',
    image: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?q=80&w=2574&auto=format&fit=crop',
    preparationTime: '25 minutes',
    rating: 4.6,
    tags: ['Vegetarian', 'Gluten-Free'],
    ingredients: [
      'Roasted tomatoes',
      'Fresh basil',
      'Heavy cream',
      'Vegetable broth',
      'Garlic',
      'Onions',
      'Olive oil',
      'Salt and pepper'
    ],
    allergens: ['Dairy'],
    nutrition: {
      calories: 280,
      fat: '16g',
      carbs: '28g',
      protein: '6g',
      sodium: '680mg',
      fiber: '4g',
      sugar: '12g'
    }
  },
  // Coffee
  'latte': {
    id: 'latte',
    name: 'Latte',
    description: 'Espresso with steamed milk and a light layer of foam.',
    price: '$4.99',
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=2225&auto=format&fit=crop',
    preparationTime: '5 minutes',
    rating: 4.9,
    tags: ['Classic', 'Hot Beverage'],
    ingredients: [
      'Double espresso shot',
      'Steamed whole milk',
      'Light milk foam'
    ],
    allergens: ['Dairy'],
    nutrition: {
      calories: 190,
      fat: '7g',
      carbs: '19g',
      protein: '10g',
      sodium: '115mg',
      fiber: '0g',
      sugar: '13g'
    }
  }
};

const DishDetails = () => {
  const { dishId } = useParams<{ dishId: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [dish, setDish] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      if (dishId && dishesData[dishId as keyof typeof dishesData]) {
        setDish(dishesData[dishId as keyof typeof dishesData]);
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
        category: dish.category === 'sandwiches' ? 'Sandwiches' : 
                 dish.category === 'soups' ? 'Soups' : 'Coffee'
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
            <div className="relative h-[300px] md:h-full rounded-lg overflow-hidden">
              <BlurImage
                src={dish.image}
                alt={dish.name}
                className="object-cover"
              />
            </div>
            
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    {dish.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <h1 className="text-3xl font-bold mb-2">{dish.name}</h1>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span>{dish.rating}/5</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{dish.preparationTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-2xl font-bold text-primary">{dish.price}</div>
              </div>
              
              <p className="text-muted-foreground mb-6">{dish.description}</p>
              
              {dish.allergens.length > 0 && (
                <div className="flex items-center mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800">
                  <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <div className="text-sm">
                    <span className="font-medium">Allergens:</span> {dish.allergens.join(', ')}
                  </div>
                </div>
              )}
              
              <Button 
                onClick={handleAddToCart}
                className="w-full mb-8 flex items-center justify-center"
                size="lg"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Order
              </Button>
              
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
                
                <TabsContent value="ingredients" className="pt-4">
                  <h3 className="font-medium mb-3">Ingredients</h3>
                  <ul className="space-y-2">
                    {dish.ingredients.map((ingredient: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mr-3"></div>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="nutrition" className="pt-4">
                  <h3 className="font-medium mb-3">Nutrition Facts</h3>
                  <div className="border-t border-b py-2">
                    <div className="font-semibold">Calories: {dish.nutrition.calories}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Fat</span>
                        <span className="font-medium">{dish.nutrition.fat}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Carbs</span>
                        <span className="font-medium">{dish.nutrition.carbs}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Protein</span>
                        <span className="font-medium">{dish.nutrition.protein}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sodium</span>
                        <span className="font-medium">{dish.nutrition.sodium}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fiber</span>
                        <span className="font-medium">{dish.nutrition.fiber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sugar</span>
                        <span className="font-medium">{dish.nutrition.sugar}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    * Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.
                  </p>
                </TabsContent>
                
                <TabsContent value="details" className="pt-4">
                  <h3 className="font-medium mb-3">Preparation Details</h3>
                  <p className="text-muted-foreground mb-4">
                    This {dish.name.toLowerCase()} is prepared fresh to order using high-quality ingredients 
                    sourced from local suppliers whenever possible.
                  </p>
                  <p className="text-muted-foreground">
                    Our {dish.category === 'sandwiches' ? 'bread' : dish.category === 'soups' ? 'broths' : 'coffee beans'} are {' '}
                    {dish.category === 'coffee' ? 'ethically sourced and freshly roasted' : 'baked fresh daily'}.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default DishDetails;
