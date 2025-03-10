
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import BlurImage from '../ui/blur-image';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { filterLocationsBySearch, filterLocationsByZip, locationDeliversToAddress } from '@/data/locations';

const OrderOptions = [
  { id: 'carryout', label: 'Carry Out' },
  { id: 'delivery', label: 'Delivery' }
];

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('carryout');
  const [isVisible, setIsVisible] = useState(false);
  
  // Carry-out form state
  const [isCarryOutOpen, setIsCarryOutOpen] = useState(false);
  const [carryOutSearch, setCarryOutSearch] = useState('');
  const [carryOutResults, setCarryOutResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Delivery form state
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryCityStateZip, setDeliveryCityStateZip] = useState('');
  const [deliveryResults, setDeliveryResults] = useState([]);
  const [hasDeliverySearched, setHasDeliverySearched] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleOrderNowClick = () => {
    if (selectedOption === 'carryout') {
      setIsCarryOutOpen(true);
    } else {
      setIsDeliveryOpen(true);
    }
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
      setCarryOutResults(filterLocationsBySearch(carryOutSearch));
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
    <section className="relative min-h-screen flex items-center pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-accent opacity-50" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={cn(
            "space-y-8 transform transition-all duration-1000 ease-out",
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          )}>
            {/* Order Type Selector */}
            <div className="inline-flex p-1 bg-secondary rounded-full">
              {OrderOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedOption(option.id)}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    selectedOption === option.id
                      ? "bg-primary text-white shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gradient">Fresh, Sustainable,</span> <br />
              Plant-Based Food
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-md">
              Experience our farm-to-table dining with locally sourced ingredients and 
              eco-friendly practices that nourish both you and the planet.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleOrderNowClick}
                className="button-primary flex items-center space-x-2 group"
              >
                <span>Order Now</span>
                <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
              <Link to="/find-location" className="button-outline flex items-center space-x-2 group">
                <span>Find Location</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          
          {/* Image */}
          <div className={cn(
            "relative h-[500px] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-1000 ease-out delay-300",
            isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
          )}>
            <BlurImage
              src="https://images.unsplash.com/photo-1484980972926-edee96e0960d?q=80&w=2574&auto=format&fit=crop"
              alt="Delicious plant-based food arrangement"
              className="rounded-2xl"
            />
            
            {/* Floating elements */}
            <div className="absolute top-6 right-6 glass-card p-4 rounded-xl shadow-lg animate-float">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">4.9</span>
                </div>
                <div>
                  <p className="font-semibold">Top Rated</p>
                  <p className="text-xs text-muted-foreground">350+ Reviews</p>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-6 left-6 glass-card p-4 rounded-xl shadow-lg max-w-[200px] animate-float" style={{ animationDelay: '1s' }}>
              <p className="font-medium">Eco-friendly packaging for all orders</p>
            </div>
          </div>
        </div>
      </div>
      
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
                          toast({
                            title: "Location Selected",
                            description: `You've selected ${location.name} for carry out.`,
                          });
                          navigate('/menu');
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
                          toast({
                            title: "Delivery Location Selected",
                            description: `You've selected delivery to your address.`,
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
    </section>
  );
};

export default HeroSection;
