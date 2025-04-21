
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from '@/components/ui/use-toast';

type SettingsType = {
  notifications: {
    email: boolean;
    marketing: boolean;
    deals: boolean;
    orders: boolean;
  };
  privacy: {
    shareActivity: boolean;
    allowDataCollection: boolean;
  };
  appearance: {
    theme: string;
    fontSize: string;
  };
};

interface SettingsContextType {
  settings: SettingsType;
  handleSettingChange: (category: string, setting: string, value: any) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SettingsType>({
    notifications: {
      email: true,
      marketing: false,
      deals: true,
      orders: true,
    },
    privacy: {
      shareActivity: false,
      allowDataCollection: true,
    },
    appearance: {
      theme: 'system',
      fontSize: 'medium',
    }
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('user_settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Failed to parse settings', error);
      }
    }
  }, []);

  const handleSettingChange = (category: string, setting: string, value: any) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category as keyof typeof settings],
        [setting]: value
      }
    };
    
    setSettings(newSettings);
    localStorage.setItem('user_settings', JSON.stringify(newSettings));
    
    toast({
      title: "Setting Updated",
      description: "Your preferences have been saved.",
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, handleSettingChange }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
