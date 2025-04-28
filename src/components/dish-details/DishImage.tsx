import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BlurImage from '@/components/ui/blur-image';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface DishImageProps {
  imageUrl: string;
  name: string;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

const DishImage = ({ imageUrl, name, isFavorite, onFavoriteToggle }: DishImageProps) => {
  console.log("DishImage rendering with image URL:", imageUrl);
  const [imageError, setImageError] = useState(false);
  
  const categoryFallbacks: Record<string, string> = {
    entrees: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&auto=format&fit=crop",
    sides: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop",
    desserts: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&auto=format&fit=crop",
    beverages: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop",
    breakfast: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&auto=format&fit=crop",
    lunch: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop",
    dinner: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&auto=format&fit=crop"
  };
  
  const reliableImages = [
    "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800&auto=format&fit=crop"
  ];

  const randomFallback = () => reliableImages[Math.floor(Math.random() * reliableImages.length)];
  
  const getProcessedImageUrl = (url: string): string => {
    if (url && url.includes('unsplash.com') && !url.includes('w=')) {
      return `${url}?w=800&auto=format&fit=crop`;
    }
    return url;
  };
  
  const handleImageError = () => {
    console.log("Image failed to load:", imageUrl);
    setImageError(true);
  };
  
  const getFinalImageUrl = (): string => {
    if (imageError) {
      const urlParts = imageUrl.split('/');
      const possibleCategory = urlParts[urlParts.length - 2];
      
      if (possibleCategory && categoryFallbacks[possibleCategory.toLowerCase()]) {
        return categoryFallbacks[possibleCategory.toLowerCase()];
      }
      
      return randomFallback();
    }
    
    return getProcessedImageUrl(imageUrl);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative h-full w-full rounded-lg overflow-hidden"
    >
      <BlurImage
        src={getFinalImageUrl()}
        alt={name}
        className="object-cover h-full w-full"
        onError={handleImageError}
      />
      
      <Button 
        variant="outline" 
        size="icon" 
        className={cn(
          "absolute top-4 right-4 bg-background/80 hover:bg-background",
          isFavorite && "bg-primary/10 border-primary text-primary"
        )}
        onClick={onFavoriteToggle}
      >
        <Heart className={cn("h-5 w-5", isFavorite && "fill-primary")} />
      </Button>
    </motion.div>
  );
};

export default DishImage;
