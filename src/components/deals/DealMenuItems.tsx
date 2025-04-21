import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { MenuItem } from '@/types/menu';

interface DealMenuItemsProps {
  items: MenuItem[];
  selectedItems: MenuItem[];
  onItemSelect: (item: MenuItem) => void;
  title: string;
  showFreeLabel?: boolean;
}

const DealMenuItems: React.FC<DealMenuItemsProps> = ({ 
  items, 
  selectedItems, 
  onItemSelect, 
  title,
  showFreeLabel = false
}) => {
  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(item => (
          <Card 
            key={item.id} 
            className={`cursor-pointer transition-all ${
              selectedItems.some(i => i.id === item.id) 
                ? 'ring-2 ring-primary' 
                : 'hover:border-primary/50'
            }`}
            onClick={() => onItemSelect(item)}
          >
            <CardContent className="p-0">
              <div className="relative h-40 w-full">
                <img 
                  src={item.imageUrl || item.image} 
                  alt={item.name} 
                  className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                />
                {selectedItems.some(i => i.id === item.id) && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                    <Check size={16} />
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{item.name}</h4>
                  <div className="flex flex-col items-end">
                    <span className={selectedItems.some(i => i.id === item.id) ? "line-through text-muted-foreground text-sm" : ""}>
                      {formatPrice(item.price)}
                    </span>
                    {selectedItems.some(i => i.id === item.id) && showFreeLabel && (
                      <span className="text-primary font-medium">FREE</span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <Badge variant="outline" className="mt-2">{item.category}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DealMenuItems;
