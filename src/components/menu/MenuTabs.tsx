
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { menuCategories } from '@/data/menu-data';
import MealGrid from './MealGrid';
import { MenuItem } from '@/data/menu-data';

interface MenuTabsProps {
  activeCategory: string;
  displayedMeals: MenuItem[];
  onCategoryChange: (value: string) => void;
  onClearFilters: () => void;
}

const MenuTabs: React.FC<MenuTabsProps> = ({
  activeCategory,
  displayedMeals,
  onCategoryChange,
  onClearFilters,
}) => {
  return (
    <Tabs value={activeCategory} onValueChange={onCategoryChange} className="mb-12">
      <TabsList className="mb-8 flex flex-wrap bg-background/20 backdrop-blur-md p-2 rounded-xl border border-white/10 shadow-lg">
        <TabsTrigger 
          value="all" 
          className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
        >
          All
        </TabsTrigger>
        {menuCategories.map(category => (
          <TabsTrigger 
            key={category.id} 
            value={category.id} 
            className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
      
      <TabsContent value="all" className="animate-fade-in">
        <MealGrid meals={displayedMeals} onClearFilters={onClearFilters} />
      </TabsContent>
      
      {menuCategories.map(category => (
        <TabsContent key={category.id} value={category.id} className="animate-fade-in">
          <MealGrid meals={displayedMeals} onClearFilters={onClearFilters} />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default MenuTabs;
