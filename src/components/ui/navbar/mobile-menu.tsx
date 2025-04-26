
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavLink } from './nav-link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
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
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="h-[96vh] rounded-t-xl">
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-accent rounded-full transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          
          {user && (
            <div className="px-6 mb-6 pb-6 border-b border-border">
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
          
          <nav className="flex-1 px-2">
            <div className="space-y-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  isActive={location.pathname === link.path}
                  icon={<link.icon size={20} />}
                  className="flex items-center w-full p-3 rounded-lg hover:bg-accent"
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </nav>
          
          <div className="p-6 mt-auto border-t border-border">
            {user ? (
              <div className="space-y-3">
                <Link 
                  to="/profile" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors w-full"
                >
                  <User size={20} />
                  <span>Profile</span>
                </Link>
                
                <button 
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-3 p-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors w-full"
                >
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link 
                to="/sign-in" 
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors w-full"
              >
                <User size={20} />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
