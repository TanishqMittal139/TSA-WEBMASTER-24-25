
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { createOrUpdateProfile } from '@/services/supabase-profiles';

interface ProfileSectionProps {
  initialData: {
    name: string;
    email: string;
    phone: string;
  };
  onUpdateProfile: (data: { name: string; phone: string; email: string; }) => Promise<void>;
}

const ProfileSection = ({ initialData, onUpdateProfile }: ProfileSectionProps) => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(initialData);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // First update profile in Supabase directly
      const success = await createOrUpdateProfile({
        name: profileData.name,
        phone: profileData.phone,
        email: profileData.email,
      });
      
      if (success) {
        // Then call the parent component's update function
        await onUpdateProfile({
          name: profileData.name,
          phone: profileData.phone,
          email: profileData.email,
        });
        
        toast({
          title: "Profile Updated",
          description: "Your profile information has been updated successfully.",
        });
      } else {
        throw new Error("Failed to update profile in database");
      }
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-5">
        <div className="glass-card p-5 transition-all duration-300 hover:shadow-lg">
          <Label htmlFor="name" className="text-base font-medium mb-2 block">Full Name</Label>
          <Input 
            id="name" 
            value={profileData.name} 
            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
            className="glass-input transition-all duration-300"
          />
        </div>
        
        <div className="glass-card p-5 transition-all duration-300 hover:shadow-lg">
          <Label htmlFor="email" className="text-base font-medium mb-2 block">Email</Label>
          <Input 
            id="email" 
            value={profileData.email} 
            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
            className="glass-input transition-all duration-300"
          />
        </div>
        
        <div className="glass-card p-5 transition-all duration-300 hover:shadow-lg">
          <Label htmlFor="phone" className="text-base font-medium mb-2 block">Phone Number</Label>
          <Input 
            id="phone" 
            value={profileData.phone} 
            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
            className="glass-input transition-all duration-300"
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full glass-button hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
};

export default ProfileSection;
