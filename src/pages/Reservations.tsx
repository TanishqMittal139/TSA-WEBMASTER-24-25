import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format } from 'date-fns';
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createReservation } from '@/services/supabase-reservations';
import { isAuthenticated } from '@/services/auth';
import PageHeader from '@/components/ui/page-header';

const FormSchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
  time: z.string({
    required_error: "Please select a time.",
  }),
  guests: z.string({
    required_error: "Please select the number of guests.",
  }),
})

const Reservations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [locationId, setLocationId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (location.state && location.state.locationId) {
      setLocationId(location.state.locationId);
    }
  }, [location.state]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: new Date(),
      time: "",
      guests: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!isAuthenticated()) {
      toast({
        title: "Not authenticated",
        description: "You must be signed in to make a reservation.",
      })
      navigate('/sign-in', { state: { redirectTo: '/reservations' } });
      return;
    }

    createReservation({
      date: format(data.date, 'yyyy-MM-dd'),
      time: data.time,
      guests: data.guests,
      locationId: locationId || 'defaultLocationId',
    }).then(() => {
      toast({
        title: "Success",
        description: "Your reservation has been created.",
      })
      navigate('/profile');
    }).catch((error) => {
      toast({
        title: "Error",
        description: "There was an error creating your reservation.",
      })
    });
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <PageHeader
        title="Make a Reservation"
        subtitle="Book your table online and enjoy a memorable dining experience"
        badge="Book a Table"
        imageSrc="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070"
      />
      
      <main className="flex-grow">
        <div className="container mx-auto py-12">
          <div className="max-w-2xl mx-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <Calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date()
                            }
                            initialFocus
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
                          <SelectItem value="12:00">12:00</SelectItem>
                          <SelectItem value="12:30">12:30</SelectItem>
                          <SelectItem value="13:00">13:00</SelectItem>
                          <SelectItem value="13:30">13:30</SelectItem>
                          <SelectItem value="14:00">14:00</SelectItem>
                          <SelectItem value="14:30">14:30</SelectItem>
                          <SelectItem value="15:00">15:00</SelectItem>
                          <SelectItem value="15:30">15:30</SelectItem>
                          <SelectItem value="16:00">16:00</SelectItem>
                          <SelectItem value="16:30">16:30</SelectItem>
                          <SelectItem value="17:00">17:00</SelectItem>
                          <SelectItem value="17:30">17:30</SelectItem>
                          <SelectItem value="18:00">18:00</SelectItem>
                          <SelectItem value="18:30">18:30</SelectItem>
                          <SelectItem value="19:00">19:00</SelectItem>
                          <SelectItem value="19:30">19:30</SelectItem>
                          <SelectItem value="20:00">20:00</SelectItem>
                          <SelectItem value="20:30">20:30</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guests</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select guest amount" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1 Guest</SelectItem>
                          <SelectItem value="2">2 Guests</SelectItem>
                          <SelectItem value="3">3 Guests</SelectItem>
                          <SelectItem value="4">4 Guests</SelectItem>
                          <SelectItem value="5">5 Guests</SelectItem>
                          <SelectItem value="6">6 Guests</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reservations;
