
import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Facebook, Instagram, Twitter, MapPin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-primary font-bold text-xl">
              <Coffee size={24} strokeWidth={2.5} />
              <span>Tasty Hub</span>
            </div>
            <p className="text-muted-foreground">
              A modern dining experience focused on fresh ingredients, sustainability, 
              and plant-based options.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Useful Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Useful Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/menu" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link to="/deals" className="text-muted-foreground hover:text-primary transition-colors">
                  Special Deals
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/reservations" className="text-muted-foreground hover:text-primary transition-colors">
                  Reservations
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors">
                  Join Our Team
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-muted-foreground">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>123 Healthy Street, Foodville, CA 90210</span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Phone size={18} className="flex-shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Mail size={18} className="flex-shrink-0" />
                <span>contact@tastyhub.com</span>
              </li>
            </ul>
          </div>
          
          {/* Opening Hours */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Opening Hours</h3>
            <ul className="space-y-2">
              <li className="flex justify-between text-muted-foreground">
                <span>Monday - Friday</span>
                <span>7:00 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between text-muted-foreground">
                <span>Saturday</span>
                <span>7:00 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between text-muted-foreground">
                <span>Sunday</span>
                <span>8:30 AM - 5:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-border text-center text-muted-foreground text-sm">
          <p>© {currentYear} Tasty Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
