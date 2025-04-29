
import React from 'react';
import { useCart, DeliveryMethod } from '@/context/CartContext';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Truck, ShoppingBag } from 'lucide-react';

const DeliveryMethodSelector = () => {
  const { deliveryMethod, setDeliveryMethod, setSelectedLocationId } = useCart();

  const handleMethodChange = (value: DeliveryMethod) => {
    setDeliveryMethod(value);
    
    // Reset selected location if switching to delivery
    if (value === 'delivery') {
      setSelectedLocationId(null);
    }
  };

  return (
    <Card className="p-4 mb-6">
      <h3 className="font-medium mb-4">How would you like to receive your order?</h3>
      
      <RadioGroup 
        value={deliveryMethod} 
        onValueChange={(value) => handleMethodChange(value as DeliveryMethod)}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="flex items-start space-x-2 bg-background border border-input rounded-md p-3 cursor-pointer hover:bg-accent transition-colors flex-1">
          <RadioGroupItem value="delivery" id="delivery" className="mt-1" />
          <div className="flex-1">
            <Label htmlFor="delivery" className="flex items-center cursor-pointer">
              <Truck className="mr-2 h-5 w-5" />
              <span className="font-medium">Delivery</span>
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              We'll bring the food to your location
            </p>
            <p className="text-sm font-medium mt-1">
              $3.99 delivery fee
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-2 bg-background border border-input rounded-md p-3 cursor-pointer hover:bg-accent transition-colors flex-1">
          <RadioGroupItem value="carryout" id="carryout" className="mt-1" />
          <div className="flex-1">
            <Label htmlFor="carryout" className="flex items-center cursor-pointer">
              <ShoppingBag className="mr-2 h-5 w-5" />
              <span className="font-medium">Carryout</span>
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Pick up your order at one of our locations
            </p>
            <p className="text-sm font-medium mt-1">
              No additional fee
            </p>
          </div>
        </div>
      </RadioGroup>
    </Card>
  );
};

export default DeliveryMethodSelector;
