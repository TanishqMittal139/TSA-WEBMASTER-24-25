
import React from 'react';
import { Heart, MapPin, Phone, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface LocationCardProps {
  location: {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    rating: number;
    reviewCount: number;
    image: string;
  };
  isActive: boolean;
  isFavorite: boolean;
  onSelect: () => void;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

const LocationCard: React.FC<LocationCardProps> = ({
  location,
  isActive,
  isFavorite,
  onSelect,
  onToggleFavorite
}) => {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md border",
        isActive ? "border-primary" : "border-border"
      )}
      onClick={onSelect}
    >
      <div className="flex">
        <div className="w-1/3">
          <img 
            src={location.image} 
            alt={location.name}
            className="h-full w-full object-cover aspect-square rounded-l-lg" // Added rounded-l-lg
          />
        </div>
        <div className="w-2/3 p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">{location.name}</h3>
            <button
              onClick={onToggleFavorite}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Heart 
                size={18} 
                className={isFavorite ? "fill-primary text-primary" : ""} 
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
            <span>({location.reviewCount} reviews)</span>
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
  );
};

export default LocationCard;

