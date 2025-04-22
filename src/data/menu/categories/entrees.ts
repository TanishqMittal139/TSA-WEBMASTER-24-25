
import { MenuItem } from '@/types/menu';

export const entreeItems: MenuItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato, mozzarella, and basil.',
    price: 12.99,
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a09aa3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emF8ZW58MHx8MHx8MA==',
    category: 'entrees',
    cuisineType: 'italian',
    tags: ['pizza', 'italian'],
    vegetarian: true,
    nutrition: {
      calories: 850,
      protein: '30g',
      carbs: '95g',
      fat: '28g'
    }
  },
  {
    id: '5',
    name: 'Spaghetti Bolognese',
    description: 'Classic spaghetti with a rich meat sauce.',
    price: 14.99,
    imageUrl: 'https://images.unsplash.com/photo-1674492153593-5f9a9727899f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3BhZ2hldHRpJTIwYm9sb2duZXNlfGVufDB8fDB8fDA=',
    category: 'entrees',
    cuisineType: 'italian',
    tags: ['pasta', 'italian']
  },
  {
    id: '9',
    name: 'Chicken Caesar Salad',
    description: 'Fresh romaine lettuce with grilled chicken, parmesan, croutons, and Caesar dressing.',
    price: 10.99,
    imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&auto=format&fit=crop&q=60',
    category: 'entrees',
    cuisineType: 'american',
    tags: ['salad', 'healthy', 'chicken']
  }
];
