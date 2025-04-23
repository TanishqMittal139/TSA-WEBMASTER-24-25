
import React from "react";
import SearchFilters from "@/components/menu/SearchFilters";
import MenuTabs from "@/components/menu/MenuTabs";
import { MenuItem } from "@/types/menu";

interface MenuMainProps {
  searchTerm: string;
  dietaryFilter: string;
  cuisineFilter: string;
  isFilterActive: boolean;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDietaryFilterChange: (value: string) => void;
  onCuisineFilterChange: (value: string) => void;
  onClearFilters: () => void;
  activeCategory: string;
  displayedMeals: MenuItem[];
  onCategoryChange: (value: string) => void;
}

const MenuMain: React.FC<MenuMainProps> = ({
  searchTerm,
  dietaryFilter,
  cuisineFilter,
  isFilterActive,
  onSearchChange,
  onDietaryFilterChange,
  onCuisineFilterChange,
  onClearFilters,
  activeCategory,
  displayedMeals,
  onCategoryChange,
}) => (
  <div className="container mx-auto px-4 py-12">
    <SearchFilters
      searchTerm={searchTerm}
      dietaryFilter={dietaryFilter}
      cuisineFilter={cuisineFilter}
      isFilterActive={isFilterActive}
      onSearchChange={onSearchChange}
      onDietaryFilterChange={onDietaryFilterChange}
      onCuisineFilterChange={onCuisineFilterChange}
      onClearFilters={onClearFilters}
    />

    <MenuTabs
      activeCategory={activeCategory}
      displayedMeals={displayedMeals}
      onCategoryChange={onCategoryChange}
      onClearFilters={onClearFilters}
    />
  </div>
);

export default MenuMain;
