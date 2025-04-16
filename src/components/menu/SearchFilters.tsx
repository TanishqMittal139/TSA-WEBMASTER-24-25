
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, XCircle } from 'lucide-react';
import { dietaryTags, cuisineTypes } from '@/data/menu-data';

interface SearchFiltersProps {
  searchTerm: string;
  dietaryFilter: string;
  cuisineFilter: string;
  isFilterActive: boolean;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDietaryFilterChange: (value: string) => void;
  onCuisineFilterChange: (value: string) => void;
  onClearFilters: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  dietaryFilter,
  cuisineFilter,
  isFilterActive,
  onSearchChange,
  onDietaryFilterChange,
  onCuisineFilterChange,
  onClearFilters,
}) => {
  return (
    <div className="relative mb-8 overflow-hidden">
      <div className="glass-card animate-fade-in dark:bg-black/20 bg-white/30 p-8 rounded-2xl backdrop-blur-md border border-white/20 dark:border-white/10">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
        
        {/* Search and filter section */}
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search our menu..."
                className="pl-10 bg-background/50 backdrop-blur h-12 border-primary/20 focus:border-primary transition-all"
                value={searchTerm}
                onChange={onSearchChange}
              />
              {searchTerm && (
                <button 
                  onClick={() => onSearchChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <XCircle size={18} />
                </button>
              )}
            </div>
            
            <Button 
              variant={isFilterActive ? "default" : "outline"}
              size="lg"
              className="flex items-center gap-2 min-w-[120px] h-12 transition-all duration-300 hover:scale-105"
              onClick={isFilterActive ? onClearFilters : undefined}
            >
              {isFilterActive ? (
                <>
                  <XCircle size={16} />
                  <span>Clear</span>
                </>
              ) : (
                <>
                  <Filter size={16} />
                  <span>Filter</span>
                </>
              )}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select value={dietaryFilter} onValueChange={onDietaryFilterChange}>
              <SelectTrigger className="h-12 bg-background/50 backdrop-blur border-primary/20 hover:border-primary transition-all">
                <SelectValue placeholder="Dietary Preference" />
              </SelectTrigger>
              <SelectContent className="bg-background/95 backdrop-blur-lg border-primary/20">
                <SelectItem value="all_dietary">All Dietary Preferences</SelectItem>
                {dietaryTags.map(tag => (
                  <SelectItem key={tag.id} value={tag.id} className="hover:bg-primary/10">
                    {tag.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={cuisineFilter} onValueChange={onCuisineFilterChange}>
              <SelectTrigger className="h-12 bg-background/50 backdrop-blur border-primary/20 hover:border-primary transition-all">
                <SelectValue placeholder="Cuisine Type" />
              </SelectTrigger>
              <SelectContent className="bg-background/95 backdrop-blur-lg border-primary/20">
                <SelectItem value="all_cuisines">All Cuisines</SelectItem>
                {cuisineTypes.map(cuisine => (
                  <SelectItem key={cuisine.id} value={cuisine.id} className="hover:bg-primary/10">
                    {cuisine.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
