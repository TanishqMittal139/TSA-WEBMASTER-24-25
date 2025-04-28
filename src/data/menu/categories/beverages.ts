
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
  },
  {
    id: 'coffee-1',
    name: 'Hot Coffee',
    description: 'Freshly brewed hot coffee from locally roasted beans.',
    price: 2.99,
    imageUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&auto=format&fit=crop&q=60',
    category: 'beverages',
    cuisineType: 'american',
    tags: ['coffee', 'hot'],
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    nutrition: {
      calories: 5,
      protein: '0g',
      carbs: '0g',
      fat: '0g',
      sodium: '5mg',
      fiber: '0g',
      sugar: '0g'
    },
    ingredients: ['Coffee beans', 'Filtered water'],
    preparationTime: '2 min',
    allergens: []
  },
  {
    id: 'coffee-2',
    name: 'Cappuccino',
    description: 'Espresso with steamed milk and a frothy top.',
    price: 4.49,
    imageUrl: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&auto=format&fit=crop&q=60',
    category: 'beverages',
    cuisineType: 'italian',
    tags: ['coffee', 'espresso', 'milk'],
    vegetarian: true,
    nutrition: {
      calories: 120,
      protein: '6g',
      carbs: '12g',
      fat: '4g',
      sodium: '100mg',
      fiber: '0g',
      sugar: '10g'
    },
    ingredients: ['Espresso', 'Steamed milk', 'Milk foam'],
    preparationTime: '4 min',
    allergens: ['Dairy']
  },
  {
    id: 'coffee-3',
    name: 'Latte',
    description: 'Espresso with steamed milk and a light layer of foam.',
    price: 4.99,
    imageUrl: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&auto=format&fit=crop&q=60',
    category: 'beverages',
    cuisineType: 'italian',
    tags: ['coffee', 'espresso', 'milk'],
    vegetarian: true,
    nutrition: {
      calories: 150,
      protein: '8g',
      carbs: '14g',
      fat: '6g',
      sodium: '115mg',
      fiber: '0g',
      sugar: '13g'
    },
    ingredients: ['Espresso', 'Steamed milk', 'Light milk foam'],
    preparationTime: '4 min',
    allergens: ['Dairy']
  }
];
