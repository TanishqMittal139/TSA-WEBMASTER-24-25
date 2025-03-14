
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
  vegetarian?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  cuisineType?: string;
  preparationTime?: string;
  rating?: number;
  nutrition?: {
    calories: string | number;
    protein: string | number;
    carbs: string | number;
    fat: string | number;
    sodium?: string | number;
    fiber?: string | number;
    sugar?: string | number;
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
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1588137378633-dea1a563d058?q=80&w=1074&auto=format&fit=crop",
    popular: true,
    vegetarian: true,
    tags: ["Vegetarian", "Healthy", "Brunch"],
    allergens: ["Gluten", "Dairy"],
    preparationTime: "10 min",
    rating: 4.5,
    cuisineType: "american",
    nutrition: {
      calories: 320,
      protein: "10g",
      carbs: "30g",
      fat: "18g",
      sodium: "320mg",
      fiber: "6g",
      sugar: "4g"
    },
    ingredients: ["Avocado", "Sourdough bread", "Cherry tomatoes", "Feta cheese", "Microgreens", "Olive oil", "Sea salt", "Black pepper"]
  },
  {
    id: "breakfast-2",
    name: "Acai Bowl",
    description: "Organic acai blend topped with fresh berries, banana, granola, and honey",
    price: "$14.99",
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=687&auto=format&fit=crop",
    popular: true,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    tags: ["Vegetarian", "Healthy", "Gluten-Free Option"],
    allergens: ["Nuts"],
    preparationTime: "8 min",
    rating: 4.8,
    cuisineType: "brazilian",
    nutrition: {
      calories: 390,
      protein: "8g",
      carbs: "65g",
      fat: "12g",
      sodium: "45mg",
      fiber: "12g",
      sugar: "38g"
    },
    ingredients: ["Acai puree", "Granola", "Banana", "Strawberries", "Blueberries", "Honey", "Coconut flakes"]
  },
  {
    id: "breakfast-3",
    name: "Eggs Benedict",
    description: "Poached eggs on English muffin with Canadian bacon and hollandaise sauce",
    price: "$16.99",
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?q=80&w=736&auto=format&fit=crop",
    tags: ["Classic", "Brunch"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    preparationTime: "12 min",
    rating: 4.6,
    cuisineType: "american",
    nutrition: {
      calories: 650,
      protein: "25g",
      carbs: "40g",
      fat: "42g",
      sodium: "980mg",
      fiber: "2g",
      sugar: "3g"
    },
    ingredients: ["English muffin", "Canadian bacon", "Eggs", "Butter", "Lemon juice", "Salt", "Pepper", "Paprika"]
  },
  {
    id: "breakfast-4",
    name: "Belgian Waffles",
    description: "Fluffy Belgian waffles served with mixed berries, maple syrup, and whipped cream",
    price: "$13.99",
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?q=80&w=1025&auto=format&fit=crop",
    tags: ["Sweet", "Kid-Friendly"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    preparationTime: "15 min",
    rating: 4.7,
    cuisineType: "belgian",
    nutrition: {
      calories: 580,
      protein: "12g",
      carbs: "78g",
      fat: "24g",
      sodium: "410mg",
      fiber: "3g",
      sugar: "42g"
    },
    ingredients: ["Flour", "Milk", "Eggs", "Butter", "Sugar", "Baking powder", "Mixed berries", "Maple syrup", "Whipped cream"]
  },
  {
    id: "breakfast-5",
    name: "Garden Vegetable Omelette",
    description: "Three-egg omelette with bell peppers, spinach, tomatoes, onions, and cheddar cheese",
    price: "$15.99",
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?q=80&w=698&auto=format&fit=crop",
    tags: ["Vegetarian", "Gluten-Free"],
    allergens: ["Eggs", "Dairy"],
    preparationTime: "10 min",
    rating: 4.4,
    cuisineType: "american",
    nutrition: {
      calories: 420,
      protein: "28g",
      carbs: "12g",
      fat: "30g",
      sodium: "620mg",
      fiber: "3g",
      sugar: "5g"
    },
    ingredients: ["Eggs", "Bell peppers", "Spinach", "Tomatoes", "Onions", "Cheddar cheese", "Butter", "Salt", "Pepper"]
  },
  {
    id: "breakfast-6",
    name: "Greek Yogurt Parfait",
    description: "Creamy Greek yogurt layered with homemade granola, mixed berries, and honey",
    price: "$9.99",
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1620713005734-741cac6f7cb8?q=80&w=687&auto=format&fit=crop",
    tags: ["Healthy", "Vegetarian"],
    allergens: ["Dairy", "Nuts"],
    preparationTime: "5 min",
    rating: 4.5,
    cuisineType: "greek",
    nutrition: {
      calories: 320,
      protein: "18g",
      carbs: "42g",
      fat: "9g",
      sodium: "95mg",
      fiber: "4g",
      sugar: "30g"
    },
    ingredients: ["Greek yogurt", "Granola", "Mixed berries", "Honey", "Almonds", "Chia seeds"]
  },
  
  // Lunch
  {
    id: "lunch-1",
    name: "Gourmet Burger",
    description: "Grass-fed beef patty with aged cheddar, caramelized onions, and special sauce on a brioche bun",
    price: "$18.99",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=999&auto=format&fit=crop",
    popular: true,
    tags: ["Signature", "Bestseller"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    preparationTime: "15 min",
    rating: 4.7,
    cuisineType: "american",
    nutrition: {
      calories: 850,
      protein: "45g",
      carbs: "58g",
      fat: "42g",
      sodium: "980mg",
      fiber: "3g",
      sugar: "12g"
    },
    ingredients: ["Grass-fed beef", "Brioche bun", "Aged cheddar", "Caramelized onions", "Lettuce", "Tomato", "Special sauce", "Pickles"]
  },
  {
    id: "lunch-2",
    name: "Mediterranean Salad",
    description: "Fresh mixed greens with cucumber, cherry tomatoes, red onion, olives, and feta cheese",
    price: "$14.99",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=684&auto=format&fit=crop",
    tags: ["Vegetarian", "Healthy", "Gluten-Free"],
    allergens: ["Dairy"],
    preparationTime: "10 min",
    rating: 4.5,
    cuisineType: "mediterranean",
    nutrition: {
      calories: 380,
      protein: "12g",
      carbs: "22g",
      fat: "28g",
      sodium: "650mg",
      fiber: "5g",
      sugar: "6g"
    },
    ingredients: ["Mixed greens", "Cucumber", "Cherry tomatoes", "Red onion", "Kalamata olives", "Feta cheese", "Olive oil", "Balsamic vinegar", "Oregano"]
  },
  {
    id: "lunch-3",
    name: "Chicken Caesar Wrap",
    description: "Grilled chicken with romaine lettuce, parmesan, and Caesar dressing in a spinach wrap",
    price: "$15.99",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=1470&auto=format&fit=crop",
    tags: ["Popular", "Quick"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    preparationTime: "8 min",
    rating: 4.6,
    cuisineType: "american",
    nutrition: {
      calories: 520,
      protein: "35g",
      carbs: "42g",
      fat: "26g",
      sodium: "870mg",
      fiber: "4g",
      sugar: "3g"
    },
    ingredients: ["Grilled chicken", "Romaine lettuce", "Parmesan cheese", "Caesar dressing", "Spinach wrap", "Croutons"]
  },
  {
    id: "lunch-4",
    name: "Quinoa Power Bowl",
    description: "Organic quinoa with roasted vegetables, avocado, chickpeas, and tahini dressing",
    price: "$16.99",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1470&auto=format&fit=crop",
    tags: ["Vegan", "Healthy", "Gluten-Free"],
    allergens: ["Sesame"],
    preparationTime: "12 min",
    rating: 4.8,
    cuisineType: "middle-eastern",
    nutrition: {
      calories: 480,
      protein: "18g",
      carbs: "62g",
      fat: "22g",
      sodium: "320mg",
      fiber: "12g",
      sugar: "8g"
    },
    ingredients: ["Quinoa", "Roasted vegetables", "Avocado", "Chickpeas", "Tahini", "Lemon juice", "Olive oil", "Mixed herbs"]
  },
  {
    id: "lunch-5",
    name: "Lobster Roll",
    description: "Fresh Maine lobster with light mayo, lemon, and herbs in a toasted brioche roll",
    price: "$24.99",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1625864667534-aa5208d45a81?q=80&w=687&auto=format&fit=crop",
    tags: ["Seafood", "Premium"],
    allergens: ["Shellfish", "Gluten", "Eggs"],
    preparationTime: "15 min",
    rating: 4.9,
    cuisineType: "new-england",
    nutrition: {
      calories: 480,
      protein: "28g",
      carbs: "38g",
      fat: "24g",
      sodium: "720mg",
      fiber: "2g",
      sugar: "4g"
    },
    ingredients: ["Maine lobster", "Brioche roll", "Mayonnaise", "Lemon", "Chives", "Celery", "Butter", "Salt", "Pepper"]
  },
  {
    id: "lunch-6",
    name: "Mushroom Risotto",
    description: "Creamy Arborio rice with wild mushrooms, white wine, and Parmesan cheese",
    price: "$19.99",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1633964913849-96bb05aadc6d?q=80&w=1470&auto=format&fit=crop",
    tags: ["Vegetarian", "Gluten-Free"],
    allergens: ["Dairy"],
    preparationTime: "25 min",
    rating: 4.7,
    cuisineType: "italian",
    nutrition: {
      calories: 520,
      protein: "14g",
      carbs: "68g",
      fat: "18g",
      sodium: "650mg",
      fiber: "3g",
      sugar: "2g"
    },
    ingredients: ["Arborio rice", "Wild mushrooms", "White wine", "Parmesan cheese", "Vegetable broth", "Shallots", "Garlic", "Butter", "Olive oil", "Thyme"]
  },
  
  // Dinner
  {
    id: "dinner-1",
    name: "Filet Mignon",
    description: "8oz grass-fed beef tenderloin with truffle mashed potatoes and roasted asparagus",
    price: "$42.99",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=1631&auto=format&fit=crop",
    popular: true,
    tags: ["Premium", "Signature"],
    allergens: ["Dairy"],
    preparationTime: "25 min",
    rating: 4.9,
    cuisineType: "american",
    nutrition: {
      calories: 720,
      protein: "52g",
      carbs: "38g",
      fat: "46g",
      sodium: "680mg",
      fiber: "4g",
      sugar: "3g"
    },
    ingredients: ["Grass-fed beef tenderloin", "Potatoes", "Truffle oil", "Butter", "Cream", "Asparagus", "Garlic", "Thyme", "Rosemary", "Salt", "Pepper"]
  },
  {
    id: "dinner-2",
    name: "Grilled Salmon",
    description: "Wild-caught salmon with lemon-dill sauce, quinoa pilaf, and seasonal vegetables",
    price: "$28.99",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1470&auto=format&fit=crop",
    tags: ["Seafood", "Healthy", "Gluten-Free"],
    allergens: ["Fish"],
    preparationTime: "20 min",
    rating: 4.8,
    cuisineType: "scandinavian",
    nutrition: {
      calories: 580,
      protein: "42g",
      carbs: "45g",
      fat: "26g",
      sodium: "420mg",
      fiber: "6g",
      sugar: "3g"
    },
    ingredients: ["Wild-caught salmon", "Quinoa", "Seasonal vegetables", "Lemon", "Dill", "Greek yogurt", "Garlic", "Olive oil", "Salt", "Pepper"]
  },
  {
    id: "dinner-3",
    name: "Eggplant Parmesan",
    description: "Breaded eggplant with marinara sauce, melted mozzarella, and fresh basil over spaghetti",
    price: "$22.99",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1625944525903-acc284cd84ce?q=80&w=687&auto=format&fit=crop",
    tags: ["Vegetarian", "Italian"],
    allergens: ["Gluten", "Dairy"],
    preparationTime: "30 min",
    rating: 4.6,
    cuisineType: "italian",
    nutrition: {
      calories: 680,
      protein: "24g",
      carbs: "84g",
      fat: "28g",
      sodium: "920mg",
      fiber: "12g",
      sugar: "18g"
    },
    ingredients: ["Eggplant", "Breadcrumbs", "Eggs", "Marinara sauce", "Mozzarella cheese", "Parmesan cheese", "Spaghetti", "Basil", "Garlic", "Olive oil"]
  },
  {
    id: "dinner-4",
    name: "Braised Short Ribs",
    description: "Slow-cooked beef short ribs with red wine reduction, garlic mashed potatoes, and glazed carrots",
    price: "$34.99",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1469&auto=format&fit=crop",
    tags: ["Premium", "Comfort Food"],
    allergens: ["Dairy"],
    preparationTime: "3 hours",
    rating: 4.9,
    cuisineType: "french",
    nutrition: {
      calories: 850,
      protein: "48g",
      carbs: "42g",
      fat: "52g",
      sodium: "780mg",
      fiber: "5g",
      sugar: "8g"
    },
    ingredients: ["Beef short ribs", "Red wine", "Beef broth", "Potatoes", "Carrots", "Onions", "Garlic", "Butter", "Cream", "Thyme", "Rosemary"]
  },
  {
    id: "dinner-5",
    name: "Vegetable Curry",
    description: "Aromatic coconut curry with seasonal vegetables, chickpeas, and basmati rice",
    price: "$19.99",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=687&auto=format&fit=crop",
    tags: ["Vegan", "Gluten-Free", "Spicy"],
    allergens: ["Tree Nuts"],
    preparationTime: "25 min",
    rating: 4.7,
    cuisineType: "indian",
    nutrition: {
      calories: 520,
      protein: "14g",
      carbs: "72g",
      fat: "22g",
      sodium: "580mg",
      fiber: "12g",
      sugar: "10g"
    },
    ingredients: ["Seasonal vegetables", "Chickpeas", "Coconut milk", "Curry powder", "Basmati rice", "Garlic", "Ginger", "Onions", "Cilantro", "Lime"]
  },
  {
    id: "dinner-6",
    name: "Seafood Paella",
    description: "Traditional Spanish rice dish with shrimp, mussels, clams, and chorizo",
    price: "$38.99",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?q=80&w=1470&auto=format&fit=crop",
    tags: ["Seafood", "Signature", "Shareable"],
    allergens: ["Shellfish", "Gluten"],
    preparationTime: "35 min",
    rating: 4.8,
    cuisineType: "spanish",
    nutrition: {
      calories: 720,
      protein: "38g",
      carbs: "82g",
      fat: "26g",
      sodium: "890mg",
      fiber: "4g",
      sugar: "3g"
    },
    ingredients: ["Arborio rice", "Shrimp", "Mussels", "Clams", "Chorizo", "Saffron", "Bell peppers", "Tomatoes", "Onions", "Garlic", "Parsley", "Lemon"]
  },
  
  // Drinks
  {
    id: "drink-1",
    name: "Espresso Martini",
    description: "Vodka, coffee liqueur, fresh espresso, and simple syrup shaken to perfection",
    price: "$14.99",
    category: "drinks",
    image: "https://images.unsplash.com/photo-1620055878822-03be2c85fa33?q=80&w=715&auto=format&fit=crop",
    tags: ["Alcoholic", "Signature"],
    preparationTime: "5 min",
    rating: 4.7,
    cuisineType: "international",
    nutrition: {
      calories: 220,
      protein: "0g",
      carbs: "22g",
      fat: "0g",
      sodium: "10mg",
      sugar: "20g"
    },
    ingredients: ["Vodka", "Coffee liqueur", "Fresh espresso", "Simple syrup"]
  },
  {
    id: "drink-2",
    name: "Berry Smoothie",
    description: "Blend of fresh mixed berries, banana, Greek yogurt, and honey",
    price: "$8.99",
    category: "drinks",
    image: "https://images.unsplash.com/photo-1553530666-ba11a90a0148?q=80&w=736&auto=format&fit=crop",
    tags: ["Non-Alcoholic", "Healthy"],
    allergens: ["Dairy"],
    preparationTime: "5 min",
    rating: 4.8,
    cuisineType: "international",
    nutrition: {
      calories: 240,
      protein: "8g",
      carbs: "44g",
      fat: "3g",
      sodium: "60mg",
      fiber: "6g",
      sugar: "32g"
    },
    ingredients: ["Mixed berries", "Banana", "Greek yogurt", "Honey", "Ice"]
  },
  {
    id: "drink-3",
    name: "Craft Lemonade",
    description: "Freshly squeezed lemons with house-made lavender syrup and sparkling water",
    price: "$6.99",
    category: "drinks",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=687&auto=format&fit=crop",
    tags: ["Non-Alcoholic", "Refreshing"],
    preparationTime: "5 min",
    rating: 4.6,
    cuisineType: "american",
    nutrition: {
      calories: 120,
      protein: "0g",
      carbs: "30g",
      fat: "0g",
      sodium: "5mg",
      sugar: "28g"
    },
    ingredients: ["Lemons", "Lavender syrup", "Sparkling water", "Ice", "Mint"]
  },
  {
    id: "drink-4",
    name: "Old Fashioned",
    description: "Bourbon, sugar, Angostura bitters, and orange peel served over ice",
    price: "$15.99",
    category: "drinks",
    image: "https://images.unsplash.com/photo-1578906570946-dab0a902a2e4?q=80&w=688&auto=format&fit=crop",
    tags: ["Alcoholic", "Classic"],
    preparationTime: "5 min",
    rating: 4.9,
    cuisineType: "american",
    nutrition: {
      calories: 180,
      protein: "0g",
      carbs: "10g",
      fat: "0g",
      sodium: "2mg",
      sugar: "8g"
    },
    ingredients: ["Bourbon", "Sugar cube", "Angostura bitters", "Orange peel", "Ice"]
  },
  
  // Desserts
  {
    id: "dessert-1",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
    price: "$10.99",
    category: "desserts",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=1470&auto=format&fit=crop",
    popular: true,
    tags: ["Hot", "Rich"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    preparationTime: "15 min",
    rating: 4.9,
    cuisineType: "french",
    nutrition: {
      calories: 480,
      protein: "8g",
      carbs: "58g",
      fat: "24g",
      sodium: "220mg",
      fiber: "3g",
      sugar: "42g"
    },
    ingredients: ["Dark chocolate", "Butter", "Eggs", "Sugar", "Flour", "Vanilla extract", "Vanilla ice cream"]
  },
  {
    id: "dessert-2",
    name: "New York Cheesecake",
    description: "Classic creamy cheesecake with graham cracker crust and seasonal berry compote",
    price: "$9.99",
    category: "desserts",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1470&auto=format&fit=crop",
    tags: ["Classic", "Creamy"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    preparationTime: "20 min",
    rating: 4.8,
    cuisineType: "american",
    nutrition: {
      calories: 450,
      protein: "8g",
      carbs: "42g",
      fat: "28g",
      sodium: "320mg",
      fiber: "1g",
      sugar: "30g"
    },
    ingredients: ["Cream cheese", "Graham crackers", "Sugar", "Eggs", "Butter", "Vanilla extract", "Sour cream", "Seasonal berries"]
  },
  {
    id: "dessert-3",
    name: "Tiramisu",
    description: "Espresso-soaked ladyfingers layered with mascarpone cream and dusted with cocoa",
    price: "$11.99",
    category: "desserts",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=735&auto=format&fit=crop",
    tags: ["Italian", "Coffee"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    preparationTime: "25 min",
    rating: 4.7,
    cuisineType: "italian",
    nutrition: {
      calories: 420,
      protein: "7g",
      carbs: "46g",
      fat: "22g",
      sodium: "140mg",
      fiber: "1g",
      sugar: "32g"
    },
    ingredients: ["Ladyfingers", "Mascarpone cheese", "Eggs", "Sugar", "Espresso", "Cocoa powder", "Rum"]
  },
  {
    id: "dessert-4",
    name: "Fresh Fruit Tart",
    description: "Buttery pastry crust filled with vanilla custard and topped with seasonal fresh fruits",
    price: "$12.99",
    category: "desserts",
    image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?q=80&w=1470&auto=format&fit=crop",
    tags: ["Fruity", "Colorful"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    preparationTime: "30 min",
    rating: 4.6,
    cuisineType: "french",
    nutrition: {
      calories: 380,
      protein: "6g",
      carbs: "48g",
      fat: "18g",
      sodium: "180mg",
      fiber: "3g",
      sugar: "26g"
    },
    ingredients: ["Pastry crust", "Milk", "Eggs", "Sugar", "Vanilla bean", "Cornstarch", "Seasonal fruits", "Apricot jam"]
  },
  
  // Deals (with hasDiscount flag)
  {
    id: "deal-1",
    name: "Family Meal Deal",
    description: "Four entrées, two sides, and a dessert to share",
    price: "$89.99",
    discountPrice: "$69.99",
    category: "deals",
    image: "https://images.unsplash.com/photo-1547573854-74d2a71d0826?q=80&w=2070&auto=format&fit=crop",
    popular: true,
    hasDiscount: true,
    tags: ["Family", "Value"],
    nutrition: {
      calories: 2400,
      protein: "120g",
      carbs: "240g",
      fat: "110g"
    }
  },
  {
    id: "deal-2",
    name: "Date Night Special",
    description: "Two entrées, one appetizer, two drinks, and a dessert to share",
    price: "$79.99",
    discountPrice: "$59.99",
    category: "deals",
    image: "https://images.unsplash.com/photo-1529566652340-2c41a1eb6d93?q=80&w=1470&auto=format&fit=crop",
    hasDiscount: true,
    tags: ["Romantic", "Value"],
    nutrition: {
      calories: 1600,
      protein: "80g",
      carbs: "160g",
      fat: "70g"
    }
  },
  {
    id: "deal-3",
    name: "Lunch Special",
    description: "Any sandwich or salad with a soup and a drink",
    price: "$24.99",
    discountPrice: "$18.99",
    category: "deals",
    image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=1470&auto=format&fit=crop",
    hasDiscount: true,
    tags: ["Weekday", "Quick"],
    nutrition: {
      calories: 850,
      protein: "40g",
      carbs: "95g",
      fat: "35g"
    }
  }
];

// New category definitions
export const menuCategories = [
  { id: 'all', name: 'All Items' },
  { id: 'breakfast', name: 'Breakfast' },
  { id: 'lunch', name: 'Lunch' },
  { id: 'dinner', name: 'Dinner' },
  { id: 'drinks', name: 'Drinks' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'deals', name: 'Deals' }
];

// Dietary tags
export const dietaryTags = [
  { id: 'vegetarian', name: 'Vegetarian' },
  { id: 'vegan', name: 'Vegan' },
  { id: 'gluten-free', name: 'Gluten-Free' },
  { id: 'dairy-free', name: 'Dairy-Free' },
  { id: 'nut-free', name: 'Nut-Free' },
  { id: 'low-carb', name: 'Low-Carb' }
];

// Cuisine types
export const cuisineTypes = [
  { id: 'american', name: 'American' },
  { id: 'italian', name: 'Italian' },
  { id: 'mexican', name: 'Mexican' },
  { id: 'asian', name: 'Asian' },
  { id: 'mediterranean', name: 'Mediterranean' },
  { id: 'indian', name: 'Indian' },
  { id: 'french', name: 'French' },
  { id: 'brazilian', name: 'Brazilian' },
  { id: 'spanish', name: 'Spanish' },
  { id: 'scandinavian', name: 'Scandinavian' },
  { id: 'middle-eastern', name: 'Middle Eastern' },
  { id: 'greek', name: 'Greek' },
  { id: 'new-england', name: 'New England' },
  { id: 'belgian', name: 'Belgian' },
  { id: 'international', name: 'International' }
];

// All menu items for easier access
export const allMenuItems = menuItems;

// Function to get meals by category
export const getMealsByCategory = (category: string) => {
  return menuItems.filter(item => item.category === category);
};

// Function to get all categories
export const getAllCategories = () => {
  return menuCategories.map(category => category.id);
};

// Function to get popular meals
export const getPopularMeals = () => {
  return menuItems.filter(item => item.popular);
};

// Function to get meal by ID
export const getMealById = (id: string) => {
  return menuItems.find(item => item.id === id);
};

// Function explicitly for DishDetails.tsx
export const getMenuItemById = (id: string) => {
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
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) ||
      (item.cuisineType && item.cuisineType.toLowerCase().includes(lowerQuery))
  );
};

