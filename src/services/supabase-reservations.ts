
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

// Define the ReservationData type
export type ReservationData = {
  id?: string;
  user_id?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  specialRequests: string;
  status: string;
  created_at?: string;
};

// Type for reservation input - we don't need to include the user_id in the input
export type ReservationInput = Omit<ReservationData, 'id' | 'user_id' | 'created_at'>;

// Ensure user profile exists before creating a reservation
const ensureUserProfile = async (userId: string, email: string, name: string) => {
  try {
    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();
    
    // If profile already exists, return
    if (existingProfile) return true;

    console.log("Creating new profile for user:", userId);
    
    // Create new profile
    const { error } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        email: email,
        name: name
      });
      
    if (error) {
      console.error("Error creating user profile:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error ensuring user profile:", error);
    // Continue execution - don't block reservation creation if profile creation fails
    return false;
  }
};

/**
 * Create a new reservation
 */
export const createReservation = async (reservationData: ReservationInput) => {
  try {
    // Check if the user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return {
        error: { message: "User not authenticated" },
        data: null
      };
    }
    
    // Ensure user profile exists
    const profileCreated = await ensureUserProfile(
      session.user.id, 
      reservationData.email, 
      reservationData.name
    );
    
    if (!profileCreated) {
      console.log("Creating profile for reservation");
    }

    // Create the reservation
    const { data, error } = await supabase
      .from('reservations')
      .insert({
        user_id: session.user.id,
        name: reservationData.name,
        email: reservationData.email,
        phone: reservationData.phone,
        date: reservationData.date,
        time: reservationData.time,
        guests: reservationData.guests,
        special_requests: reservationData.specialRequests,
        status: reservationData.status
      })
      .select()
      .single();
      
    if (error) {
      console.error("Error creating reservation:", error);
      return { error, data: null };
    }
    
    // Map database column names to our expected format
    const result: ReservationData = {
      id: data.id,
      user_id: data.user_id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      date: data.date,
      time: data.time,
      guests: data.guests,
      specialRequests: data.special_requests || '',
      status: data.status,
      created_at: data.created_at
    };
    
    return { data: result, error: null };
  } catch (error: any) {
    console.error("Unexpected error in createReservation:", error);
    return {
      error: { message: error.message || "An unexpected error occurred" },
      data: null
    };
  }
};

/**
 * Get all reservations for the current user
 */
export const getUserReservations = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return {
        error: { message: "User not authenticated" },
        data: []
      };
    }
    
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('user_id', session.user.id)
      .order('date', { ascending: true });
      
    if (error) {
      console.error("Error fetching reservations:", error);
      return { error, data: [] };
    }
    
    // Map database column names to our expected format
    const result: ReservationData[] = data.map(item => ({
      id: item.id,
      user_id: item.user_id,
      name: item.name,
      email: item.email,
      phone: item.phone,
      date: item.date,
      time: item.time,
      guests: item.guests,
      specialRequests: item.special_requests || '',
      status: item.status,
      created_at: item.created_at
    }));
    
    return { data: result, error: null };
  } catch (error: any) {
    console.error("Unexpected error in getUserReservations:", error);
    return {
      error: { message: error.message || "An unexpected error occurred" },
      data: []
    };
  }
};

/**
 * Cancel a reservation
 */
export const cancelReservation = async (reservationId: string) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return {
        error: { message: "User not authenticated" },
        data: null
      };
    }
    
    const { data, error } = await supabase
      .from('reservations')
      .update({ status: 'cancelled' })
      .eq('id', reservationId)
      .eq('user_id', session.user.id) // Ensure the user owns the reservation
      .select()
      .maybeSingle(); // Use maybeSingle instead of single to avoid errors when no data is returned
      
    if (error) {
      console.error("Error cancelling reservation:", error);
      return { error, data: null };
    }
    
    if (!data) {
      return { 
        error: { message: "Reservation not found or you don't have permission to cancel it" },
        data: null 
      };
    }
    
    // Map database column names to our expected format
    const result: ReservationData = {
      id: data.id,
      user_id: data.user_id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      date: data.date,
      time: data.time,
      guests: data.guests,
      specialRequests: data.special_requests || '',
      status: data.status,
      created_at: data.created_at
    };
    
    return { data: result, error: null };
  } catch (error: any) {
    console.error("Unexpected error in cancelReservation:", error);
    return {
      error: { message: error.message || "An unexpected error occurred" },
      data: null
    };
  }
};

// Function to update History.tsx to use
export const getReservationsForCurrentUser = getUserReservations;
