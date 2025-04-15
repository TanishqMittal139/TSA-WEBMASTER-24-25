
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
    <Card>
      <CardHeader>
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
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img 
              src={location.image}
              alt={location.name}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />
            
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <p>{location.phone}</p>
              </div>
              
              <div className="flex items-start space-x-2">
                <Info size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Features</p>
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
          
          <div>
            <div className="flex items-start space-x-2 mb-4">
              <Clock size={18} className="text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-grow">
                <p className="font-medium mb-2">Hours of Operation</p>
                <div className="space-y-1">
                  {Object.entries(location.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between text-sm">
                      <span>{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                      <span>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${location.coordinates[1]},${location.coordinates[0]}`, '_blank')}
              >
                Get Directions
              </Button>
              <Button onClick={() => navigate('/reservations', { state: { locationId: location.id } })}>
                Make a Reservation
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationDetails;
