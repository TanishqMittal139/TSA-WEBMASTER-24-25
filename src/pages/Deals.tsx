
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Tag, ArrowRight, CalendarDays } from 'lucide-react';
import Navbar from '../components/ui/navbar';
import Footer from '../components/ui/footer';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import BlurImage from '@/components/ui/blur-image';

export interface DealData {
  id: string;
  title: string;
  description: string;
  discount: string;
  discountType: 'percentage' | 'fixed';
  discountAmount: number;
  code: string;
  validUntil: string;
  appliesTo: 'all' | 'category' | 'specific';
  categories?: string[];
  items?: string[];
  image: string;
  isPopular?: boolean;
}

const deals: DealData[] = [
  {
    id: 'happy-hour',
    title: 'Happy Hour Special',
    description: '20% off all beverages between 3pm and 6pm, Monday through Friday',
    discount: '20% OFF',
    discountType: 'percentage',
    discountAmount: 20,
    code: 'HAPPY20',
    validUntil: '2025-12-31',
    appliesTo: 'category',
    categories: ['beverages', 'drinks'],
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1257&auto=format&fit=crop',
    isPopular: true
  },
  {
    id: 'breakfast-bundle',
    title: 'Breakfast Bundle',
    description: 'Any breakfast item with coffee for a special price',
    discount: '$3 OFF',
    discountType: 'fixed',
    discountAmount: 3,
    code: 'BREKKIE3',
    validUntil: '2025-12-31',
    appliesTo: 'category',
    categories: ['breakfast'],
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: 'lunch-special',
    title: 'Lunch Special',
    description: 'Buy any sandwich and get a free soup or side salad',
    discount: 'FREE SIDE',
    discountType: 'fixed',
    discountAmount: 5.99,
    code: 'LUNCH599',
    validUntil: '2025-12-31',
    appliesTo: 'specific',
    items: ['sandwich-veggie-deluxe', 'sandwich-mushroom', 'sandwich-mediterranean'],
    image: 'https://images.unsplash.com/photo-1627309302198-09a50ae1b209?q=80&w=1374&auto=format&fit=crop',
    isPopular: true
  },
  {
    id: 'combo-meal',
    title: 'Combo Meal Deal',
    description: 'Choose one sandwich, one coffee, and one soup for a special combo price',
    discount: '15% OFF',
    discountType: 'percentage',
    discountAmount: 15,
    code: 'COMBO15',
    validUntil: '2025-12-31',
    appliesTo: 'all',
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=1064&auto=format&fit=crop'
  },
  {
    id: 'new-customer',
    title: 'New Customer Discount',
    description: 'First-time customers get 10% off their entire order',
    discount: '10% OFF',
    discountType: 'percentage',
    discountAmount: 10,
    code: 'WELCOME10',
    validUntil: '2025-12-31',
    appliesTo: 'all',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=1470&auto=format&fit=crop', // Updated image URL
  }
];

const Deals: React.FC = () => {
  const [activeTab, setActiveTab] = useState("current");
  const navigate = useNavigate();
  const { user, session } = useAuth();
  
  const currentDeals = deals;
  const upcomingDeals: DealData[] = [];

  const handleActivateDeal = (deal: DealData) => {
    if (!user || !session) {
      toast({
        title: "Sign in Required",
        description: "Please sign in to use this deal",
        variant: "destructive"
      });
      navigate('/sign-in', { state: { redirectTo: '/deals' } });
      return;
    }
    
    localStorage.setItem('active_deal', JSON.stringify(deal));
    navigate(`/deals/${deal.id}/use`);
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="relative h-80">
        <div className="absolute inset-0">
          <BlurImage
            src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=2070&auto=format&fit=crop"
            alt="Special Deals"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10"></div>
        </div>
        
        <div className="relative container mx-auto px-4 flex flex-col justify-center h-full pt-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-white">Special Deals & Offers</h1>
            <p className="text-lg text-white/90">
              Discover our latest promotions and save on your favorite meals
            </p>
          </div>
        </div>
      </section>
      
      <main className="container mx-auto px-4 py-8 mb-12">
        <Tabs defaultValue="current" className="mb-8" onValueChange={setActiveTab}>
          <div className="flex justify-center">
            <TabsList className="bg-card/50 backdrop-blur-sm border border-border">
              <TabsTrigger value="current">Current Deals</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Deals</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="current" className="mt-8">
            {currentDeals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentDeals.map(deal => (
                  <Card key={deal.id} className="overflow-hidden h-full flex flex-col">
                    <div className="relative h-48">
                      <img 
                        src={deal.image} 
                        alt={deal.title}
                        className="w-full h-full object-cover"
                      />
                      {deal.isPopular && (
                        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <CardContent className="flex-1 flex flex-col p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold">{deal.title}</h3>
                        <Badge variant="outline" className="text-sm font-bold">
                          {deal.discount}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4 flex-1">{deal.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarDays size={16} className="mr-1" />
                          <span>Valid until {new Date(deal.validUntil).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button
                        className="w-full mt-4"
                        onClick={() => handleActivateDeal(deal)}
                      >
                        <Tag size={16} className="mr-2" />
                        Use Deal
                        <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No current deals available.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="upcoming" className="mt-8">
            {upcomingDeals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingDeals.map(deal => (
                  <Card key={deal.id} className="overflow-hidden h-full">
                    <div className="relative h-48">
                      <img 
                        src={deal.image} 
                        alt={deal.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                        <Badge className="text-lg py-1 px-4">Coming Soon</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold">{deal.title}</h3>
                        <Badge variant="outline" className="text-sm font-bold">
                          {deal.discount}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">{deal.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CalendarDays size={16} className="mr-1" />
                        <span>Starting {new Date(deal.validUntil).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No upcoming deals at the moment.</p>
                <p className="text-muted-foreground mt-2">Check back soon for new promotions!</p>
                
                {!user && (
                  <div className="mt-6">
                    <p className="mb-3">Sign in to get notified about new deals</p>
                    <Button onClick={() => navigate('/sign-in')}>
                      Sign In
                    </Button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="bg-muted p-6 rounded-lg max-w-3xl mx-auto mt-12">
          <h2 className="text-xl font-semibold mb-2">How to Use Deals</h2>
          <ol className="list-decimal ml-5 space-y-2">
            <li>Sign in to your account to access exclusive deals</li>
            <li>Browse available deals and select the one you want</li>
            <li>Click "Use Deal" to apply the discount to eligible items</li>
            <li>Complete your order with the discount applied</li>
          </ol>
          
          {!user && (
            <div className="mt-6 text-center">
              <p className="mb-3">Sign in to access exclusive deals</p>
              <Button onClick={() => navigate('/sign-in')}>
                Sign In Now
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Deals;
