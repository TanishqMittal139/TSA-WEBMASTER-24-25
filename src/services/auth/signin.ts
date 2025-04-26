
import { supabase } from '@/integrations/supabase/client';
import { AuthResult } from './types';

export const signIn = async (email: string, password: string): Promise<AuthResult> => {
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
