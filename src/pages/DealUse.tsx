
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/ui/navbar';
import Footer from '../components/ui/footer';
import DealHeader from '@/components/deals/DealHeader';
import DealMenuItems from '@/components/deals/DealMenuItems';
import DealSummary from '@/components/deals/DealSummary';
import { useDealLogic } from '@/hooks/use-deal-logic';
import { toast } from '@/components/ui/use-toast';

const DealUse: React.FC = () => {
  const { dealId } = useParams<{ dealId: string }>();
  const navigate = useNavigate();
  const {
    deal,
    selectedItems,
    filteredItems,
    categorizedItems,
    handleItemSelect,
    handleAddToCart,
    calculateTotal,
    getValidationMessage,
    isValid
  } = useDealLogic(dealId);
  
  useEffect(() => {
    // Handle the case where lunch-special deal is requested but no longer available
    if (dealId === 'lunch-special') {
      toast({
        title: "Deal Unavailable",
        description: "The Lunch Special deal is no longer available. Please select another deal.",
        variant: "destructive"
      });
      navigate('/deals');
    }
  }, [dealId, navigate]);
  
  if (!deal) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-16 pt-24">
          <div className="text-center">Loading deal...</div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const renderItemsByCategory = () => {
    if (deal.id === 'breakfast-bundle') {
      return (
        <>
          {categorizedItems.breakfast.length > 0 && (
            <DealMenuItems
              items={categorizedItems.breakfast}
              selectedItems={selectedItems}
              onItemSelect={handleItemSelect}
              title="Select a Breakfast Item"
            />
          )}
          
          {categorizedItems.coffee.length > 0 && (
            <DealMenuItems
              items={categorizedItems.coffee}
              selectedItems={selectedItems}
              onItemSelect={handleItemSelect}
              title="Select a Coffee"
            />
          )}
        </>
      );
    }
    
    return (
      <DealMenuItems
        items={filteredItems}
        selectedItems={selectedItems}
        onItemSelect={handleItemSelect}
        title="Select Items for Your Deal"
      />
    );
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        <DealHeader deal={deal} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              {deal.id === 'happy-hour' && (
                <p className="text-sm text-muted-foreground mb-4">
                  Select ONE beverage for 20% off Monday through Friday
                </p>
              )}
              
              {deal.id === 'breakfast-bundle' && (
                <p className="text-sm text-muted-foreground mb-4">
                  Select a breakfast item and coffee for 15% off
                </p>
              )}
              
              {renderItemsByCategory()}
            </div>
          </div>
          
          <div>
            <DealSummary
              selectedItems={selectedItems}
              deal={deal}
              total={calculateTotal()}
              onAddToCart={handleAddToCart}
              isValid={isValid()}
              validationMessage={getValidationMessage()}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DealUse;
