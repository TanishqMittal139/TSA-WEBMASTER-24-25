
import React, { useState, useEffect } from 'react';
import Navbar from '../components/ui/navbar';
import Footer from '../components/ui/footer';
import BlurImage from '../components/ui/blur-image';
import LocationMap from '../components/ui/location-map';
import { cn } from '@/lib/utils';
import { MapPin, Clock, Phone, ExternalLink, ChevronRight, Search, Heart, X, ArrowRight } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { toast } from '@/components/ui/use-toast';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { isAuthenticated } from '@/services/auth';
import { useNavigate } from 'react-router-dom';

// Updated locations with Virginia locations
const locations = [
  {
    id: 'va-glenallen',
    name: 'Glen Allen - Virginia',
    address: '4350 Pouncey Tract Rd, Glen Allen, VA 23060',
    phone: '(804) 555-7821',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-77.6082, 37.6651] as [number, number],
    popular: true
  },
  {
    id: 'va-hampton',
    name: 'Hampton - Virginia',
    address: '2150 Cunningham Dr, Hampton, VA 23666',
    phone: '(757) 555-3492',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-76.3968, 37.0311] as [number, number],
    popular: false
  },
  {
    id: 'va-richmond',
    name: 'Richmond - Virginia',
    address: '901 E Cary St, Richmond, VA 23219',
    phone: '(804) 555-9072',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-77.4360, 37.5407] as [number, number],
    popular: true
  },
  {
    id: 'sf-downtown',
    name: 'San Francisco - Downtown',
    address: '123 Market Street, San Francisco, CA 94105',
    phone: '(415) 555-1234',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-122.4194, 37.7749] as [number, number],
    popular: true
  },
  {
    id: 'la-venice',
    name: 'Los Angeles - Venice',
    address: '456 Abbot Kinney Blvd, Venice, CA 90291',
    phone: '(310) 555-6789',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-118.4695, 33.9850] as [number, number],
    popular: false
  },
  {
    id: 'ny-soho',
    name: 'New York - SoHo',
    address: '789 Broadway, New York, NY 10003',
    phone: '(212) 555-9012',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-73.9845, 40.7238] as [number, number],
    popular: true
  },
];

// Helper to filter locations by search term
const filterLocations = (searchTerm: string) => {
  if (!searchTerm.trim()) return locations;
  
  const searchTermLower = searchTerm.toLowerCase();
  return locations.filter(location => 
    location.name.toLowerCase().includes(searchTermLower) ||
    location.address.toLowerCase().includes(searchTermLower)
  );
};

// Helper to filter locations by ZIP code (3-digit match for demo purposes)
const filterLocationsByZip = (zipCode: string) => {
  if (!zipCode.trim()) return [];
  
  // In a real app, this would use geocoding or database lookup
  // For demo, we'll just return a location if zip code starts with the same 3 digits
  const zipDigits = zipCode.substring(0, 3);
  
  const zipMap: Record<string, string[]> = {
    "230": ["va-glenallen", "va-richmond"],
    "236": ["va-hampton"],
    "941": ["sf-downtown"],
    "902": ["la-venice"],
    "100": ["ny-soho"]
  };
  
  const locationIds = zipMap[zipDigits] || [];
  return locations.filter(loc => locationIds.includes(loc.id));
};

// Helper to check if location delivers to address (demo/simulated)
const locationDeliversToAddress = (address: string, cityStateZip: string) => {
  // This is a simulated check - in a real app this would use distance calculation
  // For demo purposes, we'll just check if the address contains certain terms
  const fullAddress = `${address} ${cityStateZip}`.toLowerCase();
  
  const cityMatches = {
    "richmond": ["va-richmond"],
    "glen allen": ["va-glenallen"],
    "hampton": ["va-hampton"],
    "san francisco": ["sf-downtown"],
    "los angeles": ["la-venice"],
    "new york": ["ny-soho"]
  };
  
  for (const [city, locationIds] of Object.entries(cityMatches)) {
    if (fullAddress.includes(city.toLowerCase())) {
      return locations.filter(loc => locationIds.includes(loc.id));
    }
  }
  
  return [];
};

const FindLocation: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLocation, setActiveLocation] = useState(locations[0]);
  const [filteredLocations, setFilteredLocations] = useState(locations);
  const { addFavoriteLocation, removeFavoriteLocation, isFavoriteLocation } = useFavorites();
  
  // Carry-out form state
  const [isCarryOutOpen, setIsCarryOutOpen] = useState(false);
  const [carryOutSearch, setCarryOutSearch] = useState('');
  const [carryOutResults, setCarryOutResults] = useState<typeof locations>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Delivery form state
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryCityStateZip, setDeliveryCityStateZip] = useState('');
  const [deliveryResults, setDeliveryResults] = useState<typeof locations>([]);
  const [hasDeliverySearched, setHasDeliverySearched] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
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

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredLocations(locations);
      return;
    }
    
    setFilteredLocations(filterLocations(searchQuery));
  }, [searchQuery]);

  const handleSetFavorite = (location: typeof locations[0]) => {
    if (!isAuthenticated()) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save favorite locations",
        variant: "destructive",
      });
      navigate('/sign-in');
      return;
    }
    
    if (isFavoriteLocation(location.id)) {
      removeFavoriteLocation(location.id);
      toast({
        title: "Location removed",
        description: `${location.name} has been removed from your favorites.`,
      });
    } else {
      addFavoriteLocation({
        id: location.id,
        name: location.name
      });
      toast({
        title: "Location added",
        description: `${location.name} has been added to your favorites.`,
      });
    }
  };

  const handleGetDirections = (location: typeof locations[0]) => {
    window.open(`https://maps.google.com/?q=${encodeURIComponent(location.address)}`, '_blank');
  };
  
  const handleCarryOutSearch = () => {
    if (!carryOutSearch.trim()) {
      setCarryOutResults([]);
      setHasSearched(false);
      return;
    }
    
    // Determine if searching by ZIP or location name
    if (/^\d+$/.test(carryOutSearch)) {
      setCarryOutResults(filterLocationsByZip(carryOutSearch));
    } else {
      setCarryOutResults(filterLocations(carryOutSearch));
    }
    
    setHasSearched(true);
  };
  
  const handleDeliverySearch = () => {
    if (!deliveryAddress.trim() || !deliveryCityStateZip.trim()) {
      setDeliveryResults([]);
      setHasDeliverySearched(false);
      return;
    }
    
    setDeliveryResults(locationDeliversToAddress(deliveryAddress, deliveryCityStateZip));
    setHasDeliverySearched(true);
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
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
        
        <section className="py-8">
          <div className="container mx-auto px-4 text-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <Button
                onClick={() => setIsCarryOutOpen(true)}
                size="lg" 
                className="h-auto py-6 text-lg"
              >
                Carry Out
              </Button>
              
              <Button
                onClick={() => setIsDeliveryOpen(true)}
                size="lg"
                variant="outline"
                className="h-auto py-6 text-lg"
              >
                Delivery
              </Button>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
              
              <div className="lg:col-span-2">
                <div className="bg-card rounded-lg shadow-md border border-border overflow-hidden">
                  <div className="h-[400px]">
                    <LocationMap 
                      locations={locations.map(loc => ({
                        id: loc.id,
                        name: loc.name,
                        coordinates: loc.coordinates
                      }))} 
                      activeLocationId={activeLocation.id}
                      center={activeLocation.coordinates}
                    />
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
                            className={cn(
                              "button-outline flex items-center justify-center py-2",
                              isFavoriteLocation(activeLocation.id) && "bg-primary/10"
                            )}
                          >
                            <Heart size={16} className={cn(
                              "mr-2",
                              isFavoriteLocation(activeLocation.id) ? "fill-primary text-primary" : ""
                            )} />
                            <span>
                              {isFavoriteLocation(activeLocation.id) 
                                ? "Favorited" 
                                : "Add to Favorites"}
                            </span>
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
      
      {/* Carry Out Sheet */}
      <Sheet open={isCarryOutOpen} onOpenChange={setIsCarryOutOpen}>
        <SheetContent side="right" className="sm:max-w-md md:max-w-lg">
          <SheetHeader>
            <SheetTitle>Find a Location for Carry Out</SheetTitle>
            <SheetDescription>
              Enter your ZIP code or city to find nearby locations for pickup
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-8 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">City, State or ZIP Code</label>
              <div className="flex gap-2">
                <Input 
                  placeholder="e.g., Richmond, VA or 23219" 
                  value={carryOutSearch}
                  onChange={(e) => setCarryOutSearch(e.target.value)}
                />
                <Button onClick={handleCarryOutSearch}>Search</Button>
              </div>
            </div>
            
            <div className="mt-6">
              {hasSearched && (
                <h3 className="text-lg font-medium mb-4">
                  {carryOutResults.length > 0 
                    ? `${carryOutResults.length} Locations Found` 
                    : "No Locations Found"}
                </h3>
              )}
              
              {hasSearched && carryOutResults.length === 0 && (
                <div className="text-center py-8 bg-muted/30 rounded-lg">
                  <p className="text-muted-foreground mb-2">
                    We couldn't find any locations near that address.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Try a different ZIP code or city.
                  </p>
                </div>
              )}
              
              <div className="space-y-4 mt-4">
                {carryOutResults.map(location => (
                  <div 
                    key={location.id}
                    className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
                  >
                    <h4 className="font-medium">{location.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{location.address}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-muted-foreground">
                        <Clock size={14} className="inline mr-1" /> 
                        Ready in 15-20 min
                      </div>
                      <SheetClose asChild>
                        <Button size="sm" onClick={() => {
                          setActiveLocation(location);
                          toast({
                            title: "Location Selected",
                            description: `You've selected ${location.name} for carry out.`,
                          });
                        }}>
                          <span>Select</span>
                          <ArrowRight size={14} className="ml-1" />
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Delivery Sheet */}
      <Sheet open={isDeliveryOpen} onOpenChange={setIsDeliveryOpen}>
        <SheetContent side="right" className="sm:max-w-md md:max-w-lg">
          <SheetHeader>
            <SheetTitle>Delivery Address</SheetTitle>
            <SheetDescription>
              Enter your address to find out if we deliver to your location
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-8 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Street Address</label>
              <Input 
                placeholder="e.g., 123 Main St" 
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">City, State, ZIP</label>
              <Input 
                placeholder="e.g., Richmond, VA 23219" 
                value={deliveryCityStateZip}
                onChange={(e) => setDeliveryCityStateZip(e.target.value)}
              />
            </div>
            
            <Button onClick={handleDeliverySearch} className="w-full">Check Delivery Availability</Button>
            
            <div className="mt-6">
              {hasDeliverySearched && (
                <h3 className="text-lg font-medium mb-4">
                  {deliveryResults.length > 0 
                    ? "Delivery Available!" 
                    : "Delivery Not Available"}
                </h3>
              )}
              
              {hasDeliverySearched && deliveryResults.length === 0 && (
                <div className="text-center py-8 bg-muted/30 rounded-lg">
                  <p className="text-muted-foreground mb-2">
                    We're sorry, but we don't currently deliver to your address.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Try our carry out service instead.
                  </p>
                </div>
              )}
              
              <div className="space-y-4 mt-4">
                {deliveryResults.map(location => (
                  <div 
                    key={location.id}
                    className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
                  >
                    <h4 className="font-medium">Delivery from {location.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">to {deliveryAddress}, {deliveryCityStateZip}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-muted-foreground">
                        <Clock size={14} className="inline mr-1" /> 
                        Delivery in 30-45 min
                      </div>
                      <SheetClose asChild>
                        <Button size="sm" onClick={() => {
                          setActiveLocation(location);
                          toast({
                            title: "Delivery Location Selected",
                            description: `You've selected ${location.name} for delivery to your address.`,
                          });
                          navigate('/menu');
                        }}>
                          <span>Order Now</span>
                          <ArrowRight size={14} className="ml-1" />
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      <Footer />
    </div>
  );
};

export default FindLocation;
