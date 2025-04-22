
import { MenuItem } from '@/types/menu';

export const sideItems: MenuItem[] = [
  {
    id: '2',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with parmesan, croutons, and Caesar dressing.',
    price: 8.99,
    imageUrl: 'https://images.unsplash.com/photo-1546793665-490e7991940f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2Flc2FyJTIwc2FsYWR8ZW58MHx8MHx8MA==',
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
    imageUrl: 'https://images.unsplash.com/photo-1607532941433-596454c63c71?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2FybGljJTIwYnJlYWR8ZW58MHx8MHx8MA==',
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
    imageUrl: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&auto=format&fit=crop&q=60',
    category: 'sides',
    cuisineType: 'american',
    tags: ['potatoes', 'creamy'],
    vegetarian: true,
    glutenFree: true
  }
];
