
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
      <div className="relative overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-50 blur-xl"></div>
        <TabsList className="relative overflow-x-auto flex flex-wrap justify-center backdrop-blur-md p-2 rounded-xl border border-white/10 shadow-lg no-scrollbar z-10 bg-black/5">
          <TabsTrigger 
            value="all" 
            className="px-6 py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=inactive]:bg-background/40 data-[state=inactive]:hover:bg-background/60 transition-all duration-300"
          >
            All
          </TabsTrigger>
          {menuCategories.map(category => (
            <TabsTrigger 
              key={category.id} 
              value={category.id} 
              className="px-6 py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=inactive]:bg-background/40 data-[state=inactive]:hover:bg-background/60 transition-all duration-300"
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
