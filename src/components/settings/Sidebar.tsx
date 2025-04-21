
import React from 'react';
import { Shield, Bell, Palette, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface SidebarProps {
  user: any;
  profile: any;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSignOut: () => void;
}

const Sidebar = ({ user, profile, activeTab, onTabChange, onSignOut }: SidebarProps) => {
  const getInitials = () => {
    if (profile?.name) {
      return profile.name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  return (
    <Card>
      <CardHeader className="text-center pb-2">
        <Avatar className="h-20 w-20 mx-auto">
          <AvatarImage src={profile?.avatar} alt={profile?.name || 'User'} />
          <AvatarFallback className="text-xl">{getInitials()}</AvatarFallback>
        </Avatar>
        <CardTitle className="mt-2">{profile?.name || 'User'}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {user?.email}
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">
        <TabsList className="grid grid-cols-1 h-auto gap-2">
          <TabsTrigger
            value="account"
            className="justify-start text-left"
            onClick={() => onTabChange('account')}
            data-state={activeTab === 'account' ? 'active' : ''}
          >
            <Shield className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="justify-start text-left"
            onClick={() => onTabChange('notifications')}
            data-state={activeTab === 'notifications' ? 'active' : ''}
          >
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="privacy"
            className="justify-start text-left"
            onClick={() => onTabChange('privacy')}
            data-state={activeTab === 'privacy' ? 'active' : ''}
          >
            <Shield className="h-4 w-4 mr-2" />
            Privacy
          </TabsTrigger>
          <TabsTrigger
            value="appearance"
            className="justify-start text-left"
            onClick={() => onTabChange('appearance')}
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
          onClick={onSignOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign out
        </Button>
      </CardContent>
    </Card>
  );
};

export default Sidebar;
