
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

interface ProfileSectionProps {
  initialData: {
    name: string;
    email: string;
    phone: string;
  };
  onUpdateProfile: (data: { name: string; phone: string; }) => Promise<void>;
}

const ProfileSection = ({ initialData, onUpdateProfile }: ProfileSectionProps) => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(initialData);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onUpdateProfile({
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

  return (
    <form onSubmit={handleSubmit}>
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
  );
};

export default ProfileSection;
