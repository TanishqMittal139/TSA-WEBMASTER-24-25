
import React, { useRef, useEffect } from 'react';
import { Clock, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const hours = [
  { day: 'Sunday', hours: '8:30 AM - 5:00 PM' },
  { day: 'Monday', hours: '7:00 AM - 5:00 PM' },
  { day: 'Tuesday', hours: '7:00 AM - 5:00 PM' },
  { day: 'Wednesday', hours: '7:00 AM - 5:00 PM' },
  { day: 'Thursday', hours: '7:00 AM - 5:00 PM' },
  { day: 'Friday', hours: '7:00 AM - 5:00 PM' },
  { day: 'Saturday', hours: '7:00 AM - 5:00 PM' }
];

const HoursSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll('.stagger-item');
          items.forEach((item, i) => {
            setTimeout(() => {
              item.classList.add('is-visible');
            }, i * 100);
          });
        }
      });
    }, { threshold: 0.1 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Get current day index (0 = Sunday, 1 = Monday, etc.)
  const today = new Date().getDay();
  
  return (
    <section className="py-24 bg-accent dark:bg-gray-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2" aria-hidden="true"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3" aria-hidden="true"></div>
      
      <div ref={sectionRef} className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Info Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover-lift">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2 fade-up dark:text-white">Store Hours & Info</h2>
              <p className="text-muted-foreground fade-up dark:text-gray-300">Visit us at your convenience. We're open daily!</p>
            </div>
            
            <div className="space-y-6">
              {/* Hours */}
              <div className="stagger-item">
                <div className="flex items-center space-x-3 mb-3 text-primary font-medium dark:text-primary-foreground">
                  <Clock size={20} />
                  <span>Hours of Operation</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {hours.map((item, index) => (
                    <div 
                      key={item.day}
                      className={cn(
                        "flex justify-between py-2 px-3 rounded-lg",
                        index === today 
                          ? "bg-primary/10 text-primary dark:bg-primary/30 dark:text-primary-foreground font-medium" 
                          : "text-muted-foreground dark:text-gray-300"
                      )}
                    >
                      <span>{item.day}</span>
                      <span>{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Contact & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-border dark:border-gray-700 rounded-xl stagger-item dark:bg-gray-800/80">
                  <div className="flex items-center space-x-3 mb-2 text-primary font-medium dark:text-primary-foreground">
                    <Phone size={20} />
                    <span>Contact Us</span>
                  </div>
                  <p className="text-muted-foreground dark:text-gray-300">(555) 123-4567</p>
                </div>
                
                <div className="p-4 border border-border dark:border-gray-700 rounded-xl stagger-item dark:bg-gray-800/80">
                  <div className="flex items-center space-x-3 mb-2 text-primary font-medium dark:text-primary-foreground">
                    <MapPin size={20} />
                    <span>Find Us</span>
                  </div>
                  <Link to="/find-location" className="text-primary text-sm hover:underline">
                    Locate Nearest Store
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mission */}
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary dark:bg-primary/30 dark:text-primary-foreground rounded-full text-sm font-medium stagger-item">
              Our Mission
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold stagger-item dark:text-white">
              Sustainable Food, <br /> Sustainable Future
            </h2>
            
            <p className="text-muted-foreground dark:text-gray-300 stagger-item">
              At Tasty Hub, we're committed to reducing food waste. At the end of each day, 
              our extra produce is transformed into nutritious meals donated to local homeless 
              shelters and soup kitchens, helping both our community and the environment.
            </p>
            
            <div className="pt-4 stagger-item">
              <Link to="/about" className="button-primary">
                Learn About Our Values
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HoursSection;
