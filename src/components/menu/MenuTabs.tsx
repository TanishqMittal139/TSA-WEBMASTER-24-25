
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
      <div className="relative mb-8">
        <TabsList className="flex flex-wrap justify-center p-1 bg-background/60 backdrop-blur-sm rounded-lg border border-border">
          <TabsTrigger 
            value="all" 
            className="px-4 py-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            All Items
          </TabsTrigger>
          {menuCategories.map(category => (
            <TabsTrigger 
              key={category.id} 
              value={category.id} 
              className="px-4 py-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      
      <div className="relative">
        <TabsContent value="all" className="animate-fade-in duration-500">
          <MealGrid meals={displayedMeals} onClearFilters={onClearFilters} />
        </TabsContent>
        
        {menuCategories.map(category => (
          <TabsContent key={category.id} value={category.id} className="animate-fade-in duration-500">
            <MealGrid meals={displayedMeals} onClearFilters={onClearFilters} />
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

export default MenuTabs;
