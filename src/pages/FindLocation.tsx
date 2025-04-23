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
import PageHeader from "@/components/ui/page-header";

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
        saturday: "8:30 AM - 10:00 PM",
        sunday: "8:30 AM - 10:00 PM"
      },
      features: ["Dine-in", "Takeout", "Delivery", "Outdoor Seating", "Wi-Fi"],
      coordinates: loc.coordinates
    };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <PageHeader
          badgeText="Our Locations"
          title="Find a Tasty Hub Near You"
          subtitle="Visit one of our locations and enjoy our fresh, locally-sourced menu offerings."
          bgImage="/lovable-uploads/c6bd1eaa-9001-4a30-a1e9-0ba6659d2ff8.png"
        />

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-6">
              <LocationSearch 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              
              <div className="space-y-4">
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
          </div>
        </section>
        
        {activeLocation && (
          <section className="py-8 bg-secondary/30">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <LocationDetails
                  location={getEnhancedLocation(activeLocation)!}
                  isFavorite={isFavoriteLocation(activeLocation.id)}
                  onToggleFavorite={() => handleToggleFavorite(activeLocation.id)}
                />
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
