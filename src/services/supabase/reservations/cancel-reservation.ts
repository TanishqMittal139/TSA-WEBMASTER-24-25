
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

    // Send cancellation email
    try {
      const response = await fetch("https://fxrkqggeqhsiroppqtok.supabase.co/functions/v1/send-reservation-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4cmtxZ2dlcWhzaXJvcHBxdG9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0NTQ4MTMsImV4cCI6MjA1OTAzMDgxM30.esXUYy0IwzeCFkQdygmIXBVPx692GrhsEBZiPQ-rQtg`,
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          status: 'cancelled'
        }),
      });

      if (!response.ok) {
        console.error("Failed to send cancellation email");
      }
    } catch (emailError) {
      console.error("Error sending cancellation email:", emailError);
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
