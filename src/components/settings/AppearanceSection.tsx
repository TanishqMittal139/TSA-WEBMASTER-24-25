
import React from 'react';
import { Moon, Sun } from 'lucide-react';
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
  );
};

export default AppearanceSection;
