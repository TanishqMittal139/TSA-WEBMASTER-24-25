
import React, { useState, useEffect } from 'react';
import Navbar from '../components/ui/navbar';
import Footer from '../components/ui/footer';
import BlurImage from '../components/ui/blur-image';
import LocationMap from '../components/ui/location-map';
import { cn } from '@/lib/utils';
import { MapPin, Clock, Phone, ExternalLink, ChevronRight, Search } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Store location data
const locations = [
  {
    id: 'sf-downtown',
    name: 'San Francisco - Downtown',
    address: '123 Market Street, San Francisco, CA 94105',
    phone: '(415) 555-1234',
    hours: 'Mon-Fri: 7:00 AM - 5:00 PM | Sat-Sun: 8:30 AM - 5:00 PM',
    coordinates: [-122.4194, 37.7749],
    popular: true
  },
  {
    id: 'la-venice',
    name: 'Los Angeles - Venice',
    address: '456 Abbot Kinney Blvd, Venice, CA 90291',
    phone: '(310) 555-6789',
    hours: 'Mon-Fri: 7:00 AM - 5:00 PM | Sat-Sun: 8:30 AM - 5:00 PM',
    coordinates: [-118.4695, 33.9850],
    popular: false
  },
  {
    id: 'ny-soho',
    name: 'New York - SoHo',
    address: '789 Broadway, New York, NY 10003',
    phone: '(212) 555-9012',
    hours: 'Mon-Fri: 7:00 AM - 5:00 PM | Sat-Sun: 8:30 AM - 5:00 PM',
    coordinates: [-73.9845, 40.7238],
    popular: true
  },
  {
    id: 'sea-capitol',
    name: 'Seattle - Capitol Hill',
    address: '321 Pike Street, Seattle, WA 98101',
    phone: '(206) 555-3456',
    hours: 'Mon-Fri: 7:00 AM - 5:00 PM | Sat-Sun: 8:30 AM - 5:00 PM',
    coordinates: [-122.3321, 47.6062],
    popular: false
  },
  {
    id: 'chi-river',
    name: 'Chicago - River North',
    address: '654 N Wells St, Chicago, IL 60654',
    phone: '(312) 555-7890',
    hours: 'Mon-Fri: 7:00 AM - 5:00 PM | Sat-Sun: 8:30 AM - 5:00 PM',
    coordinates: [-87.6298, 41.8781],
    popular: false
  },
  {
    id: 'aus-downtown',
    name: 'Austin - Downtown',
    address: '987 Congress Ave, Austin, TX 78701',
    phone: '(512) 555-2345',
    hours: 'Mon-Fri: 7:00 AM - 5:00 PM | Sat-Sun: 8:30 AM - 5:00 PM',
    coordinates: [-97.7431, 30.2672],
    popular: true
  },
];

const FindLocation: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLocation, setActiveLocation] = useState(locations[0]);
  const [filteredLocations, setFilteredLocations] = useState(locations);
  
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

  // Filter locations based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredLocations(locations);
      return;
    }
    
    const filtered = locations.filter(location => 
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredLocations(filtered);
  }, [searchQuery]);

  const handleSetFavorite = (location: typeof locations[0]) => {
    toast({
      title: "Location Favorited",
      description: `${location.name} has been set as your favorite location.`,
      duration: 3000,
    });
  };

  const handleGetDirections = (location: typeof locations[0]) => {
    // In a real application, this would open Google Maps or another mapping service
    window.open(`https://maps.google.com/?q=${encodeURIComponent(location.address)}`, '_blank');
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Banner */}
        <section className="relative h-80">
          <div className="absolute inset-0">
            <BlurImage
              src="https://images.unsplash.com/photo-1577415124269-fc1140a69e91?q=80&w=2574&auto=format&fit=crop"
              alt="Locations banner"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10"></div>
          </div>
          
          <div className="relative container mx-auto px-4 flex flex-col justify-center h-full pt-24">
            <div className={cn(
              "transition-all duration-1000 transform",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            )}>
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Our Locations
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Find a Tasty Hub Near You</h1>
              <p className="text-muted-foreground max-w-xl">
                Visit one of our many locations across the country and enjoy our fresh, sustainable menu in person.
              </p>
            </div>
          </div>
        </section>
        
        {/* Location Finder Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Search & Location List */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search size={18} className="text-muted-foreground" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by city or address"
                      className="bg-background py-3 pl-10 pr-4 block w-full rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div className="bg-card rounded-lg shadow-md border border-border overflow-hidden">
                    <div className="px-4 py-3 border-b border-border">
                      <h3 className="font-medium">Our Locations ({filteredLocations.length})</h3>
                    </div>
                    <div className="max-h-[500px] overflow-y-auto">
                      {filteredLocations.length > 0 ? (
                        filteredLocations.map((location) => (
                          <div 
                            key={location.id} 
                            onClick={() => setActiveLocation(location)}
                            className={cn(
                              "p-4 border-b border-border cursor-pointer transition-colors",
                              activeLocation.id === location.id 
                                ? "bg-primary/10" 
                                : "hover:bg-muted/50"
                            )}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium">{location.name}</h4>
                                <p className="text-sm text-muted-foreground">{location.address}</p>
                                <div className="flex items-center text-xs text-muted-foreground mt-1">
                                  <Clock size={12} className="mr-1" />
                                  <span>Open Today: 7:00 AM - 5:00 PM</span>
                                </div>
                              </div>
                              <ChevronRight size={16} className={cn(
                                "text-muted-foreground transition-transform",
                                activeLocation.id === location.id ? "rotate-90" : ""
                              )} />
                            </div>
                            {location.popular && (
                              <span className="inline-block mt-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Popular Location</span>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="p-6 text-center">
                          <p className="text-muted-foreground">No locations found. Try a different search term.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map & Location Details */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-lg shadow-md border border-border overflow-hidden">
                  <div className="h-[400px]">
                    <LocationMap />
                  </div>
                  
                  {activeLocation && (
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div>
                          <h2 className="text-2xl font-bold mb-2">{activeLocation.name}</h2>
                          <div className="flex items-start space-x-2 text-muted-foreground mb-1">
                            <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                            <span>{activeLocation.address}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-muted-foreground mb-1">
                            <Phone size={16} className="flex-shrink-0" />
                            <span>{activeLocation.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-muted-foreground">
                            <Clock size={16} className="flex-shrink-0" />
                            <span>{activeLocation.hours}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                          <button
                            onClick={() => handleSetFavorite(activeLocation)}
                            className="button-outline flex items-center justify-center py-2"
                          >
                            <span>Set as Favorite</span>
                          </button>
                          <button
                            onClick={() => handleGetDirections(activeLocation)}
                            className="button-primary flex items-center justify-center py-2"
                          >
                            <span className="mr-1">Get Directions</span>
                            <ExternalLink size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Nearby Info */}
                <div className="mt-8 bg-secondary rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Available at {activeLocation.name}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-card p-4 rounded-md border border-border shadow-sm">
                      <div className="font-medium">Dine-In Services</div>
                      <p className="text-sm text-muted-foreground">Comfortable indoor and outdoor seating available</p>
                    </div>
                    <div className="bg-card p-4 rounded-md border border-border shadow-sm">
                      <div className="font-medium">Carry-Out</div>
                      <p className="text-sm text-muted-foreground">Convenient pick-up options with online ordering</p>
                    </div>
                    <div className="bg-card p-4 rounded-md border border-border shadow-sm">
                      <div className="font-medium">Delivery Radius</div>
                      <p className="text-sm text-muted-foreground">Available within 3 miles of this location</p>
                    </div>
                    <div className="bg-card p-4 rounded-md border border-border shadow-sm">
                      <div className="font-medium">Catering</div>
                      <p className="text-sm text-muted-foreground">Available for events and group orders</p>
                    </div>
                    <div className="bg-card p-4 rounded-md border border-border shadow-sm">
                      <div className="font-medium">WiFi</div>
                      <p className="text-sm text-muted-foreground">Free high-speed internet for customers</p>
                    </div>
                    <div className="bg-card p-4 rounded-md border border-border shadow-sm">
                      <div className="font-medium">Parking</div>
                      <p className="text-sm text-muted-foreground">Street parking and nearby garages available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Visit?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Make a reservation at any of our locations and get a 10% discount on your first visit.
            </p>
            <a
              href="/reservations"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium text-lg hover:bg-primary/90 transition-colors"
            >
              Make a Reservation
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FindLocation;
