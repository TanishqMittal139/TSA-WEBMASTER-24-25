
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/context/SettingsContext';

const PrivacySection = () => {
  const { settings, handleSettingChange } = useSettings();

  return (
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
  );
};

export default PrivacySection;
