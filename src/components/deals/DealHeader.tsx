
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Tag } from 'lucide-react';
import { DealData } from '@/pages/Deals';
import { useNavigate } from 'react-router-dom';

interface DealHeaderProps {
  deal: DealData;
}

const DealHeader: React.FC<DealHeaderProps> = ({ deal }) => {
  const navigate = useNavigate();

  return (
    <>
      <Button 
        variant="ghost" 
        onClick={() => navigate('/deals')}
        className="mb-6 flex items-center"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Deals
      </Button>
      
      <h1 className="text-3xl font-bold mb-4">Apply Your Deal</h1>
      
      <div className="bg-primary/10 rounded-lg p-4 mb-8">
        <div className="flex items-start gap-4">
          <div className="bg-primary text-primary-foreground rounded-full p-2">
            <Tag size={20} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{deal.title}</h2>
            <p className="text-muted-foreground">{deal.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealHeader;

