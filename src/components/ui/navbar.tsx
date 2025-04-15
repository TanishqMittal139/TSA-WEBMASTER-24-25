
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import AppLogo from '@/components/ui/app-logo';
import { 
  Menu, X, ShoppingBag, User, Coffee, Navigation, Info, Percent, CalendarRange, Utensils, LogOut,
  Settings, Heart, Lock, History, FileText
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
import { toast } from '@/components/ui/use-toast';
import ThemeToggle from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const isMobile = useIsMobile();
  const { user, profile, signOut } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  const navLinks = [
    { name: 'Home', path: '/', icon: <Coffee size={18} /> },
    { name: 'Menu', path: '/menu', icon: <Utensils size={18} /> },
    { name: 'Deals', path: '/deals', icon: <Percent size={18} /> },
    { name: 'Locations', path: '/find-location', icon: <Navigation size={18} /> },
    { name: 'About', path: '/about', icon: <Info size={18} /> },
    { name: 'References', path: '/references', icon: <FileText size={18} /> },
    { name: 'Reservations', path: '/reservations', icon: <CalendarRange size={18} /> }
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  
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
    <header className={cn(
      "fixed w-full z-50 transition-all duration-300 bg-background/90 backdrop-blur-lg shadow-sm py-2"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 transition-all hover:scale-105"
        >
          <AppLogo />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center space-x-1 text-sm font-medium transition-colors duration-200",
                location.pathname === link.path
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              )}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          
          <Link 
            to="/cart" 
            className="relative p-2 transition-colors text-foreground hover:text-primary"
            aria-label="Shopping Cart"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          
          {user ? (
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
                  onClick={handleSignOut}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              onClick={() => navigate('/sign-in')} 
              variant="outline"
              className="ml-1"
              size="sm"
            >
              Sign In
            </Button>
          )}
        </div>
        
        <div className="flex md:hidden items-center space-x-4">
          <ThemeToggle />
          
          <Link 
            to="/cart" 
            className="relative p-2 transition-colors text-foreground hover:text-primary"
            aria-label="Shopping Cart"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 focus:outline-none text-foreground hover:text-primary"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      <div
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-sm z-40 transform transition-transform duration-300 ease-in-out md:hidden pt-16",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col pt-4 px-6 h-full overflow-y-auto">
          {user && (
            <div className="py-4 mb-4 border-b border-border">
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
          
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center space-x-3 py-4 text-lg border-b border-border",
                location.pathname === link.path
                  ? "text-primary font-medium"
                  : "text-foreground"
              )}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
          
          {user ? (
            <>
              <Link 
                to="/profile" 
                className="flex items-center space-x-3 py-4 text-lg border-b border-border"
              >
                <User size={18} />
                <span>Profile</span>
              </Link>
              
              <Link 
                to="/favorite-locations" 
                className="flex items-center space-x-3 py-4 text-lg border-b border-border"
              >
                <Heart size={18} />
                <span>Favorites</span>
              </Link>
              
              <button 
                onClick={handleSignOut}
                className="mt-6 flex items-center space-x-3 py-4 text-lg text-destructive"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <Link 
              to="/sign-in" 
              className="mt-6 flex items-center space-x-3 py-4 text-lg"
            >
              <User size={18} />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
