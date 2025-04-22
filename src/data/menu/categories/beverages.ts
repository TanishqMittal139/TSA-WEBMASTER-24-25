
import { MenuItem } from '@/types/menu';

export const beverageItems: MenuItem[] = [
  {
    id: '4',
    name: 'Iced Coffee',
    description: 'Refreshing iced coffee with your choice of flavor.',
    price: 3.99,
    imageUrl: 'https://images.unsplash.com/photo-1541167760496-162358835d0f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aWNlZCUyMGNvZmZlZXxlbnwwfHwwfHx8MA==',
    category: 'beverages',
    cuisineType: 'american',
    tags: ['coffee', 'iced'],
    vegetarian: true,
    vegan: true
  },
  {
    id: '8',
    name: 'Lemonade',
    description: 'Refreshing lemonade with a hint of lemon.',
    price: 2.99,
    imageUrl: 'https://images.unsplash.com/photo-1563720239558-9ea5c06c339a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGVtb25hZGV8ZW58MHx8MHx8MA==',
    category: 'beverages',
    cuisineType: 'american',
    tags: ['lemonade', 'refreshing'],
    vegetarian: true,
    vegan: true,
    glutenFree: true
  },
  {
    id: '12',
    name: 'Orange Juice',
    description: 'Freshly squeezed orange juice.',
    price: 3.99,
    imageUrl: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&auto=format&fit=crop&q=60',
    category: 'beverages',
    cuisineType: 'american',
    tags: ['juice', 'orange'],
    vegetarian: true,
    vegan: true,
    glutenFree: true
  }
];
