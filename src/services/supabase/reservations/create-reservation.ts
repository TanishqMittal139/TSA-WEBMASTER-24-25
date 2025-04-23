
import { supabase } from "@/integrations/supabase/client";
import { ReservationInput, ReservationData } from "./types";

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
    
    const userId = session.user.id;
    
    // First, check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();

    // If profile doesn't exist, create it
    if (!existingProfile) {
      console.log("Creating profile for user ID:", userId);
      
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          email: reservationData.email,
          name: reservationData.name,
          phone: reservationData.phone
        });
      
      if (profileError) {
        console.error("Error creating profile:", profileError);
        return {
          error: { 
            message: `Failed to create user profile: ${profileError.message}` 
          },
          data: null
        };
      }
      
      console.log("Profile created successfully");
    }

    console.log("Creating reservation with user_id:", userId);

    // Create the reservation with user_id
    const { data, error } = await supabase
      .from('reservations')
      .insert({
        user_id: userId,
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
