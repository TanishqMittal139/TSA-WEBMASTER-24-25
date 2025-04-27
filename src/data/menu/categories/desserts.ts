
import { MenuItem } from '@/types/menu';

export const dessertItems: MenuItem[] = [
  {
    id: '3',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten chocolate center.',
    price: 7.99,
    imageUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&auto=format&fit=crop&q=60',
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
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&auto=format&fit=crop&q=60',
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
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&auto=format&fit=crop&q=60',
    category: 'desserts',
    cuisineType: 'american',
    tags: ['ice cream', 'vanilla'],
    vegetarian: true
  }
];
