
import { Badge } from '@/components/ui/badge';
import { MenuItem } from '@/types/menu';

interface DietaryBadgesProps {
  dish: MenuItem;
}

const DietaryBadges = ({ dish }: DietaryBadgesProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {dish.vegetarian && (
        <Badge variant="outline" className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-200">
          Vegetarian
        </Badge>
      )}
      
      {dish.vegan && (
        <Badge variant="outline" className="bg-green-600/10 text-green-700 hover:bg-green-600/20 border-green-200">
          Vegan
        </Badge>
      )}
      
      {dish.glutenFree && (
        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20 border-yellow-200">
          Gluten-Free
        </Badge>
      )}
      
      {dish.cuisineType && (
        <Badge variant="outline" className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-blue-200">
          {dish.cuisineType} Cuisine
        </Badge>
      )}
    </div>
  );
};

export default DietaryBadges;
