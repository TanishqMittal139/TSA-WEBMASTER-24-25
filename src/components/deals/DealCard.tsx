
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Tag, ArrowRight, ImageOff } from 'lucide-react';
import { DealData } from '@/pages/Deals';
import BlurImage from '@/components/ui/blur-image';

interface DealCardProps {
  deal: DealData;
  onActivate: (deal: DealData) => void;
}

const DealCard: React.FC<DealCardProps> = ({ deal, onActivate }) => {
  const [imageError, setImageError] = useState(false);
  
  // Fallback image in case the deal image fails to load
  const fallbackImage = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop";
  
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48">
        {imageError ? (
          <div className="w-full h-full bg-muted flex flex-col items-center justify-center">
            <ImageOff size={32} className="text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Image not available</p>
          </div>
        ) : (
          <BlurImage 
            src={deal.image || fallbackImage}
            alt={deal.title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        )}
        {deal.isPopular && (
          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
            Popular
          </Badge>
        )}
      </div>
      <CardContent className="flex-1 flex flex-col p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold">{deal.title}</h3>
          <Badge variant="outline" className="text-sm font-bold">
            {deal.discount}
          </Badge>
        </div>
        <p className="text-muted-foreground mb-4 flex-1">{deal.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarDays size={16} className="mr-1" />
            <span>Valid until {new Date(deal.validUntil).toLocaleDateString()}</span>
          </div>
        </div>
        <Button
          className="w-full mt-4"
          onClick={() => onActivate(deal)}
        >
          <Tag size={16} className="mr-2" />
          Use Deal
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default DealCard;
