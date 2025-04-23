
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/services/supabase-auth";
import { toast } from "@/components/ui/use-toast";

// Create or update user profile
export const createOrUpdateProfile = async (profileData: Partial<UserProfile>): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      console.error("No active session found when creating/updating profile");
      return false;
    }
    
    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', session.user.id)
      .maybeSingle();
    
    if (existingProfile) {
      // Update existing profile
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', session.user.id);
      
      if (error) {
        console.error("Error updating profile:", error);
        return false;
      }
    } else {
      // Create new profile
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: session.user.id,
          ...profileData
        });
      
      if (error) {
        console.error("Error creating profile:", error);
        return false;
      }
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
  const success = await createOrUpdateProfile({
    name: reservationData.name,
    email: reservationData.email,
    phone: reservationData.phone
  });
  
  if (!success) {
    console.warn("Failed to sync profile data from reservation");
  }
};
