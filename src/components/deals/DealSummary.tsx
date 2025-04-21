
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart } from 'lucide-react';
import { MenuItem } from '@/types/menu';
import { DealData } from '@/pages/Deals';

interface DealSummaryProps {
  selectedItems: MenuItem[];
  deal: DealData;
  total: number;
  onAddToCart: () => void;
  isValid: boolean;
  validationMessage?: string;
}

const DealSummary: React.FC<DealSummaryProps> = ({
  selectedItems,
  deal,
  total,
  onAddToCart,
  isValid,
  validationMessage
}) => {
  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const isSideItem = (item: MenuItem) => 
    item.category === 'sides' || item.tags?.includes('soup') || item.tags?.includes('salad');

  return (
    <div className="bg-card rounded-xl shadow-md p-6 sticky top-24">
      <h3 className="text-xl font-semibold mb-4">Your Selection</h3>
      
      {selectedItems.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          Select items to apply your {deal.discount} discount
        </p>
      ) : (
        <>
          <div className="space-y-4 mb-4">
            {selectedItems.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0 mr-3">
                    <img src={item.imageUrl || item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <Badge variant="outline" className="text-xs">{item.category}</Badge>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  {deal.id === 'lunch-special' && isSideItem(item) ? (
                    <>
                      <span className="line-through text-muted-foreground text-xs">{formatPrice(item.price)}</span>
                      <span className="text-primary font-medium">FREE</span>
                    </>
                  ) : (
                    <span>{formatPrice(item.price)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          
          {!isValid && validationMessage && (
            <p className="text-sm text-muted-foreground mt-4">
              {validationMessage}
            </p>
          )}
        </>
      )}
      
      <Button
        className="w-full mt-6"
        size="lg"
        onClick={onAddToCart}
        disabled={!isValid}
      >
        <ShoppingCart size={18} className="mr-2" />
        Add to Cart
      </Button>
      
      <p className="text-center text-xs text-muted-foreground mt-4">
        Deal code: <span className="font-mono">{deal.code}</span>
      </p>
    </div>
  );
};

export default DealSummary;
