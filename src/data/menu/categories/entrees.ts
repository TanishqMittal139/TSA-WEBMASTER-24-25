
import { MenuItem } from '@/types/menu';

export const entreeItems: MenuItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato, mozzarella, and basil.',
    price: 12.99,
    imageUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&auto=format&fit=crop&q=60',
    category: 'entrees',
    cuisineType: 'italian',
    tags: ['pizza', 'italian'],
    vegetarian: true,
    nutrition: {
      calories: 850,
      protein: '30g',
      carbs: '95g',
      fat: '28g',
      sodium: '1200mg',
      fiber: '4g',
      sugar: '8g'
    },
    ingredients: ['Pizza dough', 'San Marzano tomatoes', 'Fresh mozzarella', 'Fresh basil', 'Extra virgin olive oil', 'Sea salt'],
    preparationTime: '15-20 min',
    allergens: ['Wheat', 'Dairy']
  },
  {
    id: '5',
    name: 'Spaghetti Bolognese',
    description: 'Classic spaghetti with a rich meat sauce.',
    price: 14.99,
    imageUrl: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=400&auto=format&fit=crop&q=60',
    category: 'entrees',
    cuisineType: 'italian',
    tags: ['pasta', 'italian'],
    nutrition: {
      calories: 780,
      protein: '35g',
      carbs: '88g',
      fat: '32g',
      sodium: '980mg',
      fiber: '5g',
      sugar: '6g'
    },
    ingredients: ['Spaghetti', 'Ground beef', 'Tomato sauce', 'Onions', 'Garlic', 'Italian herbs', 'Parmesan cheese'],
    preparationTime: '20-25 min',
    allergens: ['Wheat', 'Dairy']
  },
  {
    id: '9',
    name: 'Chicken Caesar Salad',
    description: 'Fresh romaine lettuce with grilled chicken, parmesan, croutons, and Caesar dressing.',
    price: 10.99,
    imageUrl: 'https://images.unsplash.com/photo-1599021456807-2340ca98c153?w=400&auto=format&fit=crop&q=60',
    category: 'entrees',
    cuisineType: 'american',
    tags: ['salad', 'healthy', 'chicken'],
    nutrition: {
      calories: 440,
      protein: '38g',
      carbs: '22g',
      fat: '24g',
      sodium: '850mg',
      fiber: '4g',
      sugar: '3g'
    },
    ingredients: ['Romaine lettuce', 'Grilled chicken breast', 'Parmesan cheese', 'Croutons', 'Caesar dressing', 'Black pepper'],
    preparationTime: '10-15 min',
    allergens: ['Wheat', 'Dairy', 'Eggs']
  },
  {
    id: 'entree-11',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon fillet grilled to perfection with lemon herb butter.',
    price: 18.99,
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&auto=format&fit=crop&q=60',
    category: 'entrees',
    cuisineType: 'american',
    tags: ['seafood', 'healthy', 'grilled'],
    nutrition: {
      calories: 420,
      protein: '38g',
      carbs: '2g',
      fat: '28g',
      sodium: '320mg',
      fiber: '0g',
      sugar: '0g'
    },
    ingredients: ['Salmon fillet', 'Lemon', 'Butter', 'Garlic', 'Fresh herbs', 'Sea salt', 'Black pepper'],
    preparationTime: '18-22 min',
    allergens: ['Fish', 'Dairy']
  },
  {
    id: 'entree-12',
    name: 'Vegetable Curry',
    description: 'A rich, aromatic curry with seasonal vegetables served with basmati rice.',
    price: 13.99,
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&auto=format&fit=crop&q=60',
    category: 'entrees',
    cuisineType: 'indian',
    tags: ['curry', 'vegetarian', 'spicy'],
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    nutrition: {
      calories: 380,
      protein: '9g',
      carbs: '65g',
      fat: '12g',
      sodium: '640mg',
      fiber: '8g',
      sugar: '10g'
    },
    ingredients: ['Seasonal vegetables', 'Coconut milk', 'Curry spices', 'Garlic', 'Ginger', 'Basmati rice', 'Fresh cilantro'],
    preparationTime: '25-30 min',
    allergens: []
  },
  {
    id: 'entree-13',
    name: 'Beef Tacos',
    description: 'Three soft corn tortillas with seasoned beef, pico de gallo, and avocado cream.',
    price: 15.99,
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&auto=format&fit=crop&q=60',
    category: 'entrees',
    cuisineType: 'mexican',
    tags: ['tacos', 'mexican', 'beef'],
    nutrition: {
      calories: 580,
      protein: '28g',
      carbs: '45g',
      fat: '32g',
      sodium: '720mg',
      fiber: '6g',
      sugar: '4g'
    },
    ingredients: ['Corn tortillas', 'Ground beef', 'Mexican spices', 'Pico de gallo', 'Avocado', 'Sour cream', 'Lime'],
    preparationTime: '15-20 min',
    allergens: ['Dairy']
  }
];
