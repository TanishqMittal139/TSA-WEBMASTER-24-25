
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/ui/navbar';
import Footer from '../components/ui/footer';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';
import ProfileSection from '@/components/settings/ProfileSection';
import NotificationsSection from '@/components/settings/NotificationsSection';
import PrivacySection from '@/components/settings/PrivacySection';
import AppearanceSection from '@/components/settings/AppearanceSection';
import Sidebar from '@/components/settings/Sidebar';

const Settings: React.FC = () => {
  const { user, profile, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  
  // Settings state
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      marketing: false,
      deals: true,
      orders: true,
    },
    privacy: {
      shareActivity: false,
      allowDataCollection: true,
    },
    appearance: {
      theme: 'system',
      fontSize: 'medium',
    }
  });
  
  // Profile state
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  
  useEffect(() => {
    // Update profile data when profile changes
    if (profile) {
      setProfileData({
        name: profile.name || '',
        email: user?.email || '',
        phone: profile.phone || '',
      });
    }
    
    // Get user settings from localStorage
    const savedSettings = localStorage.getItem('user_settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Failed to parse settings', error);
      }
    }
  }, [user, profile]);
  
  // Handle settings update
  const handleSettingChange = (category: string, setting: string, value: any) => {
    const newSettings = { 
      ...settings,
      [category]: {
        ...settings[category as keyof typeof settings],
        [setting]: value
      }
    };
    
    setSettings(newSettings);
    localStorage.setItem('user_settings', JSON.stringify(newSettings));
    
    toast({
      title: "Setting Updated",
      description: "Your preferences have been saved.",
    });
  };
  
  // Handle sign out
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
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <Sidebar
              user={user}
              profile={profile}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onSignOut={handleSignOut}
            />
          </aside>
          
          {/* Main content area */}
          <div className="flex-1">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>{
                  activeTab === 'account' ? 'Account Settings' :
                  activeTab === 'notifications' ? 'Notification Preferences' :
                  activeTab === 'privacy' ? 'Privacy Settings' : 'Appearance'
                }</CardTitle>
                <CardDescription>{
                  activeTab === 'account' ? 'Manage your account information and password' :
                  activeTab === 'notifications' ? 'Control how we contact you' :
                  activeTab === 'privacy' ? 'Manage how your information is used' : 'Customize your visual experience'
                }</CardDescription>
              </CardHeader>
              <Separator />
              
              <ScrollArea className="h-[calc(100vh-400px)] md:h-auto">
                <CardContent className="p-6">
                  {activeTab === 'account' && (
                    <ProfileSection
                      initialData={profileData}
                      onUpdateProfile={updateProfile}
                    />
                  )}
                  
                  {activeTab === 'notifications' && (
                    <NotificationsSection
                      settings={settings}
                      onSettingChange={handleSettingChange}
                    />
                  )}
                  
                  {activeTab === 'privacy' && (
                    <PrivacySection
                      settings={settings}
                      onSettingChange={handleSettingChange}
                    />
                  )}
                  
                  {activeTab === 'appearance' && (
                    <AppearanceSection
                      settings={settings}
                      onSettingChange={handleSettingChange}
                    />
                  )}
                </CardContent>
              </ScrollArea>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
