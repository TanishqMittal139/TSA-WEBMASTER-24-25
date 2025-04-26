
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/auth';

export type { UserProfile };

export const signUp = async (name: string, email: string, password: string) => {
  try {
    // Disable email confirmation and sign up directly
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name, // Store name in user metadata
        },
        emailRedirectTo: '/', // Optional: set redirect after signup
      }
    });

    if (error) {
      console.error('Sign-up error:', error);
      return { success: false, message: error.message };
    }

    if (data.user) {
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

export const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error) {
        console.error('Sign-in error:', error);
        return { success: false, message: error.message };
      }
  
      return { success: true, message: 'Signed in successfully', user: data.user };
    } catch (error: any) {
      console.error('Unexpected sign-in error:', error);
      return { success: false, message: error.message || 'An unexpected error occurred during sign-in' };
    }
  };

  export const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
  
      if (error) {
        console.error('Sign-out error:', error);
        return { success: false, message: error.message };
      }
  
      return { success: true, message: 'Signed out successfully' };
    } catch (error: any) {
      console.error('Unexpected sign-out error:', error);
      return { success: false, message: error.message || 'An unexpected error occurred during sign-out' };
    }
  };

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

  export const updateUserProfile = async (profileData: Partial<UserProfile>): Promise<{success: boolean; message: string; user?: UserProfile}> => {
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

  // Add missing resetPassword function
  export const resetPassword = async (email: string): Promise<{success: boolean; message: string}> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
  
      if (error) {
        console.error("Password reset error:", error);
        return { success: false, message: error.message };
      }
  
      return { success: true, message: "Password reset email sent successfully" };
    } catch (error: any) {
      console.error("Unexpected error in password reset:", error);
      return { success: false, message: error.message || "An unexpected error occurred" };
    }
  };

  // Add missing changePassword function  
  export const changePassword = async (newPassword: string): Promise<{success: boolean; message: string}> => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
  
      if (error) {
        console.error("Password change error:", error);
        return { success: false, message: error.message };
      }
  
      return { success: true, message: "Password changed successfully" };
    } catch (error: any) {
      console.error("Unexpected error in password change:", error);
      return { success: false, message: error.message || "An unexpected error occurred" };
    }
  };
