
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Navigation, Trash2, Clock, Phone, ExternalLink, ShoppingBag, Menu as MenuIcon } from 'lucide-react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/context/FavoritesContext';
import { useFavoriteMeals } from '@/context/FavoriteMealsContext';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BlurImage from '@/components/ui/blur-image';

const FavoriteLocations = () => {
  const { favoriteLocations, removeFavoriteLocation } = useFavorites();
  const { favoriteMeals, removeFavoriteMeal } = useFavoriteMeals();
  const { addItem } = useCart();
  
  const handleRemoveFavorite = (id: string) => {
    removeFavoriteLocation(id);
  };
  
  const handleRemoveFavoriteMeal = (id: string) => {
    removeFavoriteMeal(id);
  };
  
  const handleAddToCart = (meal: any) => {
    addItem({
      id: meal.id,
      name: meal.name,
      price: meal.price,
      image: meal.image,
      category: meal.category,
      hasDiscount: meal.hasDiscount
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="locations">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold mb-2 flex items-center">
                    <Heart className="mr-2 text-primary" size={24} />
                    Favorites
                  </h1>
                  <p className="text-muted-foreground">
                    Manage your favorite locations and meals
                  </p>
                </div>
                
                <TabsList className="mt-4 md:mt-0">
                  <TabsTrigger value="locations" className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>Locations</span>
                  </TabsTrigger>
                  <TabsTrigger value="meals" className="flex items-center gap-2">
                    <MenuIcon size={16} />
                    <span>Meals</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="locations">
                <div className="flex justify-end mb-4">
                  <Link to="/find-location">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Navigation size={16} />
                      Find More Locations
                    </Button>
                  </Link>
                </div>
                
                {favoriteLocations.length === 0 ? (
                  <div className="text-center py-16 bg-secondary/30 rounded-lg">
                    <MapPin className="mx-auto mb-4 text-muted-foreground" size={48} />
                    <h2 className="text-xl font-medium mb-2">No Favorite Locations Yet</h2>
                    <p className="text-muted-foreground mb-6">
                      Add locations to your favorites for quick access
                    </p>
                    <Link to="/find-location">
                      <Button>Browse Locations</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {favoriteLocations.map((location) => (
                      <div 
                        key={location.id}
                        className="bg-card rounded-xl shadow p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row justify-between">
                          <div>
                            <h2 className="text-xl font-semibold mb-2 flex items-center">
                              {location.name}
                              <Heart className="ml-2 text-red-500" size={16} fill="currentColor" />
                            </h2>
                            
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center text-muted-foreground">
                                <MapPin size={16} className="mr-2" />
                                <span>123 Example St, {location.name}</span>
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <Clock size={16} className="mr-2" />
                                <span>Open: 7:00 AM - 9:00 PM</span>
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <Phone size={16} className="mr-2" />
                                <span>(555) 123-4567</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-row md:flex-col gap-3 mt-4 md:mt-0">
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleRemoveFavorite(location.id)}
                              className="flex items-center gap-1"
                            >
                              <Trash2 size={14} />
                              Remove
                            </Button>
                            
                            <Link to={`/find-location?id=${location.id}`}>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="flex items-center gap-1"
                              >
                                <ExternalLink size={14} />
                                Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="meals">
                <div className="flex justify-end mb-4">
                  <Link to="/menu">
                    <Button variant="outline" className="flex items-center gap-2">
                      <MenuIcon size={16} />
                      Browse Menu
                    </Button>
                  </Link>
                </div>
                
                {favoriteMeals.length === 0 ? (
                  <div className="text-center py-16 bg-secondary/30 rounded-lg">
                    <Heart className="mx-auto mb-4 text-muted-foreground" size={48} />
                    <h2 className="text-xl font-medium mb-2">No Favorite Meals Yet</h2>
                    <p className="text-muted-foreground mb-6">
                      Add meals to your favorites for quick access
                    </p>
                    <Link to="/menu">
                      <Button>Explore Menu</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favoriteMeals.map((meal) => (
                      <div 
                        key={meal.id}
                        className="bg-card rounded-xl shadow overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="h-48 overflow-hidden">
                          <BlurImage 
                            src={meal.image} 
                            alt={meal.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">{meal.name}</h3>
                              <p className="text-primary font-medium">{meal.price}</p>
                              {meal.category && (
                                <p className="text-sm text-muted-foreground">
                                  {meal.category}
                                </p>
                              )}
                            </div>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleRemoveFavoriteMeal(meal.id)}
                              className="h-8 w-8"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                          <div className="mt-4 flex space-x-2">
                            <Button 
                              className="flex-1" 
                              variant="outline"
                              onClick={() => handleAddToCart(meal)}
                            >
                              <ShoppingBag className="mr-2 h-4 w-4" />
                              Add to Cart
                            </Button>
                            <Link to={`/menu/${meal.id}`} className="flex-1">
                              <Button variant="secondary" className="w-full">
                                Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FavoriteLocations;
