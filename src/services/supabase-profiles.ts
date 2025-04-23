
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/services/supabase-auth";
import { toast } from "@/components/ui/use-toast";

// Ensure profile exists for the current user
export const ensureProfileExists = async (): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      console.error("No active session found");
      return false;
    }
    
    // Check if profile exists
    const { data: existingProfile, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', session.user.id)
      .maybeSingle();
    
    if (checkError) {
      console.error("Error checking profile:", checkError);
      return false;
    }
    
    // If profile doesn't exist, create it with basic info
    if (!existingProfile) {
      console.log("Creating new profile for user:", session.user.id);
      const { error: createError } = await supabase
        .from('profiles')
        .insert({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name || ''
        });
      
      if (createError) {
        console.error("Error creating new profile:", createError);
        return false;
      }
      
      console.log("Profile created successfully");
    }
    
    return true;
  } catch (error) {
    console.error("Error in ensureProfileExists:", error);
    return false;
  }
};

// Create or update user profile
export const createOrUpdateProfile = async (profileData: Partial<UserProfile>): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      console.error("No active session found when creating/updating profile");
      return false;
    }
    
    // First ensure profile exists
    const profileExists = await ensureProfileExists();
    if (!profileExists) {
      console.error("Failed to ensure profile exists");
      return false;
    }
    
    // Update existing profile
    const { error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', session.user.id);
    
    if (error) {
      console.error("Error updating profile:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error in createOrUpdateProfile:", error);
    return false;
  }
};

// Attempt to synchronize profile with reservation info
export const syncProfileFromReservation = async (reservationData: {
  name: string;
  email: string;
  phone: string;
}): Promise<void> => {
  try {
    // Make sure profile exists before attempting to sync
    await ensureProfileExists();
    
    const success = await createOrUpdateProfile({
      name: reservationData.name,
      email: reservationData.email,
      phone: reservationData.phone
    });
    
    if (!success) {
      console.warn("Failed to sync profile data from reservation");
    }
  } catch (error) {
    console.error("Error syncing profile from reservation:", error);
  }
};
