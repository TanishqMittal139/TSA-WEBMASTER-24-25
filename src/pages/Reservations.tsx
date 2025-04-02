import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Clock, Users, Utensils, Trash2, UserCheck, Lock, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/use-toast';
import { createReservation, getReservationsForCurrentUser, cancelReservation, ReservationData } from '@/services/supabase-reservations';
import { getCurrentUser, isAuthenticated, getUserProfile, UserProfile } from '@/services/supabase-auth';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  date: z.date({ required_error: 'Please select a date.' }),
  time: z.string({ required_error: 'Please select a time.' }),
  guests: z.string({ required_error: 'Please select number of guests.' }),
  specialRequests: z.string().optional(),
});

const availableTimes = [
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', 
  '1:30 PM', '2:00 PM', '5:00 PM', '5:30 PM', '6:00 PM', 
  '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'
];

const Reservations = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("new");
  const [myReservations, setMyReservations] = useState<ReservationData[]>([]);
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await isAuthenticated();
      setAuthenticated(isAuth);
      
      if (!isAuth) {
        toast({
          title: "Authentication required",
          description: "Please sign in to make or view reservations",
          variant: "destructive",
        });
        navigate('/sign-in');
        return;
      }
      
      const currentUser = await getCurrentUser();
      const profile = await getUserProfile();
      
      setUser(currentUser);
      setUserProfile(profile);
      
      loadUserReservations();
    };
    
    checkAuth();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setAuthenticated(!!session);
        
        if (session?.user) {
          setUser(session.user);
          const profile = await getUserProfile();
          setUserProfile(profile);
          loadUserReservations();
        } else {
          setUser(null);
          setUserProfile(null);
          setMyReservations([]);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const loadUserReservations = async () => {
    const reservations = await getReservationsForCurrentUser();
    setMyReservations(reservations);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userProfile?.name || '',
      email: userProfile?.email || '',
      phone: userProfile?.phone || '',
      specialRequests: '',
    },
  });
  
  // Update form when userProfile is loaded
  useEffect(() => {
    if (userProfile) {
      form.setValue('name', userProfile.name || '');
      form.setValue('email', userProfile.email || '');
      form.setValue('phone', userProfile.phone || '');
    }
  }, [userProfile, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      navigate('/sign-in');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const reservationData = {
        user_id: user.id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        date: format(values.date, 'yyyy-MM-dd'), // Convert Date to string format
        time: values.time,
        guests: values.guests,
        specialRequests: values.specialRequests || null,
        status: 'confirmed',
      };
      
      const { data, error } = await createReservation(reservationData);
      
      if (data) {
        toast({
          title: "Reservation Confirmed!",
          description: `Your table for ${values.guests} is booked for ${format(values.date, 'MMMM d, yyyy')} at ${values.time}.`,
        });
        
        await loadUserReservations();
        
        setActiveTab("my");
      } else {
        toast({
          title: "Reservation Failed",
          description: error?.message || "An error occurred while creating your reservation.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Reservation error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelReservation = async (id: string) => {
    try {
      const result = await cancelReservation(id);
      
      if (result.success) {
        toast({
          title: "Reservation Cancelled",
          description: "Your reservation has been successfully cancelled.",
        });
        
        await loadUserReservations();
      } else {
        toast({
          title: "Failed to Cancel",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Cancellation error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (authenticated === null) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto text-center">
              <p>Loading...</p>
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
      
      <main className="flex-grow pt-20">
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Reservations</h1>
              <p className="text-muted-foreground">
                Reserve your table or manage your existing reservations at Tasty Hub.
              </p>
            </div>
            
            {!authenticated ? (
              <div className="bg-card rounded-xl shadow-lg p-6 md:p-8 text-center">
                <ShieldAlert className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
                <p className="mb-6">Please sign in to make or view reservations.</p>
                <Button onClick={() => navigate('/sign-in')} className="flex items-center mx-auto gap-2">
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
                  <div className="bg-card rounded-xl shadow-lg p-6 md:p-8">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="you@example.com" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="(555) 123-4567" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="guests"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Number of Guests</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select number of guests" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                      <SelectItem key={num} value={num.toString()}>
                                        {num} {num === 1 ? 'Guest' : 'Guests'}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Date</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-full pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) => date < new Date()}
                                      initialFocus
                                      className="p-3 pointer-events-auto"
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Time</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a time" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {availableTimes.map((time) => (
                                      <SelectItem key={time} value={time}>
                                        {time}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="specialRequests"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Special Requests (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Any allergies or special seating preferences?" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="w-full" 
                          size="lg"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Processing..." : "Confirm Reservation"}
                        </Button>
                      </form>
                    </Form>
                  </div>
                </TabsContent>
                
                <TabsContent value="my" className="mt-0">
                  <div className="bg-card rounded-xl shadow-lg p-6 md:p-8">
                    <h2 className="text-xl font-semibold mb-6 flex items-center">
                      <UserCheck className="mr-2 h-5 w-5" />
                      Your Reservations
                    </h2>
                    
                    {myReservations.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">You don't have any reservations yet.</p>
                        <Button variant="outline" onClick={() => setActiveTab("new")}>
                          Make a Reservation
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {myReservations.map((reservation) => (
                          <div key={reservation.id} className="border border-border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center mb-2">
                                  <span className={`inline-block h-2 w-2 rounded-full mr-2 ${
                                    reservation.status === 'confirmed' ? 'bg-green-500' : 'bg-red-500'
                                  }`}></span>
                                  <h3 className="font-medium">
                                    {reservation.id && `Reservation #${reservation.id.substring(0, 8)}...`}
                                  </h3>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-3">
                                  <div className="flex items-center">
                                    <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span>{format(new Date(reservation.date), 'MMMM d, yyyy')}</span>
                                  </div>
                                  
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span>{reservation.time}</span>
                                  </div>
                                  
                                  <div className="flex items-center">
                                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span>{reservation.guests} {parseInt(reservation.guests) === 1 ? 'Guest' : 'Guests'}</span>
                                  </div>
                                </div>
                                
                                {reservation.specialRequests && (
                                  <p className="text-sm text-muted-foreground mt-2 border-t border-border pt-2">
                                    <span className="font-medium">Special Requests:</span> {reservation.specialRequests}
                                  </p>
                                )}
                              </div>
                              
                              {reservation.status !== 'cancelled' && (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Cancel Reservation</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to cancel your reservation for {format(new Date(reservation.date), 'MMMM d, yyyy')} at {reservation.time}?
                                        This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Keep Reservation</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleCancelReservation(reservation.id as string)}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                        Cancel Reservation
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}
                            </div>
                            
                            {reservation.status === 'cancelled' && (
                              <div className="mt-2 bg-destructive/10 text-destructive text-sm rounded px-2 py-1 inline-block">
                                Cancelled
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            )}
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-primary/5 rounded-lg">
                <Clock className="text-primary mb-4" size={32} />
                <h3 className="text-lg font-medium mb-2">Opening Hours</h3>
                <p className="text-sm text-muted-foreground">
                  Monday-Saturday: 7:00 AM - 9:00 PM<br />
                  Sunday: 8:30 AM - 5:00 PM
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 bg-primary/5 rounded-lg">
                <Users className="text-primary mb-4" size={32} />
                <h3 className="text-lg font-medium mb-2">Group Bookings</h3>
                <p className="text-sm text-muted-foreground">
                  For parties of 8 or more, please contact us directly at (555) 123-4567.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 bg-primary/5 rounded-lg">
                <Utensils className="text-primary mb-4" size={32} />
                <h3 className="text-lg font-medium mb-2">Special Events</h3>
                <p className="text-sm text-muted-foreground">
                  Ask about our private dining options for special celebrations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reservations;
