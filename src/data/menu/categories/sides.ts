
import { MenuItem } from '@/types/menu';

export const sideItems: MenuItem[] = [
  {
    id: '2',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with parmesan, croutons, and Caesar dressing.',
    price: 8.99,
    imageUrl: 'https://images.unsplash.com/photo-1580013759032-c96505e24c1f?w=400&auto=format&fit=crop&q=60',
    category: 'sides',
    cuisineType: 'american',
    tags: ['salad', 'healthy'],
    vegetarian: true,
    glutenFree: true,
    nutrition: {
      calories: 320,
      protein: '10g',
      carbs: '12g',
      fat: '28g',
      sodium: '580mg',
      fiber: '3g',
      sugar: '2g'
    },
    ingredients: ['Romaine lettuce', 'Parmesan cheese', 'Croutons', 'Caesar dressing', 'Black pepper'],
    preparationTime: '10-15 min',
    allergens: ['Dairy', 'Eggs']
  },
  {
    id: '6',
    name: 'Garlic Bread',
    description: 'Toasted bread with garlic and herbs.',
    price: 5.99,
    imageUrl: 'https://images.unsplash.com/photo-1619535860434-cf9b562b7fec?w=400&auto=format&fit=crop&q=60',
    category: 'sides',
    cuisineType: 'american',
    tags: ['bread', 'garlic'],
    vegetarian: true,
    nutrition: {
      calories: 240,
      protein: '6g',
      carbs: '36g',
      fat: '8g',
      sodium: '420mg',
      fiber: '2g',
      sugar: '1g'
    },
    ingredients: ['French bread', 'Butter', 'Garlic', 'Parsley', 'Italian seasoning'],
    preparationTime: '8-10 min',
    allergens: ['Wheat', 'Dairy']
  },
  {
    id: '10',
    name: 'Mashed Potatoes',
    description: 'Creamy mashed potatoes with butter and herbs.',
    price: 6.99,
    imageUrl: 'https://images.unsplash.com/photo-1618848346964-08d669bd8169?w=400&auto=format&fit=crop&q=60',
    category: 'sides',
    cuisineType: 'american',
    tags: ['potatoes', 'creamy'],
    vegetarian: true,
    glutenFree: true,
    nutrition: {
      calories: 280,
      protein: '4g',
      carbs: '42g',
      fat: '12g',
      sodium: '340mg',
      fiber: '3g',
      sugar: '2g'
    },
    ingredients: ['Potatoes', 'Butter', 'Milk', 'Salt', 'Black pepper', 'Fresh herbs'],
    preparationTime: '15-20 min',
    allergens: ['Dairy']
  }
];
