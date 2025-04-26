
import { supabase } from '@/integrations/supabase/client';
import { AuthResult } from './types';

export const signUp = async (name: string, email: string, password: string): Promise<AuthResult> => {
  try {
    console.log('Attempting to sign up user:', email);
    
    // First, check if user already exists
    const { data: existingUsers, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .limit(1);

    if (checkError) {
      console.error('Error checking for existing user:', checkError);
    } else if (existingUsers && existingUsers.length > 0) {
      return { 
        success: false, 
        message: 'An account with this email already exists. Please sign in instead.' 
      };
    }

    // Create the user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { 
          name 
        },
        emailRedirectTo: window.location.origin,
      }
    });

    if (error) {
      console.error('Sign-up error:', error);
      return { success: false, message: error.message };
    }

    // If we successfully created the user
    if (data && data.user) {
      console.log('User created successfully, id:', data.user.id);
      
      // Create a profile for the user - do this before returning the result
      const profileData = {
        id: data.user.id,
        email,
        name
      };

      console.log('Creating profile with data:', JSON.stringify(profileData));

      try {
        // Use insert first, then fall back to upsert if needed
        const { error: profileError } = await supabase
          .from('profiles')
          .insert(profileData);

        if (profileError) {
          console.error('Error inserting profile:', profileError);
          
          // Try upsert as a fallback
          const { error: upsertError } = await supabase
            .from('profiles')
            .upsert(profileData);
            
          if (upsertError) {
            console.error('Error upserting profile:', upsertError);
            // Continue anyway since the auth user was created
          } else {
            console.log('Profile upserted successfully for user:', data.user.id);
          }
        } else {
          console.log('Profile inserted successfully for user:', data.user.id);
        }
        
        // Verify the profile was created
        const { data: checkProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
        
        console.log('Profile verification:', checkProfile ? 'Profile exists' : 'Profile not found');
      } catch (profileCreateError) {
        console.error('Unexpected error creating profile:', profileCreateError);
      }

      return { 
        success: true, 
        message: 'Account created successfully', 
        user: data.user 
      };
    }

    return { success: false, message: 'Unexpected sign-up result' };
  } catch (error: any) {
    console.error('Unexpected sign-up error:', error);
    return { 
      success: false, 
      message: error.message || 'An unexpected error occurred during sign-up' 
    };
  }
};
