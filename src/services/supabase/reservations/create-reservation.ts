
import { supabase } from "@/integrations/supabase/client";
import { ReservationInput, ReservationData } from "./types";

export const createReservation = async (reservationData: ReservationInput) => {
  try {
    // Check if the user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    
    // Create the reservation with or without user_id
    console.log("Creating reservation with data:", reservationData);
    
    const insertData: any = {
      name: reservationData.name,
      email: reservationData.email,
      phone: reservationData.phone,
      date: reservationData.date,
      time: reservationData.time,
      guests: reservationData.guests,
      special_requests: reservationData.specialRequests,
      status: reservationData.status
    };
    
    // Only add user_id if user is logged in
    if (session?.user) {
      insertData.user_id = session.user.id;
    }
    
    const { data, error } = await supabase
      .from('reservations')
      .insert(insertData)
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
