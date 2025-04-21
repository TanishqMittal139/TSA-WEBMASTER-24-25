
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import Sidebar from './Sidebar';

interface SettingsLayoutProps {
  user: any;
  profile: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSignOut: () => void;
  children: React.ReactNode;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({
  user,
  profile,
  activeTab,
  setActiveTab,
  onSignOut,
  children
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-64 shrink-0">
        <Sidebar
          user={user}
          profile={profile}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onSignOut={onSignOut}
        />
      </aside>
      
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
              {children}
            </CardContent>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};

export default SettingsLayout;
