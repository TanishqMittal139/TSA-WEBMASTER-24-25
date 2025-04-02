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
}

export const createReservation = async (
  name: string,
  email: string,
  phone: string,
  date: string,
  time: string,
  guests: string,
  specialRequests: string | null,
  user_id: string | undefined
): Promise<{ data: ReservationData | null; error: any }> => {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .insert([
        {
          name,
          email,
          phone,
          date,
          time,
          guests,
          specialRequests,
          user_id,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating reservation:", error);
      return { data: null, error };
    }

    return { data: data as ReservationData, error: null };
  } catch (error: any) {
    console.error("Unexpected error creating reservation:", error);
    return { data: null, error };
  }
};

export const getAllReservations = async (): Promise<{ data: ReservationData[] | null; error: any }> => {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .select('*');

    if (error) {
      console.error("Error fetching reservations:", error);
      return { data: null, error };
    }

    return { data: data as ReservationData[], error: null };
  } catch (error: any) {
    console.error("Unexpected error fetching reservations:", error);
    return { data: null, error };
  }
};

export const getReservationById = async (id: string): Promise<{ data: ReservationData | null; error: any }> => {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error("Error fetching reservation by ID:", error);
      return { data: null, error };
    }

    return { data: data as ReservationData, error: null };
  } catch (error: any) {
    console.error("Unexpected error fetching reservation by ID:", error);
    return { data: null, error };
  }
};

export const getReservationsByUserId = async (user_id: string): Promise<{ data: ReservationData[] | null; error: any }> => {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('user_id', user_id);

    if (error) {
      console.error("Error fetching reservations by user ID:", error);
      return { data: null, error };
    }

    return { data: data as ReservationData[], error: null };
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
    const { data, error } = await supabase
      .from('reservations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("Error updating reservation:", error);
      return { data: null, error };
    }

    return { data: data as ReservationData, error: null };
  } catch (error: any) {
    console.error("Unexpected error updating reservation:", error);
    return { data: null, error };
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
