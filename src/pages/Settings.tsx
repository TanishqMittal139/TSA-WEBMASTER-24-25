
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/ui/navbar';
import Footer from '../components/ui/footer';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import ProfileSection from '@/components/settings/ProfileSection';
import NotificationsSection from '@/components/settings/NotificationsSection';
import PrivacySection from '@/components/settings/PrivacySection';
import AppearanceSection from '@/components/settings/AppearanceSection';
import SettingsLayout from '@/components/settings/SettingsLayout';
import { SettingsProvider } from '@/context/SettingsContext';

const Settings: React.FC = () => {
  const { user, profile, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  
  useEffect(() => {
    if (profile) {
      setProfileData({
        name: profile.name || '',
        email: user?.email || '',
        phone: profile.phone || '',
      });
    }
  }, [user, profile]);
  
  const handleSignOut = async () => {
    try {
      if (signOut) {
        await signOut();
      }
      navigate('/');
      toast({
        title: "Signed Out",
        description: "You have been signed out successfully.",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Sign Out Failed",
        description: "There was an error signing out. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (!user) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-8 pt-24">
          <div className="text-center">
            <p>Please sign in to access settings.</p>
            <Button onClick={() => navigate('/sign-in')} className="mt-4">
              Sign In
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleUpdateProfile = async (data: { name: string; phone: string }) => {
    try {
      const result = await updateProfile(data);
      if (result && !result.success) {
        throw new Error(result.message || "Failed to update profile");
      }
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8 pt-24">
        <SettingsProvider>
          <SettingsLayout
            user={user}
            profile={profile}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onSignOut={handleSignOut}
          >
            {activeTab === 'account' && (
              <ProfileSection
                initialData={profileData}
                onUpdateProfile={handleUpdateProfile}
              />
            )}
            
            {activeTab === 'notifications' && (
              <NotificationsSection />
            )}
            
            {activeTab === 'privacy' && (
              <PrivacySection />
            )}
            
            {activeTab === 'appearance' && (
              <AppearanceSection />
            )}
          </SettingsLayout>
        </SettingsProvider>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
