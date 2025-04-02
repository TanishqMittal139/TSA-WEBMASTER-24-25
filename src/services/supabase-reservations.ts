import { supabase } from '@/integrations/supabase/client';

export interface ReservationData {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  specialRequests: string | null;
  user_id: string | undefined;
  status: string;
}

export const createReservation = async (
  data: Omit<ReservationData, 'id' | 'created_at'>
): Promise<{ data: ReservationData | null; error: any; success?: boolean; message?: string }> => {
  try {
    // Check if the user exists in the profiles table
    if (data.user_id) {
      const { data: profileExists } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', data.user_id)
        .single();
        
      if (!profileExists) {
        console.error("User profile does not exist for ID:", data.user_id);
        return { 
          data: null, 
          error: "User profile not found", 
          success: false, 
          message: "Failed to create reservation: User profile not found."
        };
      }
    }

    const { data: result, error } = await supabase
      .from('reservations')
      .insert([{
        name: data.name,
        email: data.email,
        phone: data.phone,
        date: data.date,
        time: data.time,
        guests: data.guests,
        special_requests: data.specialRequests,
        user_id: data.user_id,
        status: data.status || 'confirmed'
      }])
      .select()
      .single();

    if (error) {
      console.error("Error creating reservation:", error);
      return { 
        data: null, 
        error,
        success: false,
        message: error.message || "Failed to create reservation"
      };
    }

    // Map from DB format to our interface format
    const mappedData: ReservationData = {
      id: result.id,
      created_at: result.created_at,
      name: result.name,
      email: result.email,
      phone: result.phone,
      date: result.date,
      time: result.time,
      guests: result.guests,
      specialRequests: result.special_requests,
      user_id: result.user_id,
      status: result.status
    };

    return { 
      data: mappedData, 
      error: null,
      success: true,
      message: "Reservation created successfully!"
    };
  } catch (error: any) {
    console.error("Unexpected error creating reservation:", error);
    return { 
      data: null, 
      error,
      success: false,
      message: error.message || "An unexpected error occurred"
    };
  }
};

export const getAllReservations = async (): Promise<{ data: ReservationData[] | null; error: any }> => {
  try {
    const { data: result, error } = await supabase
      .from('reservations')
      .select('*');

    if (error) {
      console.error("Error fetching reservations:", error);
      return { data: null, error };
    }

    // Map from DB format to our interface format
    const mappedData: ReservationData[] = result.map(item => ({
      id: item.id,
      created_at: item.created_at,
      name: item.name,
      email: item.email,
      phone: item.phone,
      date: item.date,
      time: item.time,
      guests: item.guests,
      specialRequests: item.special_requests,
      user_id: item.user_id,
      status: item.status
    }));

    return { data: mappedData, error: null };
  } catch (error: any) {
    console.error("Unexpected error fetching reservations:", error);
    return { data: null, error };
  }
};

export const getReservationById = async (id: string): Promise<{ data: ReservationData | null; error: any }> => {
  try {
    const { data: result, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error("Error fetching reservation by ID:", error);
      return { data: null, error };
    }

    // Map from DB format to our interface format
    const mappedData: ReservationData = {
      id: result.id,
      created_at: result.created_at,
      name: result.name,
      email: result.email,
      phone: result.phone,
      date: result.date,
      time: result.time,
      guests: result.guests,
      specialRequests: result.special_requests,
      user_id: result.user_id,
      status: result.status
    };

    return { data: mappedData, error: null };
  } catch (error: any) {
    console.error("Unexpected error fetching reservation by ID:", error);
    return { data: null, error };
  }
};

export const getReservationsByUserId = async (user_id: string): Promise<{ data: ReservationData[] | null; error: any }> => {
  try {
    const { data: result, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('user_id', user_id);

    if (error) {
      console.error("Error fetching reservations by user ID:", error);
      return { data: null, error };
    }

    // Map from DB format to our interface format
    const mappedData: ReservationData[] = result.map(item => ({
      id: item.id,
      created_at: item.created_at,
      name: item.name,
      email: item.email,
      phone: item.phone,
      date: item.date,
      time: item.time,
      guests: item.guests,
      specialRequests: item.special_requests,
      user_id: item.user_id,
      status: item.status
    }));

    return { data: mappedData, error: null };
  } catch (error: any) {
    console.error("Unexpected error fetching reservations by user ID:", error);
    return { data: null, error };
  }
};

export const updateReservation = async (
  id: string,
  updates: Partial<ReservationData>
): Promise<{ data: ReservationData | null; error: any }> => {
  try {
    // Convert from our interface format to DB format
    const dbUpdates: any = { ...updates };
    if (updates.specialRequests !== undefined) {
      dbUpdates.special_requests = updates.specialRequests;
      delete dbUpdates.specialRequests;
    }

    const { data: result, error } = await supabase
      .from('reservations')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("Error updating reservation:", error);
      return { data: null, error };
    }

    // Map from DB format to our interface format
    const mappedData: ReservationData = {
      id: result.id,
      created_at: result.created_at,
      name: result.name,
      email: result.email,
      phone: result.phone,
      date: result.date,
      time: result.time,
      guests: result.guests,
      specialRequests: result.special_requests,
      user_id: result.user_id,
      status: result.status
    };

    return { data: mappedData, error: null };
  } catch (error: any) {
    console.error("Unexpected error updating reservation:", error);
    return { data: null, error };
  }
};

export const getReservationsForCurrentUser = async (): Promise<{ data: ReservationData[] | null; error: any }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { data: null, error: "User not authenticated" };
    }
    
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('user_id', user.id);
      
    if (error) {
      console.error("Error fetching user reservations:", error);
      return { data: null, error };
    }
    
    // Map from DB format to our interface format
    const mappedData: ReservationData[] = data.map(item => ({
      id: item.id,
      created_at: item.created_at,
      name: item.name,
      email: item.email,
      phone: item.phone,
      date: item.date,
      time: item.time,
      guests: item.guests,
      specialRequests: item.special_requests,
      user_id: item.user_id,
      status: item.status
    }));
    
    return { data: mappedData, error: null };
  } catch (error) {
    console.error("Unexpected error fetching user reservations:", error);
    return { data: null, error };
  }
};

export const cancelReservation = async (id: string): Promise<{ success: boolean; message: string; reservation?: ReservationData }> => {
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
        message: `Failed to cancel reservation: ${error.message}` 
      };
    }
    
    // Map from DB format to our interface format
    const mappedData: ReservationData = {
      id: data.id,
      created_at: data.created_at,
      name: data.name,
      email: data.email,
      phone: data.phone,
      date: data.date,
      time: data.time,
      guests: data.guests,
      specialRequests: data.special_requests,
      user_id: data.user_id,
      status: data.status
    };
    
    return { 
      success: true, 
      message: "Reservation cancelled successfully",
      reservation: mappedData
    };
  } catch (error: any) {
    console.error("Unexpected error cancelling reservation:", error);
    return { 
      success: false, 
      message: `An unexpected error occurred: ${error.message}` 
    };
  }
};

export const deleteReservation = async (id: string): Promise<{ success: boolean; error: any }> => {
  try {
    const { error } = await supabase
      .from('reservations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting reservation:", error);
      return { success: false, error };
    }

    return { success: true, error: null };
  } catch (error: any) {
    console.error("Unexpected error deleting reservation:", error);
    return { success: false, error };
  }
};
