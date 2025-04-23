import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import BlurImage from '@/components/ui/blur-image';
import AnimatedHeader from '@/components/ui/animated-header';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { ReservationData, getUserReservations, cancelReservation } from '@/services/supabase-reservations';
import { useAuth } from '@/context/AuthContext';
import ReservationForm from '@/components/reservations/ReservationForm';
import ReservationList from '@/components/reservations/ReservationList';
import ReservationInfo from '@/components/reservations/ReservationInfo';
import { Button } from '@/components/ui/button';
import { ShieldAlert, Lock } from 'lucide-react';

const Reservations = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("new");
  const [myReservations, setMyReservations] = useState<ReservationData[]>([]);
  const { user, isLoading } = useAuth();
  
  useEffect(() => {
    const checkAuth = async () => {
      if (!isLoading) {
        if (user) {
          await loadUserReservations();
        }
      }
    };
    
    checkAuth();
  }, [user, isLoading]);

  const loadUserReservations = async () => {
    if (!user) {
      setMyReservations([]);
      return;
    }
    
    try {
      const { data, error } = await getUserReservations();
      
      if (error) {
        console.error("Error loading reservations:", error);
        toast({
          title: "Error loading reservations",
          description: error.message || "Failed to load your reservations",
          variant: "destructive"
        });
        return;
      }
      
      setMyReservations(data || []);
    } catch (error) {
      console.error("Error in loadUserReservations:", error);
      setMyReservations([]);
    }
  };

  const handleCancelReservation = async (id: string) => {
    try {
      const { error } = await cancelReservation(id);
      
      if (!error) {
        toast({
          title: "Reservation Cancelled",
          description: "Your reservation has been successfully cancelled.",
        });
        
        await loadUserReservations();
      } else {
        toast({
          title: "Failed to Cancel",
          description: error.message || "An error occurred while cancelling your reservation",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Cancellation error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
              <p className="mt-4">Loading...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="relative h-80">
          <div className="absolute inset-0">
            <BlurImage
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2670&auto=format&fit=crop"
              alt="Reservations"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10"></div>
          </div>
          <div className="relative container mx-auto px-4 flex flex-col justify-center h-full pt-24">
            <div className="transition-all duration-1000 transform translate-y-0 opacity-100">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Reserve a Table
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Reservations</h1>
              <p className="text-muted-foreground max-w-xl">
                Reserve your table or manage your existing reservations at Tasty Hub.
              </p>
            </div>
          </div>
        </section>
        
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            {!user ? (
              <div className="bg-card rounded-xl shadow-lg p-6 md:p-8 text-center">
                <ShieldAlert className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
                <p className="mb-6">Please sign in to make or view reservations.</p>
                <Button onClick={() => navigate('/sign-in', { state: { from: '/reservations' } })} className="flex items-center mx-auto gap-2">
                  <Lock size={16} />
                  Sign In
                </Button>
              </div>
            ) : (
              <Tabs defaultValue="new" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 mb-8">
                  <TabsTrigger value="new">New Reservation</TabsTrigger>
                  <TabsTrigger value="my">
                    My Reservations 
                    {myReservations.length > 0 && (
                      <span className="ml-2 bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
                        {myReservations.length}
                      </span>
                    )}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="new" className="mt-0">
                  <ReservationForm onSuccess={() => {
                    loadUserReservations();
                    setActiveTab("my");
                  }} />
                </TabsContent>
                
                <TabsContent value="my" className="mt-0">
                  <ReservationList
                    reservations={myReservations}
                    onCancelReservation={handleCancelReservation}
                    onNewReservation={() => setActiveTab("new")}
                  />
                </TabsContent>
              </Tabs>
            )}
            
            <ReservationInfo />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reservations;
