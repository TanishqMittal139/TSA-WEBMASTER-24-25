
import { supabase } from "@/integrations/supabase/client";
import { ReservationData } from "./types";

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
