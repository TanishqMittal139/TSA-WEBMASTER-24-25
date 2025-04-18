
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
    <div className="mb-8">
      <div className="bg-background/60 backdrop-blur-md rounded-xl p-4 border border-border shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search our menu..."
              className="pl-9 h-10"
              value={searchTerm}
              onChange={onSearchChange}
            />
            {searchTerm && (
              <button 
                onClick={() => onSearchChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <XCircle size={16} />
              </button>
            )}
          </div>
          
          <div className="flex gap-3">
            <Select value={dietaryFilter} onValueChange={onDietaryFilterChange}>
              <SelectTrigger className="w-[180px] h-10">
                <SelectValue placeholder="Dietary" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_dietary">All Dietary</SelectItem>
                {dietaryTags.map(tag => (
                  <SelectItem key={tag.id} value={tag.id}>
                    {tag.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={cuisineFilter} onValueChange={onCuisineFilterChange}>
              <SelectTrigger className="w-[180px] h-10">
                <SelectValue placeholder="Cuisine" />
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
          
          {isFilterActive && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearFilters}
              className="md:self-center"
            >
              <XCircle size={14} className="mr-1" />
              Clear filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
