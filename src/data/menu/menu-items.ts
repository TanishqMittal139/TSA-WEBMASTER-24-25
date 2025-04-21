import { MenuItem } from '@/types/menu';

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato, mozzarella, and basil.',
    price: 12.99,
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a09aa3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emF8ZW58MHx8MHx8MA==',
    category: 'entrees',
    cuisineType: 'italian',
    tags: ['pizza', 'italian'],
    vegetarian: true,
    nutrition: {
      calories: 850,
      protein: '30g',
      carbs: '95g',
      fat: '28g'
    }
  },
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
    id: '5',
    name: 'Spaghetti Bolognese',
    description: 'Classic spaghetti with a rich meat sauce.',
    price: 14.99,
    imageUrl: 'https://images.unsplash.com/photo-1674492153593-5f9a9727899f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3BhZ2hldHRpJTIwYm9sb2duZXNlfGVufDB8fDB8fDA=',
    category: 'entrees',
    cuisineType: 'italian',
    tags: ['pasta', 'italian']
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
    id: '9',
    name: 'Chicken Caesar Salad',
    description: 'Fresh romaine lettuce with grilled chicken, parmesan, croutons, and Caesar dressing.',
    price: 10.99,
    imageUrl: 'https://images.unsplash.com/photo-1607532941433-596454c63c71?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2FybGljJTIwYnJlYWR8ZW58MHx8MHx8MA==',
    category: 'entrees',
    cuisineType: 'american',
    tags: ['salad', 'healthy', 'chicken'],
  },
  {
    id: '10',
    name: 'Mashed Potatoes',
    description: 'Creamy mashed potatoes with butter and herbs.',
    price: 6.99,
    imageUrl: 'https://images.unsplash.com/photo-1607532941433-596454c63c71?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2FybGljJTIwYnJlYWR8ZW58MHx8MHx8MA==',
    category: 'sides',
    cuisineType: 'american',
    tags: ['potatoes', 'creamy'],
    vegetarian: true,
    glutenFree: true
  },
  {
    id: '11',
    name: 'Vanilla Ice Cream',
    description: 'Classic vanilla ice cream.',
    price: 4.99,
    imageUrl: 'https://images.unsplash.com/photo-1607532941433-596454c63c71?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2FybGljJTIwYnJlYWR8ZW58MHx8MHx8MA==',
    category: 'desserts',
    cuisineType: 'american',
    tags: ['ice cream', 'vanilla'],
    vegetarian: true
  },
  {
    id: '12',
    name: 'Orange Juice',
    description: 'Freshly squeezed orange juice.',
    price: 3.99,
    imageUrl: 'https://images.unsplash.com/photo-1607532941433-596454c63c71?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2FybGljJTIwYnJlYWR8ZW58MHx8MHx8MA==',
    category: 'beverages',
    cuisineType: 'american',
    tags: ['juice', 'orange'],
    vegetarian: true,
    vegan: true,
    glutenFree: true
  },
  // Adding new lunch-specific menu items with unique images
  {
    id: 'sandwich-veggie-deluxe',
    name: 'Veggie Deluxe Sandwich',
    description: 'Fresh vegetables, hummus, and avocado on whole grain bread',
    price: 9.99,
    imageUrl: 'https://images.unsplash.com/photo-1540914124281-342587941389?w=400&auto=format&fit=crop&q=60',
    category: 'lunch',
    cuisineType: 'american',
    tags: ['sandwich', 'vegetarian', 'healthy'],
    vegetarian: true,
    vegan: true
  },
  {
    id: 'sandwich-mushroom',
    name: 'Portobello Mushroom Sandwich',
    description: 'Grilled portobello mushroom with roasted peppers and goat cheese',
    price: 10.99,
    imageUrl: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=400&auto=format&fit=crop&q=60',
    category: 'lunch',
    cuisineType: 'american',
    tags: ['sandwich', 'vegetarian', 'mushroom'],
    vegetarian: true
  },
  {
    id: 'sandwich-mediterranean',
    name: 'Mediterranean Wrap',
    description: 'Falafel, hummus, cucumber, tomato, and tzatziki sauce in a wrap',
    price: 11.99,
    imageUrl: 'https://images.unsplash.com/photo-1600850056064-a8b380df8395?w=400&auto=format&fit=crop&q=60',
    category: 'lunch',
    cuisineType: 'mediterranean',
    tags: ['wrap', 'vegetarian', 'falafel'],
    vegetarian: true
  },
  {
    id: 'bowl-chicken-rice',
    name: 'Teriyaki Chicken Bowl',
    description: 'Grilled teriyaki chicken over brown rice with steamed vegetables',
    price: 12.99,
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&auto=format&fit=crop&q=60',
    category: 'lunch',
    cuisineType: 'asian',
    tags: ['bowl', 'chicken', 'rice']
  },
  {
    id: 'salad-greek',
    name: 'Greek Salad',
    description: 'Crisp lettuce, cucumber, tomato, olives, and feta cheese with olive oil dressing',
    price: 9.99,
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=60',
    category: 'lunch',
    cuisineType: 'mediterranean',
    tags: ['salad', 'vegetarian', 'healthy'],
    vegetarian: true,
    glutenFree: true
  },
  {
    id: 'tacos-beef',
    name: 'Street Tacos',
    description: 'Three corn tortillas with seasoned beef, cilantro, onion, and lime',
    price: 11.99,
    imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&auto=format&fit=crop&q=60',
    category: 'lunch',
    cuisineType: 'mexican',
    tags: ['tacos', 'beef', 'spicy'],
    glutenFree: true
  }
];
