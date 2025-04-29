
import React from 'react';
import { useCart } from '@/context/CartContext';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { locations } from '@/data/locations';
import { MapPin } from 'lucide-react';

const LocationSelector = () => {
  const { deliveryMethod, selectedLocationId, setSelectedLocationId } = useCart();
  
  // Only show this component if carryout is selected
  if (deliveryMethod !== 'carryout') {
    return null;
  }
  
  return (
    <Card className="p-4 mb-6">
      <h3 className="font-medium mb-4 flex items-center">
        <MapPin className="mr-2 h-5 w-5 text-primary" />
        Select Pickup Location
      </h3>
      
      <Select 
        value={selectedLocationId || ''} 
        onValueChange={(value) => setSelectedLocationId(value || null)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a location for pickup" />
        </SelectTrigger>
        <SelectContent>
          {locations.map((location) => (
            <SelectItem key={location.id} value={location.id}>
              {location.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {selectedLocationId && (
        <div className="mt-4 text-sm">
          {(() => {
            const location = locations.find(loc => loc.id === selectedLocationId);
            if (!location) return null;
            
            return (
              <div>
                <p className="font-medium">{location.name}</p>
                <p className="text-muted-foreground">{location.address}</p>
                <p className="text-muted-foreground mt-2">Phone: {location.phone}</p>
                <p className="text-muted-foreground mt-1">Hours: {location.hours}</p>
              </div>
            );
          })()}
        </div>
      )}
    </Card>
  );
};

export default LocationSelector;
