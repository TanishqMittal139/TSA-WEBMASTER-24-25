import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { toast } from "@/components/ui/use-toast";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  bio?: string;
  birthdate?: string;
  avatar?: string;
};

// Initialize user profile after signup or when it doesn't exist
export const initializeProfile = async (user: User): Promise<boolean> => {
  try {
    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single();
    
    // If profile already exists, return success
    if (existingProfile) return true;

    // Create new profile with basic user info
    const { error } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.email?.split('@')[0] || 'User'
      });

    if (error) {
      console.error("Error creating user profile:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error initializing profile:", error);
    return false;
  }
};

// Get current user profile
export const getUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      console.log("No active session found when fetching profile");
      return null;
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
    
    if (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
    
    if (!data) {
      console.log("No profile found, attempting to initialize");
      const created = await initializeProfile(session.user);
      if (created) {
        return getUserProfile();
      }
      return null;
    }
    
    return data as UserProfile;
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
};

// Update user profile
export const updateUserProfile = async (profileData: Partial<UserProfile>): Promise<{ success: boolean; message: string; user?: UserProfile }> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      return { 
        success: false, 
        message: 'User not authenticated'
      };
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', session.user.id)
      .select()
      .single();
    
    if (error) {
      console.error("Error updating user profile:", error);
      return { 
        success: false, 
        message: error.message || 'Failed to update profile'
      };
    }
    
    return {
      success: true,
      message: 'Profile updated successfully',
      user: data as UserProfile
    };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
};

// Save user preferences
export const saveUserPreferences = async (preferences: Record<string, any>): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      return false;
    }
    
    // Store preferences as a JSON string in the "bio" field
    const { error } = await supabase
      .from('profiles')
      .update({
        bio: JSON.stringify(preferences)
      })
      .eq('id', session.user.id);
    
    if (error) {
      console.error("Error saving preferences:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error saving preferences:", error);
    return false;
  }
};

// Sign in function
export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      return { success: false, message: error.message };
    }
    
    // Initialize profile if needed
    await initializeProfile(data.user);
    
    return { success: true, user: data.user };
  } catch (error: any) {
    console.error("Sign in error:", error);
    return { success: false, message: error.message || 'Error signing in' };
  }
};

// Sign up function
export const signUp = async (name: string, email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        }
      }
    });
    
    if (error) {
      return { success: false, message: error.message };
    }
    
    if (data.user) {
      // Initialize profile
      await initializeProfile(data.user);
      
      return {
        success: true,
        user: data.user,
        message: data.session ? 'Signed up successfully.' : 'Please check your email for verification.'
      };
    }
    
    return { success: true, message: 'Please check your email to complete sign-up.' };
  } catch (error: any) {
    console.error("Sign up error:", error);
    return { success: false, message: error.message || 'Error signing up' };
  }
};

// Sign out function
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return { success: false, message: error.message };
    }
    
    return { success: true };
  } catch (error: any) {
    console.error("Sign out error:", error);
    return { success: false, message: error.message || 'Error signing out' };
  }
};

// Check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session?.user;
  } catch (error) {
    console.error("Auth check error:", error);
    return false;
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
};

// Reset password function
export const resetPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/reset-password`
      }
    );
    
    if (error) {
      return { success: false, message: error.message };
    }
    
    return { 
      success: true, 
      message: 'Password reset link sent to your email.'
    };
  } catch (error: any) {
    console.error("Reset password error:", error);
    return { success: false, message: error.message || 'Error resetting password' };
  }
};

// Change password function
export const changePassword = async (newPassword: string) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    
    if (error) {
      return { success: false, message: error.message };
    }
    
    return { 
      success: true, 
      message: 'Password updated successfully'
    };
  } catch (error: any) {
    console.error("Change password error:", error);
    return { success: false, message: error.message || 'Error changing password' };
  }
};
