
import { motion } from 'framer-motion';
import { Heart, ImageOff } from 'lucide-react';
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
  
  // Set of smaller, optimized placeholder images that work well with resizing
  const fallbackImages = [
    "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&auto=format&fit=crop"
  ];
  
  // Randomly select a fallback image
  const randomFallback = () => fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  
  // Use a fallback image if the original image fails to load
  const handleImageError = () => {
    console.log("Image failed to load:", imageUrl);
    setImageError(true);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative h-full w-full rounded-lg overflow-hidden"
    >
      {!imageError ? (
        <BlurImage
          src={imageUrl || '/placeholder.svg'}
          alt={name}
          className="object-cover h-full w-full"
          onError={handleImageError}
        />
      ) : (
        <BlurImage
          src={randomFallback()}
          alt={name}
          className="object-cover h-full w-full"
        />
      )}
      
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
