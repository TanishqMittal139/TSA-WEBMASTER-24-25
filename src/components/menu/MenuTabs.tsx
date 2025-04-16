
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
      <TabsList className="mb-8 flex flex-wrap justify-center bg-background/20 backdrop-blur-md p-2 rounded-xl border border-white/10 shadow-lg overflow-x-auto no-scrollbar">
        <TabsTrigger 
          value="all" 
          className="px-6 py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-background/40 data-[state=inactive]:hover:bg-background/60 transition-all duration-300"
        >
          All
        </TabsTrigger>
        {menuCategories.map(category => (
          <TabsTrigger 
            key={category.id} 
            value={category.id} 
            className="px-6 py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-background/40 data-[state=inactive]:hover:bg-background/60 transition-all duration-300"
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
      
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
