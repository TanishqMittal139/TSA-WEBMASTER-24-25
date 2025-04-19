
import { supabase } from "@/integrations/supabase/client";
import { ReservationData } from "./types";

export const cancelReservation = async (reservationId: string) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return {
        error: { message: "User not authenticated" },
        data: null
      };
    }

    // Try to cancel by ID and user_id
    const { data, error } = await supabase
      .from('reservations')
      .update({ status: 'cancelled' })
      .eq('id', reservationId)
      .eq('user_id', session.user.id)
      .select()
      .single();
      
    if (error) {
      console.error("Error cancelling reservation:", error);
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
    console.error("Unexpected error in cancelReservation:", error);
    return {
      error: { message: error.message || "An unexpected error occurred" },
      data: null
    };
  }
};
