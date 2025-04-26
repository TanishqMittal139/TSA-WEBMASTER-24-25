
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/types/auth";
import { toast } from "@/components/ui/use-toast";

// Ensure profile exists for the current user
export const ensureProfileExists = async (): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      console.error("No active session found");
      return false;
    }
    
    console.log("Ensuring profile exists for user:", session.user.id);
    
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
      console.log("No existing profile found, creating new profile");
      
      // Get user data from auth session
      const userData = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.user_metadata?.name || ''
      };
      
      console.log("Creating profile with data:", JSON.stringify(userData));
      
      // Try insert first
      const { error: insertError } = await supabase
        .from('profiles')
        .insert(userData);
      
      if (insertError) {
        console.error("Error creating profile with insert:", insertError);
        
        // Try upsert as fallback
        const { error: upsertError } = await supabase
          .from('profiles')
          .upsert(userData);
        
        if (upsertError) {
          console.error("Error creating profile with upsert:", upsertError);
          return false;
        }
        
        console.log("Profile created with upsert");
      } else {
        console.log("Profile created with insert");
      }
      
      // Verify profile was created
      const { data: verifyProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (!verifyProfile) {
        console.error("Profile verification failed - profile not found after creation");
        return false;
      }
      
      console.log("Profile verified and exists");
    } else {
      console.log("Profile already exists for user:", session.user.id);
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
    const { data: { session } } = await supabase.auth.getSession();
    
    // Only sync if user is authenticated
    if (!session?.user) {
      console.log("No user session, skipping profile sync");
      return;
    }
    
    // Make sure profile exists before attempting to sync
    await ensureProfileExists();
    
    const success = await createOrUpdateProfile({
      name: reservationData.name,
      email: reservationData.email,
      phone: reservationData.phone
    });
    
    if (!success) {
      console.warn("Failed to sync profile data from reservation");
    } else {
      console.log("Profile successfully synced from reservation data");
    }
  } catch (error) {
    console.error("Error syncing profile from reservation:", error);
  }
};
