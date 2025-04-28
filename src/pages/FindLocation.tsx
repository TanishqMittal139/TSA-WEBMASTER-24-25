import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { toast } from '@/components/ui/use-toast';
import { isAuthenticated } from '@/services/auth';
import { useFavorites } from '@/context/FavoritesContext';
import BlurImage from '@/components/ui/blur-image';
import LocationSearch from '@/components/locations/LocationSearch';
import LocationCard from '@/components/locations/LocationCard';
import LocationDetails from '@/components/locations/LocationDetails';
import { locations } from '@/data/locations';
import { cn } from '@/lib/utils';

const FindLocation: React.FC = () => {
  const navigate = useNavigate();
  const { favoriteLocations, addFavoriteLocation, removeFavoriteLocation, isFavoriteLocation } = useFavorites();
  const [activeLocation, setActiveLocation] = useState<typeof locations[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  
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

  const filteredLocations = locations.filter(location => {
    const query = searchQuery.toLowerCase();
    return (
      location.name.toLowerCase().includes(query) ||
      location.address.toLowerCase().includes(query) ||
      location.state.toLowerCase().includes(query) ||
      location.region.toLowerCase().includes(query) ||
      location.phone.toLowerCase().includes(query)
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

  const enhancedLocations = filteredLocations.map(loc => ({
    id: loc.id,
    name: loc.name,
    address: loc.address,
    city: loc.address.split(',')[1]?.trim() || '',
    state: loc.state,
    zip: loc.address.split(',')[2]?.trim() || '',
    phone: loc.phone,
    rating: loc.rating,
    reviewCount: loc.reviewCount,
    image: loc.image
  }));

  const getEnhancedLocation = (loc: typeof locations[0]) => {
    if (!loc) return null;
    return {
      id: loc.id,
      name: loc.name,
      address: loc.address,
      city: loc.address.split(',')[1]?.trim() || '',
      state: loc.state,
      zip: loc.address.split(',')[2]?.trim() || '',
      phone: loc.phone,
      image: loc.image,
      hours: {
        monday: "7:00 AM - 9:00 PM",
        tuesday: "7:00 AM - 9:00 PM",
        wednesday: "7:00 AM - 9:00 PM",
        thursday: "7:00 AM - 9:00 PM",
        friday: "7:00 AM - 9:00 PM",
        saturday: "7:00 AM - 9:00 PM",
        sunday: "8:30 AM - 9:00 PM"
      },
      features: ["Dine-in", "Takeout", "Delivery", "Outdoor Seating", "Wi-Fi"],
      coordinates: loc.coordinates
    };
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
                Visit one of our locations and enjoy our fresh, locally-sourced menu offerings.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-1/2 xl:w-2/5">
                <LocationSearch 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
                
                <div className="space-y-4 mt-6">
                  {filteredLocations.length > 0 ? (
                    enhancedLocations.map((location) => (
                      <LocationCard
                        key={location.id}
                        location={location}
                        isActive={activeLocation?.id === location.id}
                        isFavorite={isFavoriteLocation(location.id)}
                        onSelect={() => setActiveLocation(locations.find(loc => loc.id === location.id) || null)}
                        onToggleFavorite={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(location.id);
                        }}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No locations found matching your search.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full lg:w-1/2 xl:w-3/5 lg:sticky lg:top-4 lg:self-start">
                {activeLocation ? (
                  <div className="bg-secondary/30 rounded-lg p-6">
                    <LocationDetails
                      location={getEnhancedLocation(activeLocation)!}
                      isFavorite={isFavoriteLocation(activeLocation.id)}
                      onToggleFavorite={() => handleToggleFavorite(activeLocation.id)}
                    />
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center p-8 bg-secondary/30 rounded-lg">
                    <p className="text-muted-foreground text-center">
                      Select a location to view its details
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FindLocation;
