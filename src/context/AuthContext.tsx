import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { getUserProfile, updateUserProfile } from '@/services/auth/profile';
import { UserProfile } from '@/services/auth/types';
import { ensureProfileExists } from '@/services/supabase-profiles';
import { toast } from '@/components/ui/use-toast';
import { signOut } from '@/services/auth/signout';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{success: boolean; message: string; user?: UserProfile}>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  isLoading: true,
  refreshProfile: async () => {},
  signOut: async () => {},
  updateProfile: async () => ({ success: false, message: 'Not implemented' }),
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log("Fetching user profile for:", userId);
      await ensureProfileExists();
      
      const userProfile = await getUserProfile();
      if (userProfile) {
        console.log("User profile loaded:", userProfile.id);
        setProfile(userProfile);
      } else {
        console.error("No user profile found after ensuring it exists");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    console.log("Setting up auth state change listener");
    
    // First set up the auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.id);
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          // Use setTimeout to avoid state update deadlock
          setTimeout(() => {
            fetchUserProfile(currentSession.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // Then check for an existing session
    const initializeAuth = async () => {
      try {
        console.log("Initializing auth...");
        const { data } = await supabase.auth.getSession();
        const currentSession = data.session;
        
        console.log("Initial session check:", currentSession?.user?.id);
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          await fetchUserProfile(currentSession.user.id);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const refreshProfile = async () => {
    if (user) {
      console.log("Refreshing user profile for:", user.id);
      await ensureProfileExists();
      const userProfile = await getUserProfile();
      if (userProfile) {
        setProfile(userProfile);
        return userProfile;
      }
    }
    return null;
  };

  const handleUpdateProfile = async (profileData: Partial<UserProfile>): Promise<{success: boolean; message: string; user?: UserProfile}> => {
    try {
      const result = await updateUserProfile(profileData);
      if (result.success && result.user) {
        setProfile(result.user);
        
        // If email was changed, refresh the profile
        if (profileData.email && profileData.email !== profile?.email) {
          await refreshProfile();
        }
      }
      return result;
    } catch (error) {
      console.error("Error in updateProfile:", error);
      return { success: false, message: 'An unexpected error occurred' };
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setProfile(null);
      setSession(null);
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Sign out failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  const value = {
    session,
    user,
    profile,
    isLoading,
    refreshProfile,
    signOut: handleSignOut,
    updateProfile: handleUpdateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
