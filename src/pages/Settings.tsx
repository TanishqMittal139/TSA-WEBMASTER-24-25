
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/ui/navbar';
import Footer from '../components/ui/footer';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { Bell, Shield, Mail, Palette, Moon, Sun, LogOut } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const Settings: React.FC = () => {
  const { user, profile, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const [loading, setLoading] = useState(false);
  
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
  
  // Handle profile update
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setLoading(true);
    
    try {
      await updateProfile({
        id: user.id,
        name: profileData.name,
        phone: profileData.phone,
      });
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update Failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
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
  
  const getInitials = () => {
    if (profile?.name) {
      return profile.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar with profile summary */}
          <aside className="w-full md:w-64 shrink-0">
            <Card>
              <CardHeader className="text-center pb-2">
                <Avatar className="h-20 w-20 mx-auto">
                  <AvatarImage src={profile?.avatar} alt={profile?.name || 'User'} />
                  <AvatarFallback className="text-xl">{getInitials()}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-2">{profile?.name || 'User'}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {user.email}
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4">
                <TabsList className="grid grid-cols-1 h-auto gap-2">
                  <TabsTrigger
                    value="account"
                    className="justify-start text-left"
                    onClick={() => setActiveTab('account')}
                    data-state={activeTab === 'account' ? 'active' : ''}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Account
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="justify-start text-left"
                    onClick={() => setActiveTab('notifications')}
                    data-state={activeTab === 'notifications' ? 'active' : ''}
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="privacy"
                    className="justify-start text-left"
                    onClick={() => setActiveTab('privacy')}
                    data-state={activeTab === 'privacy' ? 'active' : ''}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Privacy
                  </TabsTrigger>
                  <TabsTrigger
                    value="appearance"
                    className="justify-start text-left"
                    onClick={() => setActiveTab('appearance')}
                    data-state={activeTab === 'appearance' ? 'active' : ''}
                  >
                    <Palette className="h-4 w-4 mr-2" />
                    Appearance
                  </TabsTrigger>
                </TabsList>
                
                <Separator className="my-4" />
                
                <Button
                  variant="outline"
                  className="w-full justify-start text-destructive hover:text-destructive"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </Button>
              </CardContent>
            </Card>
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
                    <form onSubmit={handleProfileUpdate}>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            value={profileData.name} 
                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            value={profileData.email} 
                            disabled 
                          />
                          <p className="text-sm text-muted-foreground mt-1">
                            Email cannot be changed. Contact support for assistance.
                          </p>
                        </div>
                        
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            value={profileData.phone} 
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          />
                        </div>
                        
                        <Button type="submit" disabled={loading}>
                          {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </div>
                    </form>
                  )}
                  
                  {activeTab === 'notifications' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium">Email Notifications</h3>
                        <p className="text-sm text-muted-foreground">
                          Choose what updates you want to receive in your inbox.
                        </p>
                        
                        <div className="mt-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="marketing-emails">Marketing emails</Label>
                              <p className="text-sm text-muted-foreground">
                                Updates about new features and promotions
                              </p>
                            </div>
                            <Switch
                              id="marketing-emails"
                              checked={settings.notifications.marketing}
                              onCheckedChange={(checked) => 
                                handleSettingChange('notifications', 'marketing', checked)
                              }
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="deal-notifications">Deal notifications</Label>
                              <p className="text-sm text-muted-foreground">
                                Notifications about new deals and special offers
                              </p>
                            </div>
                            <Switch
                              id="deal-notifications"
                              checked={settings.notifications.deals}
                              onCheckedChange={(checked) => 
                                handleSettingChange('notifications', 'deals', checked)
                              }
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="order-notifications">Order updates</Label>
                              <p className="text-sm text-muted-foreground">
                                Notifications about your orders and reservations
                              </p>
                            </div>
                            <Switch
                              id="order-notifications"
                              checked={settings.notifications.orders}
                              onCheckedChange={(checked) => 
                                handleSettingChange('notifications', 'orders', checked)
                              }
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="emails-from-us">Email contact</Label>
                              <p className="text-sm text-muted-foreground">
                                Receive all emails from us (uncheck to opt out of all emails)
                              </p>
                            </div>
                            <Switch
                              id="emails-from-us"
                              checked={settings.notifications.email}
                              onCheckedChange={(checked) => 
                                handleSettingChange('notifications', 'email', checked)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'privacy' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium">Privacy Settings</h3>
                        <p className="text-sm text-muted-foreground">
                          Control how your information is used and shared.
                        </p>
                        
                        <div className="mt-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="share-activity">Share activity</Label>
                              <p className="text-sm text-muted-foreground">
                                Allow us to share your activity with our partners
                              </p>
                            </div>
                            <Switch
                              id="share-activity"
                              checked={settings.privacy.shareActivity}
                              onCheckedChange={(checked) => 
                                handleSettingChange('privacy', 'shareActivity', checked)
                              }
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="data-collection">Data collection</Label>
                              <p className="text-sm text-muted-foreground">
                                Allow us to collect data to improve your experience
                              </p>
                            </div>
                            <Switch
                              id="data-collection"
                              checked={settings.privacy.allowDataCollection}
                              onCheckedChange={(checked) => 
                                handleSettingChange('privacy', 'allowDataCollection', checked)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium">Data Management</h3>
                        <p className="text-sm text-muted-foreground">
                          Options for managing your personal data.
                        </p>
                        
                        <div className="mt-4 flex flex-wrap gap-4">
                          <Button variant="outline">
                            Download my data
                          </Button>
                          <Button variant="outline" className="text-destructive hover:text-destructive">
                            Delete my account
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'appearance' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium">Theme</h3>
                        <p className="text-sm text-muted-foreground">
                          Choose your preferred theme.
                        </p>
                        
                        <RadioGroup
                          className="mt-4 grid grid-cols-3 gap-4"
                          value={settings.appearance.theme}
                          onValueChange={(value) => 
                            handleSettingChange('appearance', 'theme', value)
                          }
                        >
                          <div>
                            <RadioGroupItem 
                              value="light" 
                              id="light" 
                              className="sr-only" 
                            />
                            <Label
                              htmlFor="light"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <Sun className="mb-3 h-6 w-6" />
                              Light
                            </Label>
                          </div>
                          
                          <div>
                            <RadioGroupItem 
                              value="dark" 
                              id="dark" 
                              className="sr-only" 
                            />
                            <Label
                              htmlFor="dark"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <Moon className="mb-3 h-6 w-6" />
                              Dark
                            </Label>
                          </div>
                          
                          <div>
                            <RadioGroupItem 
                              value="system" 
                              id="system" 
                              className="sr-only" 
                            />
                            <Label
                              htmlFor="system"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <div className="mb-3 h-6 w-6 flex">
                                <Sun className="h-[12px] w-[12px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[12px] w-[12px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                              </div>
                              System
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium">Text Size</h3>
                        <p className="text-sm text-muted-foreground">
                          Choose your preferred text size.
                        </p>
                        
                        <RadioGroup
                          className="mt-4 space-y-3"
                          value={settings.appearance.fontSize}
                          onValueChange={(value) => 
                            handleSettingChange('appearance', 'fontSize', value)
                          }
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="small" id="small" />
                            <Label htmlFor="small" className="text-sm">Small</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="medium" id="medium" />
                            <Label htmlFor="medium" className="text-base">Medium</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="large" id="large" />
                            <Label htmlFor="large" className="text-lg">Large</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
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
