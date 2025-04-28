import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useFavoriteMeals } from '@/context/FavoriteMealsContext';
import { getMenuItemById, getValidImageUrl } from '@/data/menu/utils';
import { motion } from 'framer-motion';
import { MenuItem } from '@/types/menu';
import DishHeader from '@/components/dish-details/DishHeader';
import DishTabs from '@/components/dish-details/DishTabs';
import DietaryBadges from '@/components/dish-details/DietaryBadges';

const DishDetails = () => {
  const { dishId } = useParams<{ dishId: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addFavoriteMeal, removeFavoriteMeal, isFavoriteMeal } = useFavoriteMeals();
  const [dish, setDish] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  console.log("DishDetails rendering with dishId:", dishId);
  
  useEffect(() => {
    setLoading(true);
    setError(null);
    setDish(null);
    
    const timer = setTimeout(() => {
      if (dishId) {
        try {
          console.log("Fetching dish with ID:", dishId);
          const foundDish = getMenuItemById(dishId);
          
          if (foundDish) {
            console.log("Found dish:", foundDish.name);
            setDish(foundDish);
          } else {
            console.error("Dish not found for ID:", dishId);
            setError("Dish not found");
          }
        } catch (err) {
          console.error("Error fetching dish:", err);
          setError("Error loading dish details");
        }
      } else {
        setError("Invalid dish ID");
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
        price: dish.price.toString(),
        image: getValidImageUrl(dish),
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
        price: dish.price.toString(),
        image: getValidImageUrl(dish),
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
  
  if (error || !dish) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Dish Not Found</h2>
            <p className="text-muted-foreground mb-6">{error || "The dish you're looking for doesn't exist."}</p>
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
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            {dish && <DishHeader dish={dish} />}
            
            {dish && <p className="text-muted-foreground">{dish.description}</p>}
            
            {dish && <DietaryBadges dish={dish} />}
            
            <div className="flex space-x-2">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center"
                size="lg"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Order
              </Button>
            </div>
            
            {dish && <DishTabs dish={dish} />}
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default DishDetails;
