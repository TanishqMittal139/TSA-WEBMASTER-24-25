
// A simulated reservations service

import { format } from 'date-fns';
import { toast } from '@/components/ui/use-toast';

interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  guests: string;
  specialRequests?: string;
}

interface ReservationResponse {
  success: boolean;
  message: string;
  reservationId?: string;
}

// Store for reservations
const RESERVATIONS_KEY = 'tasty_hub_reservations';

// Create a reservation and simulate sending an email
const createReservation = async (data: ReservationData): Promise<ReservationResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  try {
    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.date || !data.time || !data.guests) {
      return {
        success: false,
        message: 'All required fields must be provided'
      };
    }
    
    // Create a reservation object with an ID
    const reservationId = `RES-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const reservation = {
      id: reservationId,
      ...data,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };
    
    // Save to "database" (localStorage)
    const existingReservations = JSON.parse(localStorage.getItem(RESERVATIONS_KEY) || '[]');
    existingReservations.push(reservation);
    localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(existingReservations));
    
    // Simulate sending confirmation email
    console.log(`[Email Service] Sending confirmation email to ${data.email}`);
    console.log(`[Email Service] Subject: Your Tasty Hub Reservation Confirmation #${reservationId}`);
    console.log(`[Email Service] Content: Dear ${data.name}, your reservation for ${data.guests} guests on ${format(data.date, 'MMMM d, yyyy')} at ${data.time} has been confirmed.`);
    
    // Create a notification for the email sending
    toast({
      title: "Confirmation Email Sent",
      description: `A confirmation email has been sent to ${data.email}`,
    });
    
    return {
      success: true,
      message: 'Reservation confirmed successfully',
      reservationId
    };
  } catch (error) {
    console.error('Reservation error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
};

// Get a reservation by ID
const getReservationById = (id: string) => {
  const reservations = JSON.parse(localStorage.getItem(RESERVATIONS_KEY) || '[]');
  return reservations.find((res: any) => res.id === id) || null;
};

// Get all reservations for a user
const getReservationsByEmail = (email: string) => {
  const reservations = JSON.parse(localStorage.getItem(RESERVATIONS_KEY) || '[]');
  return reservations.filter((res: any) => res.email === email);
};

// Cancel a reservation
const cancelReservation = async (id: string): Promise<ReservationResponse> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    const reservations = JSON.parse(localStorage.getItem(RESERVATIONS_KEY) || '[]');
    const index = reservations.findIndex((res: any) => res.id === id);
    
    if (index === -1) {
      return {
        success: false,
        message: 'Reservation not found'
      };
    }
    
    // Update reservation status
    reservations[index].status = 'cancelled';
    reservations[index].cancelledAt = new Date().toISOString();
    
    // Save updated reservations
    localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(reservations));
    
    return {
      success: true,
      message: 'Reservation cancelled successfully'
    };
  } catch (error) {
    console.error('Cancellation error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
};

export {
  createReservation,
  getReservationById,
  getReservationsByEmail,
  cancelReservation,
  type ReservationData,
  type ReservationResponse
};
