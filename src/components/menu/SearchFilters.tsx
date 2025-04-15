
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
    <div className="mb-8 space-y-4 glass-card dark:bg-black/20 bg-white/30 p-6 rounded-xl backdrop-blur-md border border-white/20 dark:border-white/10 animate-scale-in">
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search our menu..."
            className="pl-10 bg-background/50 backdrop-blur border-primary/20 focus:border-primary transition-all"
            value={searchTerm}
            onChange={onSearchChange}
          />
          {searchTerm && (
            <button 
              onClick={() => onSearchChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)}
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <XCircle size={18} />
            </button>
          )}
        </div>
        
        <Button 
          variant={isFilterActive ? "default" : "outline"} 
          className="flex items-center gap-2 min-w-[120px]"
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <Select value={dietaryFilter} onValueChange={onDietaryFilterChange}>
            <SelectTrigger className="bg-background/50 backdrop-blur border-primary/20 hover:border-primary transition-all">
              <SelectValue placeholder="Dietary Preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_dietary">All Dietary Preferences</SelectItem>
              {dietaryTags.map(tag => (
                <SelectItem key={tag.id} value={tag.id}>
                  {tag.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select value={cuisineFilter} onValueChange={onCuisineFilterChange}>
            <SelectTrigger className="bg-background/50 backdrop-blur border-primary/20 hover:border-primary transition-all">
              <SelectValue placeholder="Cuisine Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_cuisines">All Cuisines</SelectItem>
              {cuisineTypes.map(cuisine => (
                <SelectItem key={cuisine.id} value={cuisine.id}>
                  {cuisine.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
