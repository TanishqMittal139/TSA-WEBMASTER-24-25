import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavLink } from './nav-link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { Profile } from '@/types/profile';
import { NAV_LINKS } from '@/constants/nav-links';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user: SupabaseUser | null;
  profile: Profile | null;
  handleSignOut: () => Promise<void>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  setIsOpen,
  user,
  profile,
  handleSignOut,
}) => {
  const location = useLocation();
  
  const getInitials = () => {
    if (profile?.name) {
      return profile.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/95 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div
        className={cn(
          "fixed inset-y-0 right-0 w-full max-w-xs bg-background z-50 transform transition-transform duration-300 ease-in-out shadow-lg md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full overflow-y-auto pb-20">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 focus:outline-none text-foreground hover:text-primary"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          
          {user && (
            <div className="p-4 mb-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={profile?.avatar} alt={profile?.name || 'User'} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{profile?.name || user.email?.split('@')[0]}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </div>
          )}
          
          <nav className="flex-1 px-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                isActive={location.pathname === link.path}
                icon={<link.icon size={18} />}
                className="flex items-center space-x-3 py-4 text-lg border-b border-border"
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          
          <div className="px-4 mt-auto mb-8">
            {user ? (
              <>
                <Link 
                  to="/profile" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 py-4 text-lg border-b border-border hover:text-primary transition-colors"
                >
                  <User size={18} />
                  <span>Profile</span>
                </Link>
                
                <button 
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 py-4 text-lg text-destructive hover:text-destructive/80 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <Link 
                to="/sign-in" 
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 py-4 text-lg hover:text-primary transition-colors"
              >
                <User size={18} />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
