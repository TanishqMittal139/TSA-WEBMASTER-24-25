import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '../components/ui/navbar';
import Footer from '../components/ui/footer';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import DealsHero from '@/components/deals/DealsHero';
import DealsGrid from '@/components/deals/DealsGrid';

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
    description: '20% off one beverage Monday through Friday',
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
    discount: '15% OFF',
    discountType: 'percentage',
    discountAmount: 15,
    code: 'BREKKIE15',
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
    appliesTo: 'category',
    categories: ['lunch', 'sides'],
    items: ['sandwich-veggie-deluxe', 'sandwich-mushroom', 'sandwich-mediterranean', 'bowl-chicken-rice', 'salad-greek', 'tacos-beef'],
    image: 'https://images.unsplash.com/photo-1627309302198-09a50ae1b209?q=80&w=1374&auto=format&fit=crop',
    isPopular: true
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
      
      <DealsHero />
      
      <main className="container mx-auto px-4 py-8 mb-12">
        <Tabs defaultValue="current" className="mb-8" onValueChange={setActiveTab}>
          <div className="flex justify-center">
            <TabsList className="bg-card/50 backdrop-blur-sm border border-border">
              <TabsTrigger value="current">Current Deals</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Deals</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="current" className="mt-8">
            <DealsGrid deals={currentDeals} onActivateDeal={handleActivateDeal} />
          </TabsContent>
          
          <TabsContent value="upcoming" className="mt-8">
            {upcomingDeals.length > 0 ? (
              <DealsGrid deals={upcomingDeals} onActivateDeal={handleActivateDeal} />
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Deals;
