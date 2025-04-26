
import { supabase } from '@/integrations/supabase/client';
import { AuthResult } from './types';

export const signOut = async (): Promise<AuthResult> => {
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
