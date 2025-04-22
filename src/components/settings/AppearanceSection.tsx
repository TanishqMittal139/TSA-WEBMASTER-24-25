
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useSettings } from '@/context/SettingsContext';

const AppearanceSection = () => {
  const { settings, handleSettingChange } = useSettings();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Theme</h3>
        <p className="text-sm text-muted-foreground">
          Select your preferred theme for the application.
        </p>
        
        <RadioGroup
          className="mt-4 space-y-3"
          value={settings.appearance.theme}
          onValueChange={(value) => 
            handleSettingChange('appearance', 'theme', value)
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="light" id="theme-light" />
            <Label htmlFor="theme-light">Light</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dark" id="theme-dark" />
            <Label htmlFor="theme-dark">Dark</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="system" id="theme-system" />
            <Label htmlFor="theme-system">System</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div>
        <h3 className="text-lg font-medium">Font Size</h3>
        <p className="text-sm text-muted-foreground">
          Adjust the font size for better readability.
        </p>
        
        <RadioGroup
          className="mt-4 space-y-3"
          value={settings.appearance.fontSize}
          onValueChange={(value) => 
            handleSettingChange('appearance', 'fontSize', value)
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="small" id="font-small" />
            <Label htmlFor="font-small">Small</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="font-medium" />
            <Label htmlFor="font-medium">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="large" id="font-large" />
            <Label htmlFor="font-large">Large</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default AppearanceSection;
