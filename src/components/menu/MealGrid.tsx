
import React from 'react';
import { MenuItem } from '@/data/menu-data';
import MealCard from './MealCard';
import NoResults from './NoResults';

interface MealGridProps {
  meals: MenuItem[];
  onClearFilters: () => void;
}

const MealGrid: React.FC<MealGridProps> = ({ meals, onClearFilters }) => {
  if (meals.length === 0) {
    return <NoResults clearFilters={onClearFilters} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {meals.map((meal, index) => (
        <div 
          key={meal.id}
          className={`transition-all duration-500 animate-fade-in`}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <MealCard meal={meal} />
        </div>
      ))}
    </div>
  );
};

export default MealGrid;
