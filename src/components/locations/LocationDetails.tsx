
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Heart, Info, MapPin, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface LocationDetailsProps {
  location: {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    image: string;
    hours: {
      [key: string]: string;
    };
    features: string[];
    coordinates: [number, number];
  };
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({
  location,
  isFavorite,
  onToggleFavorite,
}) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden shadow-md">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle>{location.name}</CardTitle>
          <Button
            variant={isFavorite ? "default" : "outline"}
            size="sm"
            onClick={onToggleFavorite}
            className="flex items-center gap-1"
          >
            <Heart size={16} className={isFavorite ? "fill-primary-foreground" : ""} />
            {isFavorite ? "Saved" : "Save"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="rounded-lg overflow-hidden">
              <img 
                src={location.image}
                alt={location.name}
                className="w-full h-60 object-cover"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin size={18} className="text-primary mt-1 flex-shrink-0" />
                <span>{location.address}, {location.city}, {location.state} {location.zip}</span>
              </div>
              
              <div className="flex items-start gap-2">
                <Phone size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span>{location.phone}</span>
              </div>
              
              <div className="flex items-start gap-2">
                <Info size={18} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-2">Features</p>
                  <div className="flex flex-wrap gap-2">
                    {location.features.map((feature, index) => (
                      <span key={index} className="text-xs bg-secondary px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start gap-2">
              <Clock size={18} className="text-primary mt-1 flex-shrink-0" />
              <div className="w-full">
                <p className="font-medium mb-2">Hours of Operation</p>
                <div className="space-y-2 w-full">
                  <div className="flex justify-between text-sm">
                    <span>Monday - Friday</span>
                    <span>7:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Saturday</span>
                    <span>7:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Sunday</span>
                    <span>8:30 AM - 9:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 justify-end mt-auto pt-4">
              <Button 
                onClick={() => navigate('/reservations', { state: { locationId: location.id } })}
                className="w-full"
              >
                Make a Reservation
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${location.coordinates[1]},${location.coordinates[0]}`, '_blank')}
                className="w-full"
              >
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationDetails;
