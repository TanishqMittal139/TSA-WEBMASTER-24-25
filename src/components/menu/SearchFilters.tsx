
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
import { Search, Filter, XCircle, Sparkles } from 'lucide-react';
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
    <div className="mb-8 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl blur-3xl -z-10"></div>
      
      <div className="glass-card animate-fade-in rounded-2xl backdrop-blur-md border border-white/20 dark:border-white/10 p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="flex items-center gap-2 mb-5">
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          <h3 className="text-lg font-medium">Find Your Perfect Meal</h3>
        </div>
        
        {/* Search and filter section */}
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              <Input
                placeholder="Search our menu..."
                className="pl-10 bg-background/50 backdrop-blur h-12 border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary transition-all rounded-xl"
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
              
              <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/30 rounded-xl pointer-events-none transition-all duration-300"></div>
            </div>
            
            <Button 
              variant={isFilterActive ? "default" : "outline"}
              size="lg"
              className={`flex items-center gap-2 min-w-[120px] h-12 transition-all duration-300 hover:scale-105 rounded-xl
                ${isFilterActive ? "bg-primary text-primary-foreground" : "bg-background/50 backdrop-blur border-primary/20 hover:border-primary/60"}`}
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
            <div className="relative group">
              <Select value={dietaryFilter} onValueChange={onDietaryFilterChange}>
                <SelectTrigger className="h-12 bg-background/50 backdrop-blur border-primary/20 hover:border-primary transition-all rounded-xl">
                  <SelectValue placeholder="Dietary Preference" />
                </SelectTrigger>
                <SelectContent className="bg-background/95 backdrop-blur-lg border-primary/20 rounded-xl">
                  <SelectItem value="all_dietary">All Dietary Preferences</SelectItem>
                  {dietaryTags.map(tag => (
                    <SelectItem key={tag.id} value={tag.id} className="hover:bg-primary/10">
                      {tag.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/30 rounded-xl pointer-events-none transition-all duration-300"></div>
            </div>
            
            <div className="relative group">
              <Select value={cuisineFilter} onValueChange={onCuisineFilterChange}>
                <SelectTrigger className="h-12 bg-background/50 backdrop-blur border-primary/20 hover:border-primary transition-all rounded-xl">
                  <SelectValue placeholder="Cuisine Type" />
                </SelectTrigger>
                <SelectContent className="bg-background/95 backdrop-blur-lg border-primary/20 rounded-xl">
                  <SelectItem value="all_cuisines">All Cuisines</SelectItem>
                  {cuisineTypes.map(cuisine => (
                    <SelectItem key={cuisine.id} value={cuisine.id} className="hover:bg-primary/10">
                      {cuisine.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/30 rounded-xl pointer-events-none transition-all duration-300"></div>
            </div>
          </div>
          
          {isFilterActive && (
            <div className="w-full flex justify-center">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClearFilters}
                className="text-sm text-primary/80 hover:text-primary hover:bg-primary/5 transition-colors"
              >
                <XCircle size={14} className="mr-1" />
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
