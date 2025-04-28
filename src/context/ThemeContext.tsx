import React, { createContext, useState, useContext, useEffect } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check if user has a preference stored in localStorage
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('tastyHubTheme') as Theme;
    // If no saved theme, default to dark mode
    return savedTheme || 'dark';
  });
  
  useEffect(() => {
    // Update localStorage when theme changes
    localStorage.setItem('tastyHubTheme', theme);
    
    // Update document root class for Tailwind dark mode
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.style.background = 'linear-gradient(225deg, #0f172a 0%, #1e293b 100%)';
      document.documentElement.style.setProperty('--primary-color', '#22c55e');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.background = 'linear-gradient(225deg, #f8fafc 0%, #e0f2fe 100%)';
      document.documentElement.style.setProperty('--primary-color', '#16a34a');
    }
    
    // Apply a subtle pattern and animation to the body
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';
    
    // Create animated background elements
    const createBackgroundElements = () => {
      // Clean up any existing elements
      const existingElements = document.querySelectorAll('.background-element');
      existingElements.forEach(el => el.remove());
      
      const container = document.createElement('div');
      container.className = 'fixed inset-0 overflow-hidden pointer-events-none z-[-1]';
      
      // Create floating elements
      for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        const size = Math.random() * 100 + 50;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 30 + 20;
        const delay = Math.random() * 5;
        
        element.className = 'background-element absolute rounded-full blur-3xl opacity-10';
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.left = `${posX}%`;
        element.style.top = `${posY}%`;
        element.style.backgroundColor = theme === 'dark' ? '#22c55e' : '#16a34a';
        element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
        
        container.appendChild(element);
      }
      
      document.body.appendChild(container);
      
      // Add global keyframes for floating animation if it doesn't exist
      if (!document.querySelector('#background-keyframes')) {
        const style = document.createElement('style');
        style.id = 'background-keyframes';
        style.textContent = `
          @keyframes float {
            0% { transform: translate(0, 0) scale(1); }
            100% { transform: translate(30px, -30px) scale(1.1); }
          }
        `;
        document.head.appendChild(style);
      }
    };
    
    createBackgroundElements();
    
    // Clean up function
    return () => {
      const existingElements = document.querySelectorAll('.background-element');
      existingElements.forEach(el => el.remove());
    };
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
