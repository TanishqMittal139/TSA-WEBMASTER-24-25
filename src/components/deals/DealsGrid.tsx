
import React from 'react';
import { DealData } from '@/pages/Deals';
import DealCard from './DealCard';

interface DealsGridProps {
  deals: DealData[];
  onActivateDeal: (deal: DealData) => void;
}

const DealsGrid: React.FC<DealsGridProps> = ({ deals, onActivateDeal }) => {
  return deals.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {deals.map(deal => (
        <DealCard 
          key={deal.id} 
          deal={deal} 
          onActivate={onActivateDeal}
        />
      ))}
    </div>
  ) : (
    <div className="text-center py-8">
      <p className="text-muted-foreground">No current deals available.</p>
    </div>
  );
};

export default DealsGrid;
