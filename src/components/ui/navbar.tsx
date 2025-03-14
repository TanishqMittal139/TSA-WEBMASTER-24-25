
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { getCurrentUser, signOut, isAuthenticated } from '@/services/auth';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Menu, X, ShoppingBag, User, Coffee, Navigation, Info, Percent, CalendarRange, Utensils, Heart, LogOut
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import ThemeToggle from '@/components/ui/theme-toggle';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const isMobile = useIsMobile();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Check for user on mount and after auth changes
  useEffect(() => {
    setUser(getCurrentUser());
  }, [location.pathname]);
  
  const navLinks = [
    { name: 'Home', path: '/', icon: <Coffee size={18} /> },
    { name: 'Menu', path: '/menu', icon: <Utensils size={18} /> },
    { name: 'Deals', path: '/deals', icon: <Percent size={18} /> },
    { name: 'Locations', path: '/find-location', icon: <Navigation size={18} /> },
    { name: 'About', path: '/about', icon: <Info size={18} /> },
    { name: 'Reservations', path: '/reservations', icon: <CalendarRange size={18} /> }
  ];

  const handleSignOut = () => {
    signOut();
    setUser(null);
    toast({
      title: "Signed out",
      description: "You have been successfully signed out",
    });
    navigate('/');
  };
  
  // Always show the navbar with background for consistency
  const showNavbarBackground = true;
  
  return (
    <header className={cn(
      "fixed w-full z-50 transition-all duration-300 bg-background/90 backdrop-blur-lg shadow-sm py-2"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 font-bold text-2xl transition-all hover-scale text-primary"
        >
          <Coffee size={28} strokeWidth={2.5} />
          <span>Tasty Hub</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
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
        
        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle */}
          <ThemeToggle />
          
          <Link 
            to="/favorite-locations" 
            className="p-2 transition-colors text-foreground hover:text-primary"
            aria-label="Favorite Locations"
          >
            <Heart size={20} />
          </Link>
          
          <Link 
            to="/cart" 
            className="relative p-2 transition-colors text-foreground hover:text-primary"
            aria-label="Shopping Cart"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User size={16} className="text-primary" />
                </div>
                <span className="text-sm font-medium hidden sm:block text-foreground">
                  {user.name}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/reservations')}>
                  My Reservations
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/favorite-locations')}>
                  Favorite Locations
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive flex items-center gap-2">
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link 
              to="/sign-in" 
              className="button-outline py-2 text-sm"
            >
              Sign In
            </Link>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          {/* Theme Toggle for Mobile */}
          <ThemeToggle />
          
          <Link 
            to="/cart" 
            className="relative p-2 transition-colors text-foreground hover:text-primary"
            aria-label="Shopping Cart"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
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
      
      {/* Mobile Navigation Menu */}
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
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
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
          
          <Link 
            to="/favorite-locations" 
            className="flex items-center space-x-3 py-4 text-lg border-b border-border"
          >
            <Heart size={18} />
            <span>Favorite Locations</span>
          </Link>
          
          <Link 
            to="/profile" 
            className="flex items-center space-x-3 py-4 text-lg border-b border-border"
          >
            <User size={18} />
            <span>Profile</span>
          </Link>
          
          {user ? (
            <button 
              onClick={handleSignOut}
              className="mt-6 flex items-center space-x-3 py-4 text-lg text-destructive"
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
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
