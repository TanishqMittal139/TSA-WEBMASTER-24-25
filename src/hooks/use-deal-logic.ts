import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { DealData } from '@/pages/Deals';
import { MenuItem } from '@/types/menu';
import { getAllMeals } from '@/data/menu';

export const useDealLogic = (dealId: string | undefined) => {
  const navigate = useNavigate();
  const [deal, setDeal] = useState<DealData | null>(null);
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [categorizedItems, setCategorizedItems] = useState<{
    sandwiches: MenuItem[];
    sides: MenuItem[];
    coffee: MenuItem[];
    breakfast: MenuItem[];
    other: MenuItem[];
  }>({
    sandwiches: [],
    sides: [],
    coffee: [],
    breakfast: [],
    other: []
  });
  
  const { user, session } = useAuth();
  const { addItem, items } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (!user || !session) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to use deals",
        variant: "destructive"
      });
      navigate('/sign-in', { state: { redirectTo: '/deals' } });
      return;
    }
    
    const activeDeal = localStorage.getItem('active_deal');
    if (!activeDeal) {
      toast({
        title: "No Active Deal",
        description: "Please select a deal first",
        variant: "destructive"
      });
      navigate('/deals');
      return;
    }
    
    const parsedDeal = JSON.parse(activeDeal);
    setDeal(parsedDeal);
    
    const menuItems = getAllMeals();
    
    if (parsedDeal.appliesTo === 'all') {
      setFilteredItems(menuItems);
    } else if (parsedDeal.appliesTo === 'category' && parsedDeal.categories) {
      setFilteredItems(menuItems.filter(item => 
        parsedDeal.categories?.includes(item.category.toLowerCase())
      ));
    } else if (parsedDeal.appliesTo === 'specific' && parsedDeal.items) {
      setFilteredItems(menuItems.filter(item => 
        parsedDeal.items?.includes(item.id)
      ));
    }

    if (parsedDeal.id === 'lunch-special') {
      const sandwiches = menuItems.filter(item => 
        item.tags?.includes('sandwich') || item.name.toLowerCase().includes('sandwich')
      );
      
      const sides = menuItems.filter(item => 
        item.category === 'sides' || item.tags?.includes('soup') || item.tags?.includes('salad')
      );
      
      const other = menuItems.filter(item => 
        !sandwiches.some(s => s.id === item.id) && 
        !sides.some(s => s.id === item.id) &&
        parsedDeal.categories?.includes(item.category.toLowerCase())
      );
      
      setCategorizedItems({
        sandwiches,
        sides,
        other,
        breakfast: [],
        coffee: []
      });
    } else if (parsedDeal.id === 'breakfast-bundle') {
      const breakfast = menuItems.filter(item => 
        item.category === 'breakfast'
      );
      
      const coffee = menuItems.filter(item => 
        item.category === 'beverages' && 
        (item.name.toLowerCase().includes('coffee') || item.tags?.includes('coffee'))
      );
      
      setCategorizedItems({
        sandwiches: [],
        sides: [],
        other: [],
        breakfast,
        coffee
      });
    }
  }, [dealId, navigate, user, session]);

  const handleItemSelect = (item: MenuItem) => {
    const exists = selectedItems.find(i => i.id === item.id);
    
    if (exists) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
      return;
    }

    if (!deal) return;

    if (deal.id === 'happy-hour') {
      setSelectedItems([item]);
      return;
    }

    if (deal.id === 'lunch-special') {
      const isSandwich = item.tags?.includes('sandwich') || item.name.toLowerCase().includes('sandwich');
      const isSide = item.category === 'sides' || item.tags?.includes('soup') || item.tags?.includes('salad');
      
      if (isSandwich) {
        const currentSandwich = selectedItems.find(i => 
          i.tags?.includes('sandwich') || i.name.toLowerCase().includes('sandwich')
        );
        
        if (currentSandwich) {
          setSelectedItems([
            ...selectedItems.filter(i => !(i.tags?.includes('sandwich') || i.name.toLowerCase().includes('sandwich'))),
            item
          ]);
        } else {
          setSelectedItems([...selectedItems, item]);
        }
      } else if (isSide) {
        const currentSide = selectedItems.find(i => 
          i.category === 'sides' || i.tags?.includes('soup') || i.tags?.includes('salad')
        );
        
        if (currentSide) {
          setSelectedItems([
            ...selectedItems.filter(i => !(i.category === 'sides' || i.tags?.includes('soup') || i.tags?.includes('salad'))),
            item
          ]);
        } else {
          setSelectedItems([...selectedItems, item]);
        }
      } else {
        setSelectedItems([...selectedItems, item]);
      }
    } else if (deal.id === 'breakfast-bundle') {
      const isBreakfast = item.category === 'breakfast';
      const isCoffee = item.category === 'beverages' && (item.name.toLowerCase().includes('coffee') || item.tags?.includes('coffee'));
      
      if (isBreakfast) {
        const currentBreakfast = selectedItems.find(i => i.category === 'breakfast');
        
        if (currentBreakfast) {
          setSelectedItems([
            ...selectedItems.filter(i => i.category !== 'breakfast'),
            item
          ]);
        } else {
          setSelectedItems([...selectedItems, item]);
        }
      } else if (isCoffee) {
        const currentCoffee = selectedItems.find(i => 
          i.category === 'beverages' && (i.name.toLowerCase().includes('coffee') || i.tags?.includes('coffee'))
        );
        
        if (currentCoffee) {
          setSelectedItems([
            ...selectedItems.filter(i => 
              !(i.category === 'beverages' && (i.name.toLowerCase().includes('coffee') || i.tags?.includes('coffee')))
            ),
            item
          ]);
        } else {
          setSelectedItems([...selectedItems, item]);
        }
      } else {
        setSelectedItems([...selectedItems, item]);
      }
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const calculateTotal = () => {
    if (!deal || selectedItems.length === 0) return 0;
    
    let total = 0;
    
    switch (deal.id) {
      case 'lunch-special':
        const sandwich = selectedItems.find(item => 
          item.tags?.includes('sandwich') || item.name.toLowerCase().includes('sandwich')
        );
        
        if (sandwich) {
          total += sandwich.price;
        }
        
        selectedItems.forEach(item => {
          const isSandwich = item.tags?.includes('sandwich') || item.name.toLowerCase().includes('sandwich');
          const isSide = item.category === 'sides' || item.tags?.includes('soup') || item.tags?.includes('salad');
          
          if (!isSandwich && !isSide) {
            total += item.price;
          }
        });
        break;
        
      case 'happy-hour':
        if (selectedItems.length === 1) {
          total = selectedItems[0].price * 0.8; // 20% off
        }
        break;
        
      case 'breakfast-bundle':
        selectedItems.forEach(item => {
          total += item.price;
        });
        total = total * (1 - (deal.discountAmount / 100)); // Apply percentage discount
        break;
        
      default:
        selectedItems.forEach(item => {
          total += item.price;
        });
    }
    
    return total;
  };

  const handleAddToCart = () => {
    if (selectedItems.length === 0) {
      toast({
        title: "No Items Selected",
        description: "Please select items to apply your deal",
        variant: "destructive"
      });
      return;
    }
    
    if (deal?.id === 'lunch-special') {
      const hasSandwich = selectedItems.some(item => 
        item.tags?.includes('sandwich') || item.name.toLowerCase().includes('sandwich')
      );
      
      if (!hasSandwich) {
        toast({
          title: "Sandwich Required",
          description: "Please select a sandwich for your lunch special",
          variant: "destructive"
        });
        return;
      }
    } else if (deal?.id === 'happy-hour') {
      if (selectedItems.length !== 1) {
        toast({
          title: "Single Beverage Required",
          description: "Please select exactly one beverage for the Happy Hour special",
          variant: "destructive"
        });
        return;
      }
    } else if (deal?.id === 'breakfast-bundle') {
      const hasBreakfast = selectedItems.some(item => item.category === 'breakfast');
      const hasCoffee = selectedItems.some(item => 
        item.category === 'beverages' && (item.name.toLowerCase().includes('coffee') || item.tags?.includes('coffee'))
      );
      
      if (!hasBreakfast) {
        toast({
          title: "Breakfast Item Required",
          description: "Please select a breakfast item",
          variant: "destructive"
        });
        return;
      }
      
      if (!hasCoffee) {
        toast({
          title: "Coffee Required",
          description: "Please select a coffee",
          variant: "destructive"
        });
        return;
      }
    }
    
    const hasDiscountedItems = items.some(item => item.hasDiscount);
    
    if (hasDiscountedItems) {
      toast({
        title: "Only One Deal Allowed",
        description: "You can only apply one deal per order. Please remove discounted items first.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    selectedItems.forEach(item => {
      let discountedPrice = item.price;
      
      switch (deal?.id) {
        case 'happy-hour':
          discountedPrice = item.price * 0.8; // 20% off
          break;
        case 'lunch-special':
          const isSide = item.category === 'sides' || item.tags?.includes('soup') || item.tags?.includes('salad');
          if (isSide) {
            discountedPrice = 0; // Free side
          }
          break;
        case 'breakfast-bundle':
          discountedPrice = item.price * (1 - (deal.discountAmount / 100)); // Apply percentage discount
          break;
      }
      
      addItem({
        id: item.id,
        name: item.name,
        price: `$${discountedPrice.toFixed(2)}`,
        image: item.imageUrl,
        category: item.category,
        hasDiscount: true,
        dealName: deal?.title
      });
    });
    
    localStorage.removeItem('active_deal');
    
    toast({
      title: "Deal Applied",
      description: `${selectedItems.length} item(s) added to your cart with ${deal?.discount} discount`,
    });
    
    navigate('/cart');
  };

  const getValidationMessage = () => {
    if (!deal) return "";
    
    if (deal.id === 'lunch-special') {
      if (!selectedItems.some(item => item.tags?.includes('sandwich') || item.name.toLowerCase().includes('sandwich'))) {
        return "Please select a sandwich";
      }
      return "";
    }
    
    if (deal.id === 'happy-hour') {
      if (selectedItems.length === 0) {
        return "Please select one beverage";
      }
      if (selectedItems.length > 1) {
        return "Only one beverage can be selected for this deal";
      }
    }
    
    if (deal.id === 'breakfast-bundle') {
      if (!selectedItems.some(item => item.category === 'breakfast')) {
        return "Please select a breakfast item";
      }
      if (!selectedItems.some(item => 
        item.category === 'beverages' && (item.name.toLowerCase().includes('coffee') || item.tags?.includes('coffee'))
      )) {
        return "Please select a coffee";
      }
    }
    
    return "";
  };

  const isValid = () => {
    if (selectedItems.length === 0) return false;
    if (!deal) return false;
    
    if (deal.id === 'lunch-special') {
      const hasSandwich = selectedItems.some(item => 
        item.tags?.includes('sandwich') || item.name.toLowerCase().includes('sandwich')
      );
      
      return hasSandwich;
    }
    
    if (deal.id === 'happy-hour') {
      return selectedItems.length === 1;
    }
    
    if (deal.id === 'breakfast-bundle') {
      const hasBreakfast = selectedItems.some(item => item.category === 'breakfast');
      const hasCoffee = selectedItems.some(item => 
        item.category === 'beverages' && (item.name.toLowerCase().includes('coffee') || item.tags?.includes('coffee'))
      );
      
      return hasBreakfast && hasCoffee;
    }
    
    return true;
  };

  return {
    deal,
    selectedItems,
    filteredItems,
    categorizedItems,
    handleItemSelect,
    handleAddToCart,
    calculateTotal,
    getValidationMessage,
    isValid
  };
};
