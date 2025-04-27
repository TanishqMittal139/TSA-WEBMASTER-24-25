
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BlurImage from '@/components/ui/blur-image';
import { cn } from '@/lib/utils';

interface DishImageProps {
  imageUrl: string;
  name: string;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

const DishImage = ({ imageUrl, name, isFavorite, onFavoriteToggle }: DishImageProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative h-full w-full rounded-lg overflow-hidden"
    >
      <BlurImage
        src={imageUrl || '/placeholder.svg'}
        alt={name}
        className="object-cover h-full w-full"
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
