
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
    glutenFree: true
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
    vegetarian: true
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
    glutenFree: true
  }
];
