
import { MenuItem } from '@/types/menu';

export const beverageItems: MenuItem[] = [
  {
    id: '4',
    name: 'Iced Coffee',
    description: 'Refreshing iced coffee with your choice of flavor.',
    price: 3.99,
    imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&auto=format&fit=crop&q=60',
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
    imageUrl: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&auto=format&fit=crop&q=60',
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
    imageUrl: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&auto=format&fit=crop&q=60',
    category: 'beverages',
    cuisineType: 'american',
    tags: ['juice', 'orange'],
    vegetarian: true,
    vegan: true,
    glutenFree: true
  }
];
