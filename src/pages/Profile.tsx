import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { updateUserProfile, changePassword } from '@/services/supabase-auth';
import { 
  User, Mail, Phone, MapPin, Calendar, Edit2, Save, Key, LogOut,
  ShoppingBag, Settings, AlertCircle, Camera, Bell, ShieldCheck, Hash,
  CreditCard, Trash2
} from 'lucide-react';

const avatarOptions = [
  { id: 'avatar1', src: 'https://api.dicebear.com/7.x/bottts/svg?seed=tasty1', alt: 'Robot Avatar 1' },
  { id: 'avatar2', src: 'https://api.dicebear.com/7.x/bottts/svg?seed=tasty2', alt: 'Robot Avatar 2' },
  { id: 'avatar3', src: 'https://api.dicebear.com/7.x/bottts/svg?seed=tasty3', alt: 'Robot Avatar 3' },
  { id: 'avatar4', src: 'https://api.dicebear.com/7.x/bottts/svg?seed=tasty4', alt: 'Robot Avatar 4' },
  { id: 'avatar5', src: 'https://api.dicebear.com/7.x/bottts/svg?seed=tasty5', alt: 'Robot Avatar 5' },
  { id: 'avatar6', src: 'https://api.dicebear.com/7.x/bottts/svg?seed=food1', alt: 'Food Avatar 1' },
  { id: 'avatar7', src: 'https://api.dicebear.com/7.x/bottts/svg?seed=food2', alt: 'Food Avatar 2' },
  { id: 'avatar8', src: 'https://api.dicebear.com/7.x/bottts/svg?seed=food3', alt: 'Food Avatar 3' },
];

const defaultPreferences = {
  notifications: {
    email: true,
    promotions: true,
    updates: false,
    orderStatus: true
  },
  privacy: {
    shareHistory: false,
    savePaymentInfo: true,
    locationTracking: false
  },
  appearance: {
    compactMode: false,
    highContrast: false
  }
};

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(profile?.avatar || avatarOptions[0].src);
  const [preferences, setPreferences] = useState(defaultPreferences);
  
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
    bio: profile?.bio || '',
    birthdate: profile?.birthdate || '',
    avatar: profile?.avatar || avatarOptions[0].src
  });
  
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        address: profile.address || '',
        bio: profile.bio || '',
        birthdate: profile.birthdate || '',
        avatar: profile.avatar || avatarOptions[0].src
      });
      setSelectedAvatar(profile.avatar || avatarOptions[0].src);
    }
  }, [profile]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAvatarSelect = (avatarSrc: string) => {
    setSelectedAvatar(avatarSrc);
    setFormData(prev => ({ ...prev, avatar: avatarSrc }));
    setShowAvatarSelector(false);
  };
  
  const handlePreferenceChange = (category: string, setting: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };
  
  const handleSaveProfile = async () => {
    setIsSaving(true);
    
    try {
      if (formData.phone && !/^\+?[0-9\s\-()]+$/.test(formData.phone)) {
        toast({
          title: "Invalid Phone Format",
          description: "Please enter a valid phone number.",
          variant: "destructive"
        });
        setIsSaving(false);
        return;
      }
      
      const result = await updateUserProfile({
        ...formData,
        avatar: selectedAvatar,
      });
      
      if (result.success) {
        await refreshProfile();
        toast({
          title: "Profile Updated",
          description: "Your profile information has been updated successfully.",
          duration: 3000,
        });
        setIsEditing(false);
      } else {
        toast({
          title: "Update Failed",
          description: result.message || "Failed to update profile. Please try again.",
          variant: "destructive",
          duration: 4000,
        });
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleSavePreferences = () => {
    toast({
      title: "Preferences Saved",
      description: "Your preferences have been updated successfully.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-full md:w-1/3 sticky top-24 mb-6 md:mb-0">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <Avatar className="h-24 w-24 mb-4 border-2 border-primary/20">
                          <AvatarImage 
                            src={selectedAvatar} 
                            alt={profile?.name || 'User'} 
                          />
                          <AvatarFallback className="text-xl">
                            {profile?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="absolute bottom-3 right-0 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                          onClick={() => setShowAvatarSelector(!showAvatarSelector)}
                        >
                          <Camera size={14} />
                        </Button>
                      </div>
                      
                      {showAvatarSelector && (
                        <div className="mt-2 mb-4 p-3 bg-card border border-border rounded-lg w-full">
                          <h4 className="text-sm font-medium mb-2">Select an Avatar</h4>
                          <div className="grid grid-cols-4 gap-2">
                            {avatarOptions.map((avatar) => (
                              <div 
                                key={avatar.id}
                                className={`cursor-pointer p-1 rounded-md ${selectedAvatar === avatar.src ? 'bg-primary/20 ring-2 ring-primary' : 'hover:bg-secondary'}`}
                                onClick={() => handleAvatarSelect(avatar.src)}
                              >
                                <img 
                                  src={avatar.src} 
                                  alt={avatar.alt}
                                  className="w-10 h-10 rounded-md"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <h2 className="text-xl font-semibold">{profile?.name || 'User'}</h2>
                      <p className="text-sm text-muted-foreground mb-4">{profile?.email || user?.email}</p>
                      
                      <Button 
                        variant="outline" 
                        className="w-full mb-4"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        {isEditing ? (
                          <>
                            <X className="mr-2 h-4 w-4" /> Cancel Editing
                          </>
                        ) : (
                          <>
                            <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{profile?.email || user?.email}</span>
                      </div>
                      
                      {profile?.phone && (
                        <div className="flex items-center text-sm">
                          <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{profile.phone}</span>
                        </div>
                      )}
                      
                      {profile?.address && (
                        <div className="flex items-center text-sm">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{profile.address}</span>
                        </div>
                      )}
                      
                      {profile?.birthdate && (
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{profile.birthdate}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="w-full md:w-2/3">
                <Tabs defaultValue="profile">
                  <TabsList className="mb-6">
                    <TabsTrigger value="profile" className="flex items-center gap-2">
                      <User size={16} />
                      <span>Profile</span>
                    </TabsTrigger>
                    <TabsTrigger value="orders" className="flex items-center gap-2">
                      <ShoppingBag size={16} />
                      <span>Orders</span>
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="flex items-center gap-2">
                      <Settings size={16} />
                      <span>Settings</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="profile" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>
                          {isEditing 
                            ? "Update your profile information below" 
                            : "View and manage your account details"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              {isEditing ? (
                                <Input 
                                  id="name"
                                  name="name"
                                  placeholder="Your full name" 
                                  value={formData.name}
                                  onChange={handleInputChange}
                                />
                              ) : (
                                <div className="p-2 border border-input rounded-md bg-background">
                                  {formData.name || 'Not provided'}
                                </div>
                              )}
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              {isEditing ? (
                                <Input 
                                  id="email"
                                  name="email"
                                  type="email"
                                  placeholder="Your email address" 
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  readOnly
                                  disabled
                                />
                              ) : (
                                <div className="p-2 border border-input rounded-md bg-background">
                                  {formData.email || 'Not provided'}
                                </div>
                              )}
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              {isEditing ? (
                                <Input 
                                  id="phone"
                                  name="phone"
                                  placeholder="Your phone number" 
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                />
                              ) : (
                                <div className="p-2 border border-input rounded-md bg-background">
                                  {formData.phone || 'Not provided'}
                                </div>
                              )}
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="birthdate">Birth Date</Label>
                              {isEditing ? (
                                <Input 
                                  id="birthdate"
                                  name="birthdate"
                                  type="date"
                                  placeholder="Your birth date" 
                                  value={formData.birthdate}
                                  onChange={handleInputChange}
                                />
                              ) : (
                                <div className="p-2 border border-input rounded-md bg-background">
                                  {formData.birthdate || 'Not provided'}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            {isEditing ? (
                              <Input 
                                id="address"
                                name="address"
                                placeholder="Your address" 
                                value={formData.address}
                                onChange={handleInputChange}
                              />
                            ) : (
                              <div className="p-2 border border-input rounded-md bg-background">
                                {formData.address || 'Not provided'}
                              </div>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            {isEditing ? (
                              <Textarea 
                                id="bio"
                                name="bio"
                                placeholder="Tell us about yourself" 
                                value={formData.bio}
                                onChange={handleInputChange}
                                className="min-h-[100px]"
                              />
                            ) : (
                              <div className="p-2 border border-input rounded-md bg-background min-h-[100px]">
                                {formData.bio || 'No bio provided'}
                              </div>
                            )}
                          </div>
                          
                          {isEditing && (
                            <div className="flex justify-end">
                              <Button
                                onClick={handleSaveProfile}
                                disabled={isSaving}
                              >
                                {isSaving ? (
                                  <>
                                    <div className="h-4 w-4 mr-2 rounded-full border-2 border-current border-t-transparent animate-spin"></div>
                                    Saving...
                                  </>
                                ) : (
                                  <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Changes
                                  </>
                                )}
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="orders">
                    <Card>
                      <CardHeader>
                        <CardTitle>Order History</CardTitle>
                        <CardDescription>
                          View your past orders and their status
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-center p-8 text-center">
                          <div>
                            <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                            <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                            <p className="text-muted-foreground mb-4">
                              Once you place an order, it will appear here
                            </p>
                            <Button onClick={() => navigate('/menu')}>
                              Browse Menu
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="settings" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Bell className="mr-2 h-5 w-5" />
                          Notification Preferences
                        </CardTitle>
                        <CardDescription>
                          Control how we communicate with you
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                          </div>
                          <Switch
                            checked={preferences.notifications.email}
                            onCheckedChange={(checked) => handlePreferenceChange('notifications', 'email', checked)}
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Promotional Emails</p>
                            <p className="text-sm text-muted-foreground">Get notified about deals and offers</p>
                          </div>
                          <Switch 
                            checked={preferences.notifications.promotions}
                            onCheckedChange={(checked) => handlePreferenceChange('notifications', 'promotions', checked)}
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Order Status Updates</p>
                            <p className="text-sm text-muted-foreground">Receive notifications about your orders</p>
                          </div>
                          <Switch 
                            checked={preferences.notifications.orderStatus}
                            onCheckedChange={(checked) => handlePreferenceChange('notifications', 'orderStatus', checked)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <ShieldCheck className="mr-2 h-5 w-5" />
                          Privacy Settings
                        </CardTitle>
                        <CardDescription>
                          Control your data and privacy preferences
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Share Order History</p>
                            <p className="text-sm text-muted-foreground">Allow us to use your orders to improve recommendations</p>
                          </div>
                          <Switch 
                            checked={preferences.privacy.shareHistory}
                            onCheckedChange={(checked) => handlePreferenceChange('privacy', 'shareHistory', checked)}
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Save Payment Information</p>
                            <p className="text-sm text-muted-foreground">Securely store your payment details for future orders</p>
                          </div>
                          <Switch 
                            checked={preferences.privacy.savePaymentInfo}
                            onCheckedChange={(checked) => handlePreferenceChange('privacy', 'savePaymentInfo', checked)}
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Location Tracking</p>
                            <p className="text-sm text-muted-foreground">Allow location tracking for better service</p>
                          </div>
                          <Switch 
                            checked={preferences.privacy.locationTracking}
                            onCheckedChange={(checked) => handlePreferenceChange('privacy', 'locationTracking', checked)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Key className="mr-2 h-5 w-5" />
                          Security
                        </CardTitle>
                        <CardDescription>
                          Manage your account security and password
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Button
                          variant="outline"
                          onClick={() => navigate('/reset-password')}
                          className="w-full sm:w-auto"
                        >
                          <Key className="mr-2 h-4 w-4" />
                          Change Password
                        </Button>
                        
                        <Separator className="mt-6 mb-6" />
                        
                        <div>
                          <h3 className="text-lg font-medium flex items-center text-destructive">
                            <AlertCircle className="mr-2 h-5 w-5" />
                            Danger Zone
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1 mb-4">
                            These actions cannot be easily reversed
                          </p>
                          
                          <Button variant="destructive" className="w-full sm:w-auto mt-2">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Account
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="flex justify-end">
                      <Button onClick={handleSavePreferences}>Save Preferences</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
