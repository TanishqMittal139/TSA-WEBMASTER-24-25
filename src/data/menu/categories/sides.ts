
import { MenuItem } from '@/types/menu';

export const sideItems: MenuItem[] = [
  {
    id: '2',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with parmesan, croutons, and Caesar dressing.',
    price: 8.99,
    imageUrl: 'https://images.unsplash.com/photo-1580013759032-c96505e24c1f?w=800&auto=format&fit=crop&q=60',
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
    imageUrl: 'https://images.unsplash.com/photo-1573140401552-3fab0b24306f?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FybGljJTIwYnJlYWR8ZW58MHx8MHx8fDA%3D',
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
    imageUrl: 'https://plus.unsplash.com/premium_photo-1696835870634-e6484e8ed4d7?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFzaGVkJTIwcG90YXRvZXN8ZW58MHx8MHx8fDA%3D',
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
  },
  {
    id: 'side-11',
    name: 'Sweet Potato Fries',
    description: 'Crispy sweet potato fries with a hint of rosemary and sea salt.',
    price: 7.99,
    imageUrl: 'https://images.unsplash.com/photo-1598679253544-2c97992403ea?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3dlZXQlMjBwb3RhdG8lMjBmcmllc3xlbnwwfHwwfHx8MA%3D%3D',
    category: 'sides',
    cuisineType: 'american',
    tags: ['fries', 'vegetarian', 'sweet potato'],
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    nutrition: {
      calories: 260,
      protein: '2g',
      carbs: '38g',
      fat: '12g',
      sodium: '280mg',
      fiber: '5g',
      sugar: '8g'
    },
    ingredients: ['Sweet potatoes', 'Olive oil', 'Rosemary', 'Sea salt', 'Black pepper'],
    preparationTime: '18-22 min',
    allergens: []
  },
  {
    id: 'side-12',
    name: 'Grilled Vegetables',
    description: 'Seasonal vegetables grilled with olive oil, garlic, and herbs.',
    price: 8.99,
    imageUrl: 'https://images.unsplash.com/photo-1625944227313-4f7f68e6b3fa?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JpbGxlZCUyMHZlZ2V0YWJsZXN8ZW58MHx8MHx8fDA%3D',
    category: 'sides',
    cuisineType: 'mediterranean',
    tags: ['vegetables', 'healthy', 'grilled'],
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    nutrition: {
      calories: 120,
      protein: '3g',
      carbs: '18g',
      fat: '5g',
      sodium: '180mg',
      fiber: '6g',
      sugar: '9g'
    },
    ingredients: ['Zucchini', 'Bell peppers', 'Eggplant', 'Red onion', 'Olive oil', 'Garlic', 'Fresh herbs'],
    preparationTime: '12-15 min',
    allergens: []
  },
  {
    id: 'side-13',
    name: 'Truffle Parmesan Fries',
    description: 'Crispy fries tossed with truffle oil and grated Parmesan cheese.',
    price: 9.99,
    imageUrl: 'https://images.unsplash.com/photo-1630384060421-cb20d0e70989?w=800&auto=format&fit=crop&q=60',
    category: 'sides',
    cuisineType: 'italian',
    tags: ['fries', 'truffle', 'cheese'],
    vegetarian: true,
    nutrition: {
      calories: 380,
      protein: '8g',
      carbs: '42g',
      fat: '22g',
      sodium: '440mg',
      fiber: '3g',
      sugar: '1g'
    },
    ingredients: ['Potatoes', 'Truffle oil', 'Parmesan cheese', 'Parsley', 'Sea salt', 'Black pepper'],
    preparationTime: '15-18 min',
    allergens: ['Dairy']
  }
];
