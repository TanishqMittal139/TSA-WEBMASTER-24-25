
import { MenuItem } from '@/types/menu';

export const dessertItems: MenuItem[] = [
  {
    id: '3',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten chocolate center.',
    price: 7.99,
    imageUrl: 'https://images.unsplash.com/photo-1630743252587-ac5416f2c080?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvY29sYXRlJTIwbGF2YSUyMGNha2V8ZW58MHx8MHx8MA==',
    category: 'desserts',
    cuisineType: 'american',
    tags: ['chocolate', 'cake'],
    vegetarian: true
  },
  {
    id: '7',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee and cocoa.',
    price: 8.99,
    imageUrl: 'https://images.unsplash.com/photo-1633978372244-3967657c5619?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGlyYW1pc3V8ZW58MHx8MHx8MA==',
    category: 'desserts',
    cuisineType: 'italian',
    tags: ['tiramisu', 'coffee'],
    vegetarian: true
  },
  {
    id: '11',
    name: 'Vanilla Ice Cream',
    description: 'Classic vanilla ice cream.',
    price: 4.99,
    imageUrl: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&auto=format&fit=crop&q=60',
    category: 'desserts',
    cuisineType: 'american',
    tags: ['ice cream', 'vanilla'],
    vegetarian: true
  }
];
