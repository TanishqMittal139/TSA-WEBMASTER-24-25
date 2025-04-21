
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import AppLogo from '@/components/ui/app-logo';
import { ShoppingBag, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ui/theme-toggle';
import { NavLink } from './navbar/nav-link';
import UserMenu from './navbar/user-menu';
import MobileMenu from './navbar/mobile-menu';
import { NAV_LINKS } from '@/constants/nav-links';

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

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  
  return (
    <header className={cn(
      "fixed w-full z-50 transition-all duration-300 bg-background/90 backdrop-blur-lg shadow-sm py-2",
      isScrolled && "py-1 shadow-md"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 transition-all hover:scale-105 z-50"
        >
          <AppLogo />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              isActive={location.pathname === link.path}
              icon={<link.icon size={link.size} />}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
        
        {/* Desktop Right Side */}
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
            <UserMenu user={user} profile={profile} onSignOut={handleSignOut} />
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
        
        {/* Mobile Controls */}
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
            <Menu size={24} />
          </button>
        </div>
      </div>
      
      <MobileMenu
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        user={user}
        profile={profile}
        handleSignOut={handleSignOut}
      />
    </header>
  );
};

export default Navbar;
