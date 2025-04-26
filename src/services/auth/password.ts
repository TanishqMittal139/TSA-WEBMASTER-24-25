
import { supabase } from '@/integrations/supabase/client';
import { AuthResult } from './types';

export const resetPassword = async (email: string): Promise<AuthResult> => {
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

export const changePassword = async (newPassword: string): Promise<AuthResult> => {
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
