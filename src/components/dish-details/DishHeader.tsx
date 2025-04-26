
import { Star, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { MenuItem } from '@/types/menu';

interface DishHeaderProps {
  dish: MenuItem;
}

const DishHeader = ({ dish }: DishHeaderProps) => {
  return (
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center space-x-2 mb-2">
          {dish.tags?.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <h1 className="text-3xl font-bold mb-2">{dish.name}</h1>
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
          {dish.rating && (
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span>{dish.rating}/5</span>
            </div>
          )}
          
          {dish.preparationTime && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{dish.preparationTime}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="text-2xl font-bold text-primary">${dish.price.toFixed(2)}</div>
    </div>
  );
};

export default DishHeader;
