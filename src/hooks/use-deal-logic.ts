
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { DealData } from '@/pages/Deals';
import { MenuItem, getAllMeals } from '@/data/menu-data';

export const useDealLogic = (dealId: string | undefined) => {
  const navigate = useNavigate();
  const [deal, setDeal] = useState<DealData | null>(null);
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [categorizedItems, setCategorizedItems] = useState<{
    sandwiches: MenuItem[];
    sides: MenuItem[];
    other: MenuItem[];
  }>({
    sandwiches: [],
    sides: [],
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
        other
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
    } else if (deal.id === 'combo-meal') {
      const hasCategory = selectedItems.some(i => i.category === item.category);
      if (hasCategory) {
        setSelectedItems([
          ...selectedItems.filter(i => i.category !== item.category),
          item
        ]);
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
    
    if (deal.id === 'lunch-special') {
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
      
      return total;
    }
    
    selectedItems.forEach(item => {
      total += item.price;
    });
    
    if (deal.discountType === 'percentage') {
      total = total * (1 - (deal.discountAmount / 100));
    } else if (deal.discountType === 'fixed' && deal.appliesTo === 'all') {
      total = Math.max(0, total - deal.discountAmount);
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
      const hasSide = selectedItems.some(item => 
        item.category === 'sides' || item.tags?.includes('soup') || item.tags?.includes('salad')
      );
      
      if (!hasSandwich) {
        toast({
          title: "Sandwich Required",
          description: "Please select a sandwich for your lunch special",
          variant: "destructive"
        });
        return;
      }
      
      if (!hasSide) {
        toast({
          title: "Side Required",
          description: "Please select a free side or soup for your lunch special",
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
      const isSide = item.category === 'sides' || item.tags?.includes('soup') || item.tags?.includes('salad');
      const price = deal?.id === 'lunch-special' && isSide ? 0 : item.price;
      
      addItem({
        id: item.id,
        name: item.name,
        price: `$${price.toFixed(2)}`,
        image: item.imageUrl,
        category: item.category,
        hasDiscount: true
      });
    });
    
    localStorage.removeItem('active_deal');
    
    toast({
      title: "Deal Applied",
      description: `${selectedItems.length} items added to your cart with ${deal?.discount} discount`,
    });
    
    navigate('/cart');
  };

  const getValidationMessage = () => {
    if (!deal) return "";
    
    if (deal.id === 'combo-meal' && selectedItems.length < 3) {
      return `Choose ${3 - selectedItems.length} more items to complete your combo`;
    }
    
    if (deal.id === 'lunch-special') {
      if (!selectedItems.some(item => item.tags?.includes('sandwich') || item.name.toLowerCase().includes('sandwich'))) {
        return "Please select a sandwich";
      }
      if (!selectedItems.some(item => item.category === 'sides' || item.tags?.includes('soup') || item.tags?.includes('salad'))) {
        return "Please select a free side or soup";
      }
    }
    
    return "";
  };

  const isValid = () => {
    if (selectedItems.length === 0) return false;
    if (!deal) return false;
    
    if (deal.id === 'combo-meal' && selectedItems.length < 3) return false;
    
    if (deal.id === 'lunch-special') {
      const hasSandwich = selectedItems.some(item => 
        item.tags?.includes('sandwich') || item.name.toLowerCase().includes('sandwich')
      );
      const hasSide = selectedItems.some(item => 
        item.category === 'sides' || item.tags?.includes('soup') || item.tags?.includes('salad')
      );
      
      return hasSandwich && hasSide;
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
