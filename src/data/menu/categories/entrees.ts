
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
  }
];
