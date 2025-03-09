
import React, { useState, useEffect } from 'react';
import Navbar from '../components/ui/navbar';
import Footer from '../components/ui/footer';
import { Search, MapPin, Locate, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const locations = [
  {
    id: 1,
    name: 'Downtown',
    address: '123 Main Street, Downtown, CA 90001',
    phone: '(555) 123-4567',
    hours: 'Mon-Sat: 7:00 AM - 5:00 PM, Sun: 8:30 AM - 5:00 PM',
    coordinates: { lat: 34.052235, lng: -118.243683 }
  },
  {
    id: 2,
    name: 'Westside',
    address: '456 Ocean Avenue, Westside, CA 90402',
    phone: '(555) 987-6543',
    hours: 'Mon-Sat: 7:00 AM - 5:00 PM, Sun: 8:30 AM - 5:00 PM',
    coordinates: { lat: 34.023354, lng: -118.481887 }
  },
  {
    id: 3,
    name: 'Eastside',
    address: '789 Valley Blvd, Eastside, CA 90032',
    phone: '(555) 456-7890',
    hours: 'Mon-Sat: 7:00 AM - 5:00 PM, Sun: 8:30 AM - 5:00 PM',
    coordinates: { lat: 34.085685, lng: -118.176186 }
  }
];

const FindLocation: React.FC = () => {
  const [zipCode, setZipCode] = useState('');
  const [activeLocation, setActiveLocation] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Set up intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });
    
    const elements = document.querySelectorAll('.fade-up, .stagger-item');
    elements.forEach(el => observer.observe(el));
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Searching for locations near ${zipCode}`);
    // In a real app, this would search for locations near the zipCode
  };
  
  // Placeholder map component - in a real app, you would use Google Maps or another map provider
  const MapPlaceholder = () => (
    <div className="relative w-full h-full bg-secondary rounded-xl overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-muted-foreground">
        <div>
          <p className="mb-4">Interactive map would be displayed here.</p>
          <p className="text-sm">
            This would use the Google Maps API in a production environment.
          </p>
        </div>
      </div>
      
      {/* Location markers */}
      {locations.map((location) => (
        <div 
          key={location.id}
          className={cn(
            "absolute w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300",
            activeLocation === location.id 
              ? "bg-primary text-white scale-125" 
              : "bg-muted text-foreground hover:bg-primary/70 hover:text-white"
          )}
          style={{ 
            left: `${20 + location.id * 25}%`, 
            top: `${30 + location.id * 15}%` 
          }}
          onClick={() => setActiveLocation(location.id)}
        >
          <MapPin size={14} />
        </div>
      ))}
    </div>
  );
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* Header */}
        <section className="pt-32 pb-12 bg-accent">
          <div className="container-custom">
            <div className={cn(
              "max-w-2xl mx-auto text-center transition-all duration-1000 transform",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            )}>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Find a Location</h1>
              <p className="text-muted-foreground mb-8">
                Discover Tasty Hub locations near you. We're expanding to serve fresh, 
                plant-based food to more communities.
              </p>
              
              {/* Search Form */}
              <form onSubmit={handleSearch} className="max-w-md mx-auto">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={20} className="text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Enter your ZIP code"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button 
                    type="submit"
                    className="absolute inset-y-0 right-0 px-4 text-primary font-medium"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
        
        {/* Map and Locations Section */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Locations List */}
              <div className="lg:col-span-1 space-y-4">
                <h2 className="text-2xl font-bold mb-4 fade-up">Our Locations</h2>
                
                {locations.map((location, index) => (
                  <div 
                    key={location.id}
                    className={cn(
                      "p-5 rounded-xl transition-all duration-300 cursor-pointer stagger-item",
                      activeLocation === location.id 
                        ? "bg-primary text-white shadow-lg" 
                        : "bg-white hover:bg-secondary shadow-md"
                    )}
                    onClick={() => setActiveLocation(location.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold">{location.name}</h3>
                      {activeLocation === location.id && (
                        <div className="px-2 py-1 bg-white/20 rounded-full text-xs">
                          Selected
                        </div>
                      )}
                    </div>
                    
                    <div className={cn(
                      "space-y-2 text-sm",
                      activeLocation === location.id ? "text-white/90" : "text-muted-foreground"
                    )}>
                      <p>{location.address}</p>
                      <p>{location.phone}</p>
                      <p className="text-xs">{location.hours}</p>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <button className={cn(
                        "flex items-center space-x-1 text-xs font-medium",
                        activeLocation === location.id 
                          ? "text-white/90 hover:text-white" 
                          : "text-primary hover:text-primary/80"
                      )}>
                        <ExternalLink size={14} />
                        <span>Directions</span>
                      </button>
                      
                      <button className={cn(
                        "flex items-center space-x-1 text-xs font-medium",
                        activeLocation === location.id 
                          ? "text-white/90 hover:text-white" 
                          : "text-primary hover:text-primary/80"
                      )}>
                        <span>Set as Favorite</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Map */}
              <div className="lg:col-span-2 h-96 lg:h-auto fade-up">
                <MapPlaceholder />
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-accent">
          <div className="container-custom text-center fade-up">
            <h2 className="text-3xl font-bold mb-4">Coming to Your Neighborhood Soon</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              We're expanding to bring fresh, sustainable, plant-based food to more communities.
            </p>
            <button className="button-primary">
              Request a Location
            </button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FindLocation;
