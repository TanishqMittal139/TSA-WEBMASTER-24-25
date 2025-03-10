
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { 
  Menu, X, ShoppingBag, User, Coffee, Navigation, Info, Percent, CalendarRange, Utensils, Heart
} from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();
  
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
  
  const navLinks = [
    { name: 'Home', path: '/', icon: <Coffee size={18} /> },
    { name: 'Menu', path: '/menu', icon: <Utensils size={18} /> },
    { name: 'Deals', path: '/deals', icon: <Percent size={18} /> },
    { name: 'Locations', path: '/find-location', icon: <Navigation size={18} /> },
    { name: 'About', path: '/about', icon: <Info size={18} /> },
    { name: 'Reservations', path: '/reservations', icon: <CalendarRange size={18} /> }
  ];
  
  // Determine if we're on a page that needs darker text for better contrast
  const isDarkPage = ['/menu', '/deals', '/find-location', '/reservations', '/about', '/cart', 
                      '/favorite-locations', '/checkout', '/sign-in', '/sign-up'].includes(location.pathname) || 
                      location.pathname.startsWith('/menu/');
  
  return (
    <header className={cn(
      "fixed w-full z-50 transition-all duration-300",
      isScrolled 
        ? "bg-background/90 backdrop-blur-lg shadow-sm py-2" 
        : isDarkPage 
          ? "bg-background/90 backdrop-blur-lg shadow-sm py-2" 
          : "bg-transparent py-4"
    )}>
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className={cn(
            "flex items-center space-x-2 font-bold text-2xl transition-all hover-scale",
            isScrolled ? "text-primary" : isDarkPage ? "text-primary" : "text-primary"
          )}
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
                isScrolled
                  ? location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                  : isDarkPage
                    ? location.pathname === link.path
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                    : location.pathname === link.path
                      ? "text-primary"
                      : "text-background hover:text-primary"
              )}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
        
        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link 
            to="/favorite-locations" 
            className={cn(
              "p-2 transition-colors",
              isScrolled ? "text-foreground hover:text-primary" : isDarkPage ? "text-foreground hover:text-primary" : "text-background hover:text-primary"
            )}
            aria-label="Favorite Locations"
          >
            <Heart size={20} />
          </Link>
          
          <Link 
            to="/cart" 
            className={cn(
              "relative p-2 transition-colors",
              isScrolled ? "text-foreground hover:text-primary" : isDarkPage ? "text-foreground hover:text-primary" : "text-background hover:text-primary"
            )}
            aria-label="Shopping Cart"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          
          <Link 
            to="/sign-in" 
            className={cn(
              "button-outline py-2 text-sm",
              isScrolled ? "" : isDarkPage ? "" : "border-background text-background hover:bg-background/10"
            )}
          >
            Sign In
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          <Link 
            to="/cart" 
            className={cn(
              "relative p-2 transition-colors",
              isScrolled ? "text-foreground hover:text-primary" : isDarkPage ? "text-foreground hover:text-primary" : "text-background hover:text-primary"
            )}
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
            className={cn(
              "p-2 focus:outline-none",
              isScrolled ? "text-foreground hover:text-primary" : isDarkPage ? "text-foreground hover:text-primary" : "text-background hover:text-primary"
            )}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-sm z-40 transform transition-transform duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col pt-24 px-6 h-full overflow-y-auto">
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
            to="/sign-in" 
            className="mt-6 flex items-center space-x-3 py-4 text-lg"
          >
            <User size={18} />
            <span>Sign In</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
