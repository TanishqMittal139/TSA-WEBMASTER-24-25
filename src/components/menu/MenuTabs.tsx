
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
      <TabsList className="mb-8 flex flex-wrap bg-background/20 backdrop-blur-md p-1 rounded-xl border border-white/10">
        <TabsTrigger 
          value="all" 
          className="px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          All
        </TabsTrigger>
        {menuCategories.map(category => (
          <TabsTrigger 
            key={category.id} 
            value={category.id} 
            className="px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
      
      <TabsContent value="all">
        <MealGrid meals={displayedMeals} onClearFilters={onClearFilters} />
      </TabsContent>
      
      {menuCategories.map(category => (
        <TabsContent key={category.id} value={category.id}>
          <MealGrid meals={displayedMeals} onClearFilters={onClearFilters} />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default MenuTabs;
