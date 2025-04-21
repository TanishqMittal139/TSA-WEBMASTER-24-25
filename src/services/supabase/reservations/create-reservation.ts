
import { supabase } from "@/integrations/supabase/client";
import { ReservationInput, ReservationData, ReservationFormInput } from "./types";
import { ensureUserProfile } from "../profiles/ensure-profile";

// Overloaded function to handle both full reservation data and simplified form data
export const createReservation = async (
  reservationData: ReservationInput | ReservationFormInput
) => {
  try {
    // Check if the user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return {
        error: { message: "User not authenticated" },
        data: null
      };
    }
    
    // Check if we're using the simplified form input
    if ('locationId' in reservationData) {
      // This is a simplified form input
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData || !userData.user) {
        return {
          error: { message: "User data not available" },
          data: null
        };
      }
      
      // Get user profile to fill in missing fields
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      // Create a complete reservation input using profile data
      const completeReservationData: ReservationInput = {
        name: profileData?.name || userData.user.email?.split('@')[0] || 'Guest',
        email: profileData?.email || userData.user.email || '',
        phone: profileData?.phone || '',
        date: reservationData.date,
        time: reservationData.time,
        guests: reservationData.guests,
        specialRequests: '',
        status: 'confirmed'
      };
      
      reservationData = completeReservationData;
    }
    
    // Ensure user profile exists
    const profileCreated = await ensureUserProfile(
      session.user.id, 
      reservationData.email, 
      reservationData.name
    );
    
    if (!profileCreated) {
      console.log("Failed to create profile for reservation, continuing with reservation creation");
    }

    console.log("Creating reservation with user_id:", session.user.id);

    // Create the reservation with user_id
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
