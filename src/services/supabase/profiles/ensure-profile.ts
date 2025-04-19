
import { supabase } from "@/integrations/supabase/client";

export const ensureUserProfile = async (userId: string, email: string, name: string) => {
  try {
    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();
    
    // If profile already exists, return
    if (existingProfile) return true;

    console.log("Creating new profile for user:", userId);
    
    // Create new profile
    const { error } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        email: email,
        name: name
      });
      
    if (error) {
      console.error("Error creating user profile:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error ensuring user profile:", error);
    return false;
  }
};
