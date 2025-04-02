
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export interface ReservationData {
  id?: string;
  user_id?: string;
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  guests: string;
  special_requests?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  created_at?: Date;
}

interface ReservationResponse {
  success: boolean;
  message: string;
  reservation?: ReservationData;
}

// Create a new reservation
export const createReservation = async (data: Omit<ReservationData, 'id'>): Promise<ReservationResponse> => {
  try {
    // Simple validation
    if (!data.name || !data.email || !data.phone || !data.date || !data.time || !data.guests) {
      return {
        success: false,
        message: 'All required fields must be filled'
      };
    }

    // Insert into Supabase
    const { data: reservation, error } = await supabase
      .from('reservations')
      .insert({
        ...data,
        date: data.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating reservation:", error);
      return {
        success: false,
        message: error.message || 'An error occurred while processing your reservation'
      };
    }

    return {
      success: true,
      message: 'Your reservation has been confirmed! A confirmation email has been sent.',
      reservation
    };
  } catch (error) {
    console.error('Error creating reservation:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.'
    };
  }
};

// Get a reservation by id
export const getReservationById = async (id: string): Promise<ReservationData | null> => {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error("Error fetching reservation:", error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching reservation:', error);
    return null;
  }
};

// Get all reservations for a specific email
export const getReservationsByEmail = async (email: string): Promise<ReservationData[]> => {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching reservations by email:", error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching reservations by email:', error);
    return [];
  }
};

// Get all reservations for the current user
export const getReservationsForCurrentUser = async (): Promise<ReservationData[]> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      return [];
    }
    
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching user reservations:", error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching user reservations:', error);
    return [];
  }
};

// Cancel a reservation
export const cancelReservation = async (id: string): Promise<ReservationResponse> => {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .update({ status: 'cancelled' })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error("Error cancelling reservation:", error);
      return {
        success: false,
        message: error.message || 'Failed to cancel reservation'
      };
    }

    return {
      success: true,
      message: 'Your reservation has been cancelled',
      reservation: data
    };
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    return {
      success: false,
      message: 'An unexpected error occurred while cancelling your reservation'
    };
  }
};
