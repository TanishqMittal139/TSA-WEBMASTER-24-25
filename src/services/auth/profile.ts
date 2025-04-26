
import { supabase } from '@/integrations/supabase/client';
import { UserProfile, AuthResult } from './types';

export const getUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      console.warn("No session found, user is not authenticated.");
      return null;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }

    return data as UserProfile;
  } catch (error) {
    console.error("Unexpected error fetching profile:", error);
    return null;
  }
};

export const updateUserProfile = async (profileData: Partial<UserProfile>): Promise<AuthResult> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      return { success: false, message: "No session found, user is not authenticated." };
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', session.user.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating profile:", error);
      return { success: false, message: error.message };
    }

    return { success: true, message: "Profile updated successfully", user: data as UserProfile };
  } catch (error: any) {
    console.error("Unexpected error updating profile:", error);
    return { success: false, message: error.message || "An unexpected error occurred" };
  }
};
