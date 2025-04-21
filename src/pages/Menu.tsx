import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import PageHeader from '@/components/ui/page-header';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/menu');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error("Could not fetch menu:", error);
        toast({
          title: "Error",
          description: "Failed to load menu. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [toast]);

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      hasDiscount: item.hasDiscount
    });
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const filteredMenuItems = menuItems.filter(item => {
    const searchMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = categoryFilter === 'All' || item.category === categoryFilter;
    return searchMatch && categoryMatch;
  });

  const categories = ['All', ...new Set(menuItems.map(item => item.category))];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <PageHeader
        title="Our Menu"
        subtitle="Explore our diverse selection of dishes, crafted with care and quality ingredients"
        badge="Tasty Selection"
        imageSrc="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070"
      />
      
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <Input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="md:w-1/2"
            />
            <div className="md:w-1/2">
              <ScrollArea className="rounded-md border p-1">
                <div className="flex items-center space-x-4 p-2">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={categoryFilter === category ? "default" : "outline"}
                      onClick={() => setCategoryFilter(category)}
                      className="whitespace-nowrap"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle><Skeleton className="h-5 w-40" /></CardTitle>
                    <CardDescription><Skeleton className="h-4 w-24" /></CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-4 w-32 mt-2" />
                    <Skeleton className="h-4 w-48 mt-1" />
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-20" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMenuItems.map(item => (
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>{item.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <p>{item.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 mr-2 text-yellow-500" />
                      <span>{item.rating}</span>
                    </div>
                    <Button onClick={() => handleAddToCart(item)}>Add to Cart</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Menu;
