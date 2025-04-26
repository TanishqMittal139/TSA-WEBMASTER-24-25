
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface LocationSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  className?: string; // Added optional className prop
}

const LocationSearch: React.FC<LocationSearchProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  className 
}) => {
  return (
    <div className={cn("relative", className)}>
      <Input
        type="search"
        placeholder="Search by city, zip code, or location name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </div>
  );
};

export default LocationSearch;
