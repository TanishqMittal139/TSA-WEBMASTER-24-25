
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
    vegan: true,
    nutrition: {
      calories: 120,
      protein: '1g',
      carbs: '24g',
      fat: '0g',
      sodium: '15mg',
      fiber: '0g',
      sugar: '22g'
    },
    ingredients: ['Coffee', 'Ice', 'Choice of syrup', 'Optional milk'],
    preparationTime: '3-5 min',
    allergens: []
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
    glutenFree: true,
    nutrition: {
      calories: 160,
      protein: '0g',
      carbs: '40g',
      fat: '0g',
      sodium: '10mg',
      fiber: '0g',
      sugar: '38g'
    },
    ingredients: ['Fresh lemons', 'Water', 'Sugar', 'Ice'],
    preparationTime: '5 min',
    allergens: []
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
    glutenFree: true,
    nutrition: {
      calories: 110,
      protein: '2g',
      carbs: '26g',
      fat: '0g',
      sodium: '2mg',
      fiber: '0.5g',
      sugar: '22g'
    },
    ingredients: ['Fresh oranges'],
    preparationTime: '3-5 min',
    allergens: []
  }
];
