
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useSettings } from '@/context/SettingsContext';

const NotificationsSection = () => {
  const { settings, handleSettingChange } = useSettings();

  return (
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
  );
};

export default NotificationsSection;
