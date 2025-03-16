
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
import { toast } from '@/components/ui/use-toast';
import { isAuthenticated, getCurrentUser, updateUserProfile } from '@/services/auth';
import { 
  User, Mail, Phone, MapPin, Calendar, Edit2, Save, Key, LogOut,
  ShoppingBag, Settings, AlertCircle, Camera
} from 'lucide-react';

// List of avatar options for profile customization
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

// Mock function for updating profile (replace with actual implementation)
const saveProfile = async (profileData: any) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    const result = await updateUserProfile(profileData);
    return result;
  } catch (error) {
    console.error('Error updating profile:', error);
    return { success: false, message: 'An error occurred while updating your profile.' };
  }
};

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || avatarOptions[0].src);
  
  // Profile form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    bio: user?.bio || '',
    birthdate: user?.birthdate || '',
    avatar: user?.avatar || avatarOptions[0].src
  });
  
  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/sign-in', { replace: true });
    }
  }, [navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAvatarSelect = (avatarSrc: string) => {
    setSelectedAvatar(avatarSrc);
    setFormData(prev => ({ ...prev, avatar: avatarSrc }));
    setShowAvatarSelector(false);
  };
  
  const handleSaveProfile = async () => {
    setIsSaving(true);
    
    try {
      const result = await saveProfile({...formData, avatar: selectedAvatar});
      
      if (result.success) {
        toast({
          title: "Profile Updated",
          description: "Your profile information has been updated successfully.",
          duration: 3000,
        });
        setIsEditing(false);
        // Update local user data
        setUser({...user, ...formData, avatar: selectedAvatar});
      } else {
        toast({
          title: "Update Failed",
          description: result.message || "Failed to update profile. Please try again.",
          variant: "destructive",
          duration: 4000,
        });
      }
    } catch (error) {
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Left sidebar with avatar and basics */}
              <div className="w-full md:w-1/3 sticky top-24">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <Avatar className="h-24 w-24 mb-4">
                          <AvatarImage 
                            src={selectedAvatar} 
                            alt={user?.name || 'User'} 
                          />
                          <AvatarFallback className="text-xl">
                            {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
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
                        <div className="mt-2 mb-4 p-3 bg-card border border-border rounded-lg">
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
                      
                      <h2 className="text-xl font-semibold">{user?.name}</h2>
                      <p className="text-sm text-muted-foreground mb-4">{user?.email}</p>
                      
                      <Button 
                        variant="outline" 
                        className="w-full mb-4"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        {isEditing ? (
                          <>
                            <Edit2 className="mr-2 h-4 w-4" /> Cancel Editing
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
                        <span>{user?.email}</span>
                      </div>
                      
                      {user?.phone && (
                        <div className="flex items-center text-sm">
                          <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{user.phone}</span>
                        </div>
                      )}
                      
                      {user?.address && (
                        <div className="flex items-center text-sm">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{user.address}</span>
                        </div>
                      )}
                      
                      {user?.birthdate && (
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{user.birthdate}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Main content */}
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
                                  <>Saving Changes...</>
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
                  
                  <TabsContent value="settings">
                    <Card>
                      <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                        <CardDescription>
                          Manage your account preferences and security
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium flex items-center">
                            <Key className="mr-2 h-5 w-5" />
                            Password & Security
                          </h3>
                          <Button variant="outline" className="w-full sm:w-auto">
                            Change Password
                          </Button>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium flex items-center">
                            <AlertCircle className="mr-2 h-5 w-5" />
                            Danger Zone
                          </h3>
                          <Button variant="destructive" className="w-full sm:w-auto">
                            <LogOut className="mr-2 h-4 w-4" />
                            Delete Account
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
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
