
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, CalendarRange, Heart, History,
  Settings, Lock, LogOut
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { Profile } from '@/types/profile';

interface UserMenuProps {
  user: SupabaseUser;
  profile: Profile | null;
  onSignOut: () => Promise<void>;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, profile, onSignOut }) => {
  const navigate = useNavigate();
  
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
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-2 outline-none">
        <Avatar className="h-8 w-8 border border-border">
          <AvatarImage src={profile?.avatar} alt={profile?.name || user.email || 'User'} />
          <AvatarFallback className="bg-primary/10 text-primary text-sm">
            {getInitials()}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium hidden sm:block text-foreground">
          {profile?.name || user.email?.split('@')[0] || 'User'}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate('/profile')}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/reservations')}>
            <CalendarRange className="mr-2 h-4 w-4" />
            <span>Reservations</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/favorite-locations')}>
            <Heart className="mr-2 h-4 w-4" />
            <span>Favorites</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/history')}>
            <History className="mr-2 h-4 w-4" />
            <span>Order History</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate('/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/reset-password')}>
            <Lock className="mr-2 h-4 w-4" />
            <span>Change Password</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={onSignOut}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
