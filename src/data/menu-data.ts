
// Menu data for the restaurant application

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  popular?: boolean;
  tags?: string[];
  allergens?: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  ingredients?: string[];
  hasDiscount?: boolean;
  discountPrice?: string;
}

export const menuItems: MenuItem[] = [
  // Breakfast
  {
    id: "breakfast-1",
    name: "Avocado Toast",
    description: "Smashed avocado on artisan sourdough with cherry tomatoes, feta, and microgreens",
    price: "$12.99",
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1588137378633-dea1a563d058?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    popular: true,
    tags: ["Vegetarian", "Healthy", "Brunch"],
    allergens: ["Gluten", "Dairy"],
    nutritionalInfo: {
      calories: 320,
      protein: 10,
      carbs: 30,
      fat: 18
    },
    ingredients: ["Avocado", "Sourdough bread", "Cherry tomatoes", "Feta cheese", "Microgreens", "Olive oil", "Sea salt", "Black pepper"]
  },
  {
    id: "breakfast-2",
    name: "Acai Bowl",
    description: "Organic acai blend topped with fresh berries, banana, granola, and honey",
    price: "$14.99",
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    popular: true,
    tags: ["Vegetarian", "Healthy", "Gluten-Free Option"],
    allergens: ["Nuts"],
    nutritionalInfo: {
      calories: 390,
      protein: 8,
      carbs: 65,
      fat: 12
    }
  },
  {
    id: "breakfast-3",
    name: "Eggs Benedict",
    description: "Poached eggs on English muffin with Canadian bacon and hollandaise sauce",
    price: "$16.99",
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
    tags: ["Classic", "Brunch"],
    allergens: ["Gluten", "Dairy", "Eggs"]
  },
  {
    id: "breakfast-4",
    name: "Belgian Waffles",
    description: "Fluffy Belgian waffles served with mixed berries, maple syrup, and whipped cream",
    price: "$13.99",
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
    tags: ["Sweet", "Kid-Friendly"],
    allergens: ["Gluten", "Dairy", "Eggs"]
  },
  {
    id: "breakfast-5",
    name: "Garden Vegetable Omelette",
    description: "Three-egg omelette with bell peppers, spinach, tomatoes, onions, and cheddar cheese",
    price: "$15.99",
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=698&q=80",
    tags: ["Vegetarian", "Gluten-Free"],
    allergens: ["Eggs", "Dairy"]
  },
  {
    id: "breakfast-6",
    name: "Greek Yogurt Parfait",
    description: "Creamy Greek yogurt layered with homemade granola, mixed berries, and honey",
    price: "$9.99",
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1620713005739-741cac6f7cb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    tags: ["Healthy", "Vegetarian"],
    allergens: ["Dairy", "Nuts"]
  },
  
  // Lunch
  {
    id: "lunch-1",
    name: "Gourmet Burger",
    description: "Grass-fed beef patty with aged cheddar, caramelized onions, and special sauce on a brioche bun",
    price: "$18.99",
    category: "Lunch",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=999&q=80",
    popular: true,
    tags: ["Signature", "Bestseller"],
    allergens: ["Gluten", "Dairy", "Eggs"]
  },
  {
    id: "lunch-2",
    name: "Mediterranean Salad",
    description: "Fresh mixed greens with cucumber, cherry tomatoes, red onion, olives, and feta cheese",
    price: "$14.99",
    category: "Lunch",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=684&q=80",
    tags: ["Vegetarian", "Healthy", "Gluten-Free"],
    allergens: ["Dairy"]
  },
  {
    id: "lunch-3",
    name: "Chicken Caesar Wrap",
    description: "Grilled chicken with romaine lettuce, parmesan, and Caesar dressing in a spinach wrap",
    price: "$15.99",
    category: "Lunch",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["Popular", "Quick"],
    allergens: ["Gluten", "Dairy", "Eggs"]
  },
  {
    id: "lunch-4",
    name: "Quinoa Power Bowl",
    description: "Organic quinoa with roasted vegetables, avocado, chickpeas, and tahini dressing",
    price: "$16.99",
    category: "Lunch",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["Vegan", "Healthy", "Gluten-Free"],
    allergens: ["Sesame"]
  },
  {
    id: "lunch-5",
    name: "Lobster Roll",
    description: "Fresh Maine lobster with light mayo, lemon, and herbs in a toasted brioche roll",
    price: "$24.99",
    category: "Lunch",
    image: "https://images.unsplash.com/photo-1625864667534-aa5208d45a81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    tags: ["Seafood", "Premium"],
    allergens: ["Shellfish", "Gluten", "Eggs"]
  },
  {
    id: "lunch-6",
    name: "Mushroom Risotto",
    description: "Creamy Arborio rice with wild mushrooms, white wine, and Parmesan cheese",
    price: "$19.99",
    category: "Lunch",
    image: "https://images.unsplash.com/photo-1633964913849-96bb05aadc6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["Vegetarian", "Gluten-Free"],
    allergens: ["Dairy"]
  },
  
  // Dinner
  {
    id: "dinner-1",
    name: "Filet Mignon",
    description: "8oz grass-fed beef tenderloin with truffle mashed potatoes and roasted asparagus",
    price: "$42.99",
    category: "Dinner",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80",
    popular: true,
    tags: ["Premium", "Signature"],
    allergens: ["Dairy"]
  },
  {
    id: "dinner-2",
    name: "Grilled Salmon",
    description: "Wild-caught salmon with lemon-dill sauce, quinoa pilaf, and seasonal vegetables",
    price: "$28.99",
    category: "Dinner",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["Seafood", "Healthy", "Gluten-Free"],
    allergens: ["Fish"]
  },
  {
    id: "dinner-3",
    name: "Eggplant Parmesan",
    description: "Breaded eggplant with marinara sauce, melted mozzarella, and fresh basil over spaghetti",
    price: "$22.99",
    category: "Dinner",
    image: "https://images.unsplash.com/photo-1625944525903-acc284cd84ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    tags: ["Vegetarian", "Italian"],
    allergens: ["Gluten", "Dairy"]
  },
  {
    id: "dinner-4",
    name: "Braised Short Ribs",
    description: "Slow-cooked beef short ribs with red wine reduction, garlic mashed potatoes, and glazed carrots",
    price: "$34.99",
    category: "Dinner",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    tags: ["Premium", "Comfort Food"],
    allergens: ["Dairy"]
  },
  {
    id: "dinner-5",
    name: "Vegetable Curry",
    description: "Aromatic coconut curry with seasonal vegetables, chickpeas, and basmati rice",
    price: "$19.99",
    category: "Dinner",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    tags: ["Vegan", "Gluten-Free", "Spicy"],
    allergens: ["Tree Nuts"]
  },
  {
    id: "dinner-6",
    name: "Seafood Paella",
    description: "Traditional Spanish rice dish with shrimp, mussels, clams, and chorizo",
    price: "$38.99",
    category: "Dinner",
    image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["Seafood", "Signature", "Shareable"],
    allergens: ["Shellfish", "Gluten"]
  },
  
  // Drinks
  {
    id: "drink-1",
    name: "Espresso Martini",
    description: "Vodka, coffee liqueur, fresh espresso, and simple syrup shaken to perfection",
    price: "$14.99",
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1620055878822-03be2c85fa33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80",
    tags: ["Alcoholic", "Signature"]
  },
  {
    id: "drink-2",
    name: "Berry Smoothie",
    description: "Blend of fresh mixed berries, banana, Greek yogurt, and honey",
    price: "$8.99",
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1553530666-ba11a90a0148?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
    tags: ["Non-Alcoholic", "Healthy"],
    allergens: ["Dairy"]
  },
  {
    id: "drink-3",
    name: "Craft Lemonade",
    description: "Freshly squeezed lemons with house-made lavender syrup and sparkling water",
    price: "$6.99",
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    tags: ["Non-Alcoholic", "Refreshing"],
  },
  {
    id: "drink-4",
    name: "Old Fashioned",
    description: "Bourbon, sugar, Angostura bitters, and orange peel served over ice",
    price: "$15.99",
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1578906570946-dab0a902a2e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    tags: ["Alcoholic", "Classic"]
  },
  
  // Desserts
  {
    id: "dessert-1",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
    price: "$10.99",
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    popular: true,
    tags: ["Hot", "Rich"],
    allergens: ["Gluten", "Dairy", "Eggs"]
  },
  {
    id: "dessert-2",
    name: "New York Cheesecake",
    description: "Classic creamy cheesecake with graham cracker crust and seasonal berry compote",
    price: "$9.99",
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["Classic", "Creamy"],
    allergens: ["Gluten", "Dairy", "Eggs"]
  },
  {
    id: "dessert-3",
    name: "Tiramisu",
    description: "Espresso-soaked ladyfingers layered with mascarpone cream and dusted with cocoa",
    price: "$11.99",
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    tags: ["Italian", "Coffee"],
    allergens: ["Gluten", "Dairy", "Eggs"]
  },
  {
    id: "dessert-4",
    name: "Fresh Fruit Tart",
    description: "Buttery pastry crust filled with vanilla custard and topped with seasonal fresh fruits",
    price: "$12.99",
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["Fruity", "Colorful"],
    allergens: ["Gluten", "Dairy", "Eggs"]
  },
  
  // Deals (with hasDiscount flag)
  {
    id: "deal-1",
    name: "Family Meal Deal",
    description: "Four entrées, two sides, and a dessert to share",
    price: "$89.99",
    discountPrice: "$69.99",
    category: "Deals",
    image: "https://images.unsplash.com/photo-1547573854-74d2a71d0826?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    popular: true,
    hasDiscount: true,
    tags: ["Family", "Value"]
  },
  {
    id: "deal-2",
    name: "Date Night Special",
    description: "Two entrées, one appetizer, two drinks, and a dessert to share",
    price: "$79.99",
    discountPrice: "$59.99",
    category: "Deals",
    image: "https://images.unsplash.com/photo-1529566652340-2c41a1eb6d93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    hasDiscount: true,
    tags: ["Romantic", "Value"]
  },
  {
    id: "deal-3",
    name: "Lunch Special",
    description: "Any sandwich or salad with a soup and a drink",
    price: "$24.99",
    discountPrice: "$18.99",
    category: "Deals",
    image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    hasDiscount: true,
    tags: ["Weekday", "Quick"]
  }
];

// Function to get meals by category
export const getMealsByCategory = (category: string) => {
  return menuItems.filter(item => item.category === category);
};

// Function to get all categories
export const getAllCategories = () => {
  const categories = new Set(menuItems.map(item => item.category));
  return Array.from(categories);
};

// Function to get popular meals
export const getPopularMeals = () => {
  return menuItems.filter(item => item.popular);
};

// Function to get meal by ID
export const getMealById = (id: string) => {
  return menuItems.find(item => item.id === id);
};

// Function to get all meals
export const getAllMeals = () => {
  return menuItems;
};

// Function to get deals
export const getDeals = () => {
  return menuItems.filter(item => item.hasDiscount);
};

// Function to search meals by name or description
export const searchMeals = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return menuItems.filter(
    item => 
      item.name.toLowerCase().includes(lowerQuery) || 
      item.description.toLowerCase().includes(lowerQuery) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
  );
};
