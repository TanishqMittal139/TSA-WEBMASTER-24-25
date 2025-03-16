import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Clock, Star, Heart, Info, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFavorites } from '@/context/FavoritesContext';
import { toast } from '@/components/ui/use-toast';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { isAuthenticated } from '@/services/auth';
import BlurImage from '@/components/ui/blur-image';

// Free mapbox token for this demo (low usage limits)
mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZWFpIiwiYSI6ImNsbXo1cTVueTBnbmoya213dDdvcGdjemEifQ.a891N5WH7GE9BTxqmOhROA';

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  rating: number;
  image: string;
  coordinates: [number, number]; // [longitude, latitude]
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  features: string[];
}

const locations: Location[] = [
  {
    id: 'arlington',
    name: 'Tasty Hub Arlington',
    address: '456 Wilson Blvd',
    city: 'Arlington',
    state: 'VA',
    zip: '22203',
    phone: '(703) 555-1234',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2174&auto=format&fit=crop',
    coordinates: [-77.0951, 38.8813], // Arlington, VA
    hours: {
      monday: '7:00 AM - 5:00 PM',
      tuesday: '7:00 AM - 5:00 PM',
      wednesday: '7:00 AM - 5:00 PM',
      thursday: '7:00 AM - 5:00 PM',
      friday: '7:00 AM - 5:00 PM',
      saturday: '7:00 AM - 5:00 PM',
      sunday: '8:30 AM - 5:00 PM'
    },
    features: ['Dine-in', 'Takeout', 'Outdoor seating', 'Wifi', 'Wheelchair accessible']
  },
  {
    id: 'alexandria',
    name: 'Tasty Hub Alexandria',
    address: '123 King Street',
    city: 'Alexandria',
    state: 'VA',
    zip: '22314',
    phone: '(703) 555-5678',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2070&auto=format&fit=crop',
    coordinates: [-77.0447, 38.8048], // Alexandria, VA
    hours: {
      monday: '7:00 AM - 5:00 PM',
      tuesday: '7:00 AM - 5:00 PM',
      wednesday: '7:00 AM - 5:00 PM',
      thursday: '7:00 AM - 5:00 PM',
      friday: '7:00 AM - 5:00 PM',
      saturday: '7:00 AM - 5:00 PM',
      sunday: '8:30 AM - 5:00 PM'
    },
    features: ['Dine-in', 'Takeout', 'Delivery', 'Outdoor seating', 'Wifi', 'Wheelchair accessible']
  },
  {
    id: 'fairfax',
    name: 'Tasty Hub Fairfax',
    address: '789 Fair Lakes Pkwy',
    city: 'Fairfax',
    state: 'VA',
    zip: '22033',
    phone: '(703) 555-9012',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1619474387533-301ed3b5a734?q=80&w=2070&auto=format&fit=crop',
    coordinates: [-77.3664, 38.8526], // Fairfax, VA
    hours: {
      monday: '7:00 AM - 5:00 PM',
      tuesday: '7:00 AM - 5:00 PM',
      wednesday: '7:00 AM - 5:00 PM',
      thursday: '7:00 AM - 5:00 PM',
      friday: '7:00 AM - 5:00 PM',
      saturday: '7:00 AM - 5:00 PM',
      sunday: '8:30 AM - 5:00 PM'
    },
    features: ['Dine-in', 'Takeout', 'Drive-thru', 'Wifi', 'Wheelchair accessible']
  },
  {
    id: 'vienna',
    name: 'Tasty Hub Vienna',
    address: '321 Maple Ave',
    city: 'Vienna',
    state: 'VA',
    zip: '22180',
    phone: '(703) 555-3456',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1554306297-0c86e837d24b?q=80&w=2070&auto=format&fit=crop',
    coordinates: [-77.2653, 38.8981], // Vienna, VA
    hours: {
      monday: '7:00 AM - 5:00 PM',
      tuesday: '7:00 AM - 5:00 PM',
      wednesday: '7:00 AM - 5:00 PM',
      thursday: '7:00 AM - 5:00 PM',
      friday: '7:00 AM - 5:00 PM',
      saturday: '7:00 AM - 5:00 PM',
      sunday: '8:30 AM - 5:00 PM'
    },
    features: ['Dine-in', 'Takeout', 'Outdoor seating', 'Wifi', 'Wheelchair accessible', 'Pet-friendly']
  }
];

const FindLocation: React.FC = () => {
  const navigate = useNavigate();
  const { favoriteLocations, addFavoriteLocation, removeFavoriteLocation, isFavoriteLocation } = useFavorites();
  const [activeLocation, setActiveLocation] = useState<Location | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mapContainerRef.current && !map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-77.2, 38.85], // Center of Virginia locations
        zoom: 9
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.current.on('load', () => {
        locations.forEach(location => {
          const marker = new mapboxgl.Marker({ color: '#4B5563' })
            .setLngLat(location.coordinates)
            .setPopup(new mapboxgl.Popup().setHTML(`
              <strong>${location.name}</strong><br>
              ${location.address}, ${location.city}, ${location.state} ${location.zip}
            `))
            .addTo(map.current!);
          
          markers.current.push(marker);
        });
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
        markers.current = [];
      }
    };
  }, []);

  useEffect(() => {
    markers.current.forEach((marker, index) => {
      marker.remove();
      
      const location = locations[index];
      const isActive = activeLocation?.id === location.id;
      
      const newMarker = new mapboxgl.Marker({ 
        color: isActive ? '#EF4444' : '#4B5563'
      })
        .setLngLat(location.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`
          <strong>${location.name}</strong><br>
          ${location.address}, ${location.city}, ${location.state} ${location.zip}
        `))
        .addTo(map.current!);
      
      markers.current[index] = newMarker;
      
      if (isActive && map.current) {
        map.current.flyTo({
          center: location.coordinates,
          zoom: 15,
          essential: true
        });
      }
    });
  }, [activeLocation]);

  const filteredLocations = locations.filter(location => {
    const query = searchQuery.toLowerCase();
    return (
      location.name.toLowerCase().includes(query) ||
      location.address.toLowerCase().includes(query) ||
      location.city.toLowerCase().includes(query) ||
      location.state.toLowerCase().includes(query) ||
      location.zip.toLowerCase().includes(query)
    );
  });

  const handleToggleFavorite = (locationId: string) => {
    if (!isAuthenticated()) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save favorite locations.",
        duration: 3000,
      });
      navigate('/sign-in', { state: { redirectTo: '/find-location' } });
      return;
    }

    if (isFavoriteLocation(locationId)) {
      removeFavoriteLocation(locationId);
      toast({
        title: "Removed from Favorites",
        description: "Location has been removed from your favorites.",
        duration: 3000,
      });
    } else {
      const location = locations.find(loc => loc.id === locationId);
      if (location) {
        addFavoriteLocation({
          id: location.id,
          name: location.name
        });
        toast({
          title: "Added to Favorites",
          description: "Location has been added to your favorites.",
          duration: 3000,
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="relative h-80">
          <div className="absolute inset-0">
            <BlurImage
              src="https://images.unsplash.com/photo-1471967183320-ee018f6e114a?q=80&w=2070&auto=format&fit=crop"
              alt="Find a Tasty Hub location"
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Find a Tasty Hub Near You</h1>
              <p className="text-muted-foreground max-w-xl">
                Visit one of our Virginia locations and enjoy our fresh, locally-sourced menu offerings.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-2/5 space-y-6">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search by city, zip code, or location name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {filteredLocations.length > 0 ? (
                    filteredLocations.map((location) => (
                      <Card 
                        key={location.id}
                        className={cn(
                          "cursor-pointer transition-all duration-200 hover:shadow-md border",
                          activeLocation?.id === location.id ? "border-primary" : "border-border"
                        )}
                        onClick={() => setActiveLocation(location)}
                      >
                        <div className="flex">
                          <div className="w-1/3">
                            <img 
                              src={location.image} 
                              alt={location.name}
                              className="h-full w-full object-cover aspect-square"
                            />
                          </div>
                          <div className="w-2/3 p-4">
                            <div className="flex justify-between items-start">
                              <h3 className="font-semibold text-lg">{location.name}</h3>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleFavorite(location.id);
                                }}
                                aria-label={isFavoriteLocation(location.id) ? "Remove from favorites" : "Add to favorites"}
                                className="text-muted-foreground hover:text-primary transition-colors"
                              >
                                <Heart 
                                  size={18} 
                                  className={isFavoriteLocation(location.id) ? "fill-primary text-primary" : ""} 
                                />
                              </button>
                            </div>
                            <div className="flex items-center space-x-1 mb-2 text-muted-foreground text-sm">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i}
                                    size={12}
                                    className={i < Math.floor(location.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                                  />
                                ))}
                              </div>
                              <span>{location.rating}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1 flex items-start">
                              <MapPin size={14} className="mr-1 mt-0.5 flex-shrink-0" />
                              {location.address}, {location.city}, {location.state} {location.zip}
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center">
                              <Phone size={14} className="mr-1 flex-shrink-0" />
                              {location.phone}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No locations found matching your search.</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="w-full lg:w-3/5">
                <div className="rounded-xl overflow-hidden border border-border h-[600px] shadow-sm">
                  <div ref={mapContainerRef} className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {activeLocation && (
          <section className="py-8 bg-secondary/30">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{activeLocation.name}</CardTitle>
                      <Button
                        variant={isFavoriteLocation(activeLocation.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleToggleFavorite(activeLocation.id)}
                        className="flex items-center gap-1"
                      >
                        <Heart size={16} className={isFavoriteLocation(activeLocation.id) ? "fill-primary-foreground" : ""} />
                        {isFavoriteLocation(activeLocation.id) ? "Saved" : "Save"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <img 
                          src={activeLocation.image}
                          alt={activeLocation.name}
                          className="w-full h-60 object-cover rounded-lg mb-4"
                        />
                        
                        <div className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                            <p>{activeLocation.address}, {activeLocation.city}, {activeLocation.state} {activeLocation.zip}</p>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Phone size={18} className="text-primary flex-shrink-0" />
                            <p>{activeLocation.phone}</p>
                          </div>
                          
                          <div className="flex items-start space-x-2">
                            <Info size={18} className="text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium mb-1">Features</p>
                              <div className="flex flex-wrap gap-2">
                                {activeLocation.features.map((feature, index) => (
                                  <span key={index} className="text-xs bg-secondary px-2 py-1 rounded">
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-start space-x-2 mb-4">
                          <Clock size={18} className="text-primary mt-0.5 flex-shrink-0" />
                          <div className="flex-grow">
                            <p className="font-medium mb-2">Hours of Operation</p>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Monday</span>
                                <span>{activeLocation.hours.monday}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Tuesday</span>
                                <span>{activeLocation.hours.tuesday}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Wednesday</span>
                                <span>{activeLocation.hours.wednesday}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Thursday</span>
                                <span>{activeLocation.hours.thursday}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Friday</span>
                                <span>{activeLocation.hours.friday}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Saturday</span>
                                <span>{activeLocation.hours.saturday}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Sunday</span>
                                <span>{activeLocation.hours.sunday}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-3">
                          <Button variant="outline" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${activeLocation.coordinates[1]},${activeLocation.coordinates[0]}`, '_blank')}>
                            Get Directions
                          </Button>
                          <Button onClick={() => navigate('/reservations', { state: { locationId: activeLocation.id } })}>
                            Make a Reservation
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default FindLocation;

