
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/ui/navbar';
import Footer from '../components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Check, ShoppingCart, ArrowLeft, Tag } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { isAuthenticated } from '@/services/auth';
import { useCart } from '@/context/CartContext';
import { DealData } from './Deals';

// Simulate menu items
const menuItems = [
  {
    id: "sandwich-veggie-deluxe",
    name: "Veggie Deluxe Sandwich",
    price: "$9.99",
    category: "sandwiches",
    image: "https://images.unsplash.com/photo-1554433607-66b5efe9d304?q=80&w=2574&auto=format&fit=crop",
    description: "Loaded with fresh vegetables, avocado, and our special sauce"
  },
  {
    id: "sandwich-mushroom",
    name: "Portobello Mushroom Sandwich",
    price: "$8.99",
    category: "sandwiches",
    image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?q=80&w=2670&auto=format&fit=crop",
    description: "Grilled portobello mushroom with caramelized onions and aioli"
  },
  {
    id: "sandwich-mediterranean",
    name: "Mediterranean Wrap",
    price: "$8.49",
    category: "sandwiches",
    image: "https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?q=80&w=2574&auto=format&fit=crop",
    description: "Falafel, hummus, and fresh vegetables in a whole grain wrap"
  },
  {
    id: "coffee-latte",
    name: "Oat Milk Latte",
    price: "$4.99",
    category: "beverages",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=2637&auto=format&fit=crop",
    description: "Espresso with steamed oat milk and a hint of vanilla"
  },
  {
    id: "coffee-americano",
    name: "Americano",
    price: "$3.49",
    category: "beverages",
    image: "https://images.unsplash.com/photo-1518057111178-44a106bad149?q=80&w=2674&auto=format&fit=crop",
    description: "Espresso diluted with hot water for a smooth coffee experience"
  },
  {
    id: "coffee-cappuccino",
    name: "Almond Cappuccino",
    price: "$4.99",
    category: "beverages",
    image: "https://images.unsplash.com/photo-1534687941688-13eeb7c779bd?q=80&w=2574&auto=format&fit=crop",
    description: "Equal parts espresso, steamed almond milk, and foam"
  },
  {
    id: "soup-tomato",
    name: "Roasted Tomato Soup",
    price: "$5.99",
    category: "soups",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2671&auto=format&fit=crop",
    description: "Creamy tomato soup with basil and a touch of cream"
  },
  {
    id: "soup-lentil",
    name: "Hearty Lentil Soup",
    price: "$6.49",
    category: "soups",
    image: "https://images.unsplash.com/photo-1600626334166-2e9345cdf4ec?q=80&w=2670&auto=format&fit=crop",
    description: "Nutritious lentil soup with vegetables and herbs"
  },
  {
    id: "soup-carrot",
    name: "Carrot Ginger Soup",
    price: "$5.99",
    category: "soups",
    image: "https://images.unsplash.com/photo-1607528971899-2e89e6c0ec69?q=80&w=2574&auto=format&fit=crop",
    description: "Smooth carrot soup with a kick of ginger"
  },
  {
    id: "gift-card-50",
    name: "$50 Gift Card",
    price: "$50.00",
    category: "gift-cards",
    image: "https://images.unsplash.com/photo-1612599316791-451087e8f877?q=80&w=2628&auto=format&fit=crop",
    description: "Give the gift of delicious food with our $50 gift card"
  }
];

const DealUse: React.FC = () => {
  const navigate = useNavigate();
  const { dealId } = useParams<{ dealId: string }>();
  const [deal, setDeal] = useState<DealData | null>(null);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const { addItem, items } = useCart();
  
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    // Redirect if not authenticated
    if (!isAuthenticated()) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to use deals",
        variant: "destructive"
      });
      navigate('/sign-in', { state: { redirectTo: '/deals' } });
      return;
    }
    
    // Get the deal from localStorage
    const activeDeal = localStorage.getItem('active_deal');
    if (!activeDeal) {
      toast({
        title: "No Active Deal",
        description: "Please select a deal first",
        variant: "destructive"
      });
      navigate('/deals');
      return;
    }
    
    const parsedDeal = JSON.parse(activeDeal);
    setDeal(parsedDeal);
    
    // Filter menu items based on deal
    if (parsedDeal.appliesTo === 'all') {
      setFilteredItems(menuItems);
    } else if (parsedDeal.appliesTo === 'category' && parsedDeal.categories) {
      setFilteredItems(menuItems.filter(item => 
        parsedDeal.categories?.includes(item.category)
      ));
    } else if (parsedDeal.appliesTo === 'specific' && parsedDeal.items) {
      setFilteredItems(menuItems.filter(item => 
        parsedDeal.items?.includes(item.id)
      ));
    }
  }, [dealId, navigate]);
  
  const handleItemSelect = (item: any) => {
    const exists = selectedItems.find(i => i.id === item.id);
    
    if (exists) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      // For the combo meal, limit to 1 of each category
      if (deal?.id === 'combo-meal') {
        const hasCategory = selectedItems.some(i => i.category === item.category);
        if (hasCategory) {
          // Replace the item of the same category
          setSelectedItems([
            ...selectedItems.filter(i => i.category !== item.category),
            item
          ]);
        } else {
          setSelectedItems([...selectedItems, item]);
        }
      } else {
        setSelectedItems([...selectedItems, item]);
      }
    }
  };
  
  const applyDiscountToPrice = (price: string) => {
    if (!deal) return price;
    
    const numericPrice = parseFloat(price.replace('$', ''));
    let discountedPrice = numericPrice;
    
    if (deal.discountType === 'percentage') {
      discountedPrice = numericPrice * (1 - (deal.discountAmount / 100));
    } else if (deal.discountType === 'fixed') {
      discountedPrice = numericPrice - deal.discountAmount;
    }
    
    return `$${discountedPrice.toFixed(2)}`;
  };
  
  const calculateTotal = () => {
    if (!deal || selectedItems.length === 0) return "$0.00";
    
    let total = 0;
    
    selectedItems.forEach(item => {
      const price = parseFloat(item.price.replace('$', ''));
      total += price;
    });
    
    if (deal.discountType === 'percentage') {
      total = total * (1 - (deal.discountAmount / 100));
    } else if (deal.discountType === 'fixed' && deal.appliesTo === 'all') {
      total = Math.max(0, total - deal.discountAmount);
    }
    
    return `$${total.toFixed(2)}`;
  };
  
  const handleAddToCart = () => {
    if (selectedItems.length === 0) {
      toast({
        title: "No Items Selected",
        description: "Please select items to apply your deal",
        variant: "destructive"
      });
      return;
    }
    
    // Check if cart already has discounted items
    const hasDiscountedItems = items.some(item => item.hasDiscount);
    
    if (hasDiscountedItems) {
      toast({
        title: "Only One Deal Allowed",
        description: "You can only apply one deal per order. Please remove discounted items first.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    // Add each item to cart with discounted price
    selectedItems.forEach(item => {
      addItem({
        id: item.id,
        name: item.name,
        price: applyDiscountToPrice(item.price),
        image: item.image,
        category: item.category,
        hasDiscount: true
      });
    });
    
    // Clear the active deal after use
    localStorage.removeItem('active_deal');
    
    toast({
      title: "Deal Applied",
      description: `${selectedItems.length} items added to your cart with ${deal?.discount} discount`,
    });
    
    navigate('/cart');
  };
  
  if (!deal) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-16 pt-24">
          <div className="text-center">Loading deal...</div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/deals')}
          className="mb-6 flex items-center"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Deals
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4">Apply Your Deal</h1>
            
            <div className="bg-primary/10 rounded-lg p-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full p-2">
                  <Tag size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{deal.title}</h2>
                  <p className="text-muted-foreground">{deal.description}</p>
                  <Badge variant="secondary" className="mt-2">{deal.discount}</Badge>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Select Items for Your Deal</h3>
              
              {deal.id === 'combo-meal' && (
                <p className="text-sm text-muted-foreground mb-4">
                  Choose 1 sandwich, 1 coffee, and 1 soup to complete your combo
                </p>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredItems.map(item => (
                  <Card 
                    key={item.id} 
                    className={`cursor-pointer transition-all ${
                      selectedItems.some(i => i.id === item.id) 
                        ? 'ring-2 ring-primary' 
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => handleItemSelect(item)}
                  >
                    <CardContent className="p-0">
                      <div className="relative h-40 w-full">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                        />
                        {selectedItems.some(i => i.id === item.id) && (
                          <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                            <Check size={16} />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{item.name}</h4>
                          <div className="flex flex-col items-end">
                            <span className={selectedItems.some(i => i.id === item.id) ? "line-through text-muted-foreground text-sm" : ""}>
                              {item.price}
                            </span>
                            {selectedItems.some(i => i.id === item.id) && (
                              <span className="text-primary font-medium">
                                {applyDiscountToPrice(item.price)}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <Badge variant="outline" className="mt-2">{item.category}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-card rounded-xl shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-semibold mb-4">Your Selection</h3>
              
              {selectedItems.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Select items to apply your {deal.discount} discount
                </p>
              ) : (
                <>
                  <div className="space-y-4 mb-4">
                    {selectedItems.map(item => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0 mr-3">
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <Badge variant="outline" className="text-xs">{item.category}</Badge>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="line-through text-muted-foreground text-xs">{item.price}</span>
                          <span>{applyDiscountToPrice(item.price)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{calculateTotal()}</span>
                  </div>
                  
                  {deal.id === 'combo-meal' && selectedItems.length < 3 && (
                    <p className="text-sm text-muted-foreground mt-4">
                      Choose {3 - selectedItems.length} more items to complete your combo
                    </p>
                  )}
                </>
              )}
              
              <Button
                className="w-full mt-6"
                size="lg"
                onClick={handleAddToCart}
                disabled={selectedItems.length === 0 || (deal.id === 'combo-meal' && selectedItems.length < 3)}
              >
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
              </Button>
              
              <p className="text-center text-xs text-muted-foreground mt-4">
                Deal code: <span className="font-mono">{deal.code}</span>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DealUse;
