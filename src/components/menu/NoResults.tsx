
import React from 'react';
import { Button } from '@/components/ui/button';

interface NoResultsProps {
  clearFilters: () => void;
}

const NoResults: React.FC<NoResultsProps> = ({ clearFilters }) => {
  return (
    <div className="text-center py-16 animate-fade-in col-span-3">
      <div className="mb-4 text-6xl">🍽️</div>
      <p className="text-xl text-muted-foreground mb-4">No items match your current filters.</p>
      <Button variant="default" onClick={clearFilters} className="mt-4 px-6">
        Clear Filters
      </Button>
    </div>
  );
};

export default NoResults;
