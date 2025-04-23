
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { toast } from '@/components/ui/use-toast';
import { createReservation } from '@/services/supabase-reservations';
import { syncProfileFromReservation } from '@/services/supabase-profiles';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Form } from '@/components/ui/form';

import ContactInfoFields from './ContactInfoFields';
import ReservationDetailsFields from './ReservationDetailsFields';
import SpecialRequestsField from './SpecialRequestsField';
import ReserveButton from './ReserveButton';

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

interface ReservationFormProps {
  onSuccess: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, profile } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile?.name || '',
      email: profile?.email || '',
      phone: profile?.phone || '',
      specialRequests: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to make a reservation",
        variant: "destructive",
      });
      navigate('/sign-in', { state: { from: '/reservations' } });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formattedDate = format(values.date, 'yyyy-MM-dd');
      
      const reservationData = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        date: formattedDate, 
        time: values.time,
        guests: values.guests,
        specialRequests: values.specialRequests || '',
        status: 'confirmed',
      };
      
      console.log("Submitting reservation:", reservationData);
      
      const { data, error } = await createReservation(reservationData);
      
      if (!error && data) {
        try {
          await syncProfileFromReservation(reservationData);
        } catch (err) {
          console.warn("Failed to sync profile, but reservation succeeded:", err);
        }
        
        toast({
          title: "Reservation Confirmed!",
          description: `Your table for ${values.guests} is booked for ${format(values.date, 'MMMM d, yyyy')} at ${values.time}.`,
        });
        
        onSuccess();
      } else {
        const errorDetails = error?.message 
          ? `Error: ${error.message}` 
          : error 
            ? `Error: ${JSON.stringify(error)}`
            : "An error occurred while creating your reservation.";
            
        toast({
          title: "Reservation Failed",
          description: errorDetails,
          variant: "destructive",
        });
        console.error("Reservation creation failed:", error);
      }
    } catch (error: any) {
      console.error("Reservation error:", error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-lg p-6 md:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <ContactInfoFields control={form.control} />

          <ReservationDetailsFields
            control={form.control}
            availableTimes={availableTimes}
          />

          <SpecialRequestsField control={form.control} />

          <ReserveButton isSubmitting={isSubmitting} />
        </form>
      </Form>
    </div>
  );
};

export default ReservationForm;
