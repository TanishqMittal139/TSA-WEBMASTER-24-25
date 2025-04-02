import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, CalendarRange, ClipboardList, AlertCircle } from 'lucide-react';
import { getReservationsForCurrentUser, ReservationData } from '@/services/supabase-reservations';
import { useAuth } from '@/context/AuthContext';

const History = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [reservations, setReservations] = useState<ReservationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
      return;
    }
    
    const loadReservations = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await getReservationsForCurrentUser();
        
        if (error) {
          setError(error.message || 'Failed to load reservations');
          return;
        }
        
        setReservations(data || []);
      } catch (err: any) {
        console.error('Error loading reservations:', err);
        setError(err.message || 'Failed to load your reservations. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadReservations();
  }, [user, navigate]);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500 hover:bg-green-600';
      case 'pending':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'cancelled':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const renderReservationsList = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center p-12">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="flex justify-center items-center p-12 text-center">
          <div>
            <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
            <h3 className="text-lg font-medium mb-2">Failed to load data</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button 
              onClick={() => window.location.reload()}
              variant="outline"
            >
              Try Again
            </Button>
          </div>
        </div>
      );
    }
    
    if (reservations.length === 0) {
      return (
        <div className="flex justify-center items-center p-12 text-center">
          <div>
            <CalendarRange className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No reservations found</h3>
            <p className="text-muted-foreground mb-4">
              You haven't made any reservations yet
            </p>
            <Button onClick={() => navigate('/reservations')}>
              Make a Reservation
            </Button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="grid gap-4">
        {reservations.map((reservation) => (
          <Card key={reservation.id} className="overflow-hidden">
            <div className={`h-2 w-full ${getStatusColor(reservation.status)}`}></div>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-medium">{reservation.name}</h3>
                    <Badge 
                      variant={reservation.status === 'confirmed' ? 'default' : 
                              reservation.status === 'pending' ? 'outline' : 'destructive'}
                    >
                      {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground">
                    {formatDate(reservation.date)} at {reservation.time}
                  </p>
                  
                  <div className="mt-2 space-y-1">
                    <p className="text-sm"><span className="font-medium">Guests:</span> {reservation.guests}</p>
                    <p className="text-sm"><span className="font-medium">Phone:</span> {reservation.phone}</p>
                    {reservation.specialRequests && (
                      <p className="text-sm mt-2">
                        <span className="font-medium">Special Requests:</span> {reservation.specialRequests}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-row md:flex-col items-center md:items-end gap-2 mt-4 md:mt-0">
                  {reservation.status !== 'cancelled' && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/reservations/edit/${reservation.id}`)}
                      >
                        Modify
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => navigate(`/reservations/cancel/${reservation.id}`)}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Your Activity</h1>
              <p className="text-muted-foreground">
                View your order history and reservations
              </p>
            </div>
            
            <Tabs defaultValue="reservations">
              <TabsList className="mb-6">
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <ShoppingBag size={16} />
                  <span>Orders</span>
                </TabsTrigger>
                <TabsTrigger value="reservations" className="flex items-center gap-2">
                  <CalendarRange size={16} />
                  <span>Reservations</span>
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex items-center gap-2">
                  <ClipboardList size={16} />
                  <span>All Activity</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>
                      All your past food orders
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center items-center p-12 text-center">
                      <div>
                        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                        <h3 className="text-lg font-medium mb-2">No order history</h3>
                        <p className="text-muted-foreground mb-4">
                          You haven't placed any orders yet
                        </p>
                        <Button onClick={() => navigate('/menu')}>
                          Browse Menu
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reservations">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Reservations</CardTitle>
                    <CardDescription>
                      All your table reservations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderReservationsList()}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>All Activity</CardTitle>
                    <CardDescription>
                      Your complete history with Tasty Hub
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderReservationsList()}
                    
                    <div className="flex justify-center items-center p-12 text-center mt-8 border-t border-border pt-8">
                      <div>
                        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                        <h3 className="text-lg font-medium mb-2">No order history</h3>
                        <p className="text-muted-foreground mb-4">
                          You haven't placed any orders yet
                        </p>
                        <Button onClick={() => navigate('/menu')}>
                          Browse Menu
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default History;
