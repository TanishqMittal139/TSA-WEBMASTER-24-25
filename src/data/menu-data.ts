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

// Import additional menu items
import { additionalMenuItems } from './additional-menu-items';

export const menuItems: MenuItem[] = [
  // Breakfast
  {
    id: "breakfast-1",
    name: "Avocado Toast",
    description: "Smashed avocado on artisan sourdough with cherry tomatoes, feta, and microgreens",
    price: "$9.99",
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
    price: "$11.99",
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
    price: "$13.99",
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
    price: "$11.99",
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
    price: "$12.99",
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
    price: "$7.99",
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
  {
    id: "breakfast-7",
    name: "Blueberry Pancakes",
    description: "Fluffy buttermilk pancakes studded with fresh blueberries, served with maple syrup",
    price: "$10.99",
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=1470&auto=format&fit=crop",
    tags: ["Sweet", "Kid-Friendly"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    preparationTime: "15 min",
    rating: 4.8,
    cuisineType: "american",
    nutrition: {
      calories: 520,
      protein: "14g",
      carbs: "82g",
      fat: "16g",
      sodium: "380mg",
      fiber: "4g",
      sugar: "32g"
    },
    ingredients: ["Flour", "Buttermilk", "Eggs", "Blueberries", "Butter", "Sugar", "Baking powder", "Maple syrup"]
  },
  {
    id: "breakfast-8",
    name: "Breakfast Burrito",
    description: "Scrambled eggs, black beans, avocado, cheese, and salsa wrapped in a warm tortilla",
    price: "$11.99",
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=1374&auto=format&fit=crop",
    tags: ["Hearty", "Mexican"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    preparationTime: "10 min",
    rating: 4.6,
    cuisineType: "mexican",
    nutrition: {
      calories: 580,
      protein: "24g",
      carbs: "48g",
      fat: "32g",
      sodium: "820mg",
      fiber: "8g",
      sugar: "4g"
    },
    ingredients: ["Eggs", "Black beans", "Avocado", "Cheese", "Salsa", "Flour tortilla", "Bell peppers", "Onions"]
  },
  {
    id: "breakfast-9",
    name: "Avocado & Kale Smoothie Bowl",
    description: "Creamy avocado and kale smoothie topped with granola, chia seeds, and coconut flakes",
    price: "$9.99",
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?q=80&w=2070&auto=format&fit=crop",
    tags: ["Vegetarian", "Vegan", "Healthy"],
    allergens: ["Nuts"],
    preparationTime: "8 min",
    rating: 4.7,
    cuisineType: "american",
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    nutrition: {
      calories: 340,
      protein: "8g",
      carbs: "45g",
      fat: "16g",
      sodium: "65mg",
      fiber: "9g",
      sugar: "18g"
    },
    ingredients: ["Avocado", "Kale", "Banana", "Almond milk", "Chia seeds", "Granola", "Coconut flakes", "Honey"]
  },
  {
    id: "breakfast-10",
    name: "Quinoa Breakfast Bowl",
    description: "Warm quinoa with almond milk, topped with fresh fruits, nuts, and a drizzle of honey",
    price: "$10.99",
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1621472164154-a42993b64009?q=80&w=2070&auto=format&fit=crop",
    tags: ["Vegetarian", "Gluten-Free", "Healthy"],
    allergens: ["Nuts"],
    preparationTime: "12 min",
    rating: 4.5,
    cuisineType: "american",
    vegetarian: true,
    glutenFree: true,
    nutrition: {
      calories: 380,
      protein: "11g",
      carbs: "58g",
      fat: "12g",
      sodium: "75mg",
      fiber: "7g",
      sugar: "22g"
    },
    ingredients: ["Quinoa", "Almond milk", "Cinnamon", "Fresh berries", "Sliced banana", "Almonds", "Honey"]
  },
  
  // Lunch
  {
    id: "lunch-1",
    name: "Gourmet Veggie Burger",
    description: "Plant-based patty with aged cheddar, caramelized onions, and special sauce on a brioche bun",
    price: "$14.99",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1980&auto=format&fit=crop",
    popular: true,
    tags: ["Signature", "Vegetarian"],
    allergens: ["Gluten", "Dairy", "Soy"],
    preparationTime: "15 min",
    rating: 4.7,
    cuisineType: "american",
    vegetarian: true,
    nutrition: {
      calories: 650,
      protein: "25g",
      carbs: "58g",
      fat: "32g",
      sodium: "780mg",
      fiber: "6g",
      sugar: "12g"
    },
    ingredients: ["Plant-based patty", "Brioche bun", "Aged cheddar", "Caramelized onions", "Lettuce", "Tomato", "Special sauce", "Pickles"]
  },
  {
    id: "lunch-2",
    name: "Mediterranean Salad",
    description: "Fresh mixed greens with cucumber, cherry tomatoes, red onion, olives, and feta cheese",
    price: "$12.99",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=684&auto=format&fit=crop",
    tags: ["Vegetarian", "Healthy", "Gluten-Free"],
    allergens: ["Dairy"],
    preparationTime: "10 min",
    rating: 4.5,
    cuisineType: "mediterranean",
    vegetarian: true,
    glutenFree: true,
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
    name: "Grilled Portobello Wrap",
    description: "Grilled portobello mushroom with roasted red peppers, arugula, and goat cheese in a spinach wrap",
    price: "$13.99",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1600336153113-d66c79de3e91?q=80&w=2070&auto=format&fit=crop",
    tags: ["Vegetarian", "Quick"],
    allergens: ["Gluten", "Dairy"],
    preparationTime: "8 min",
    rating: 4.6,
    cuisineType: "american",
    vegetarian: true,
    nutrition: {
      calories: 480,
      protein: "18g",
      carbs: "42g",
      fat: "26g",
      sodium: "720mg",
      fiber: "6g",
      sugar: "5g"
    },
    ingredients: ["Portobello mushroom", "Spinach wrap", "Roasted red peppers", "Arugula", "Goat cheese", "Balsamic glaze", "Garlic aioli"]
  },
  {
    id: "lunch-4",
    name: "Quinoa Power Bowl",
    description: "Organic quinoa with roasted vegetables, avocado, chickpeas, and tahini dressing",
    price: "$14.99",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1470&auto=format&fit=crop",
    tags: ["Vegan", "Healthy", "Gluten-Free"],
    allergens: ["Sesame"],
    preparationTime: "12 min",
    rating: 4.8,
    cuisineType: "middle-eastern",
    vegan: true,
    vegetarian: true,
    glutenFree: true,
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
    name: "Wild Mushroom Risotto",
    description: "Creamy Arborio rice with wild mushrooms, white wine, and Parmesan cheese",
    price: "$16.99",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1633964913849-96bb05aadc6d?q=80&w=1470&auto=format&fit=crop",
    tags: ["Vegetarian", "Gluten-Free"],
    allergens: ["Dairy"],
    preparationTime: "25 min",
    rating: 4.7,
    cuisineType: "italian",
    vegetarian: true,
    glutenFree: true,
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
  {
    id: "lunch-6",
    name: "Falafel Plate",
    description: "Crispy chickpea fritters with hummus, tabbouleh, pita, and tahini sauce",
    price: "$13.99",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1593001872095-7d5b3868dd6a?q=80&w=1470&auto=format&fit=crop",
    tags: ["Vegetarian", "Middle Eastern"],
    allergens: ["Gluten", "Sesame"],
    preparationTime: "15 min",
    rating: 4.6,
    cuisineType: "middle-eastern",
    vegetarian: true,
    vegan: true,
    nutrition: {
      calories: 620,
      protein: "22g",
      carbs: "82g",
      fat: "24g",
      sodium: "740mg",
      fiber: "14g",
      sugar: "6g"
    },
    ingredients: ["Chickpeas", "Herbs", "Spices", "Tahini", "Lemon", "Olive oil", "Pita bread", "Bulgur wheat", "Tomatoes", "Cucumber", "Parsley"]
  },
  {
    id: "lunch-7",
    name: "Southwest Black Bean Bowl",
    description: "Black beans, roasted corn, avocado, and fresh salsa over cilantro-lime rice",
    price: "$13.99",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=2070&auto=format&fit=crop",
    tags: ["Vegan", "Gluten-Free", "Spicy"],
    allergens: [],
    preparationTime: "12 min",
    rating: 4.7,
    cuisineType: "mexican",
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    nutrition: {
      calories: 550,
      protein: "18g",
      carbs: "78g",
      fat: "18g",
      sodium: "580mg",
      fiber: "16g",
      sugar: "9g"
    },
    ingredients: ["Black beans", "Roasted corn", "Avocado", "Cilantro-lime rice", "Fresh salsa", "Red onion", "Lime", "Cilantro", "Jalapeño"]
  },
  {
    id: "lunch-8",
    name: "Mediterranean Hummus Wrap",
    description: "House-made hummus with fresh vegetables, feta, and olives in a whole wheat wrap",
    price: "$12.99",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1644704170910-a0cdf183649b?q=80&w=1950&auto=format&fit=crop",
    tags: ["Vegetarian", "Mediterranean"],
    allergens: ["Gluten", "Dairy", "Sesame"],
    preparationTime: "8 min",
    rating: 4.5,
    cuisineType: "mediterranean",
    vegetarian: true,
    nutrition: {
      calories: 480,
      protein: "16g",
      carbs: "62g",
      fat: "22g",
      sodium: "680mg",
      fiber: "8g",
      sugar: "6g"
    },
    ingredients: ["Whole wheat wrap", "Hummus", "Cucumbers", "Tomatoes", "Red onion", "Feta cheese", "Kalamata olives", "Mixed greens", "Greek dressing"]
  },
  {
    id: "lunch-9",
    name: "Pear & Walnut Salad",
    description: "Mixed greens with sliced pears, candied walnuts, goat cheese, and balsamic vinaigrette",
    price: "$12.99",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?q=80&w=1760&auto=format&fit=crop",
    tags: ["Vegetarian", "Gluten-Free", "Seasonal"],
    allergens: ["Dairy", "Nuts"],
    preparationTime: "10 min",
    rating: 4.6,
    cuisineType: "american",
    vegetarian: true,
    glutenFree: true,
    nutrition: {
      calories: 420,
      protein: "11g",
      carbs: "32g",
      fat: "28g",
      sodium: "480mg",
      fiber: "6g",
      sugar: "22g"
    },
    ingredients: ["Mixed greens", "Pears", "Candied walnuts", "Goat cheese", "Red onion", "Balsamic vinaigrette"]
  },
  {
    id: "lunch-10",
    name: "Roasted Vegetable Panini",
    description: "Roasted bell peppers, zucchini, and eggplant with pesto and mozzarella on ciabatta",
    price: "$13.99",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1520174691701-bc555a3404ca?q=80&w=2070&auto=format&fit=crop",
    tags: ["Vegetarian", "Hot"],
    allergens: ["Gluten", "Dairy", "Nuts"],
    preparationTime: "12 min",
    rating: 4.7,
    cuisineType: "italian",
    vegetarian: true,
    nutrition: {
      calories: 540,
      protein: "18g",
      carbs: "58g",
      fat: "28g",
      sodium: "720mg",
      fiber: "5g",
      sugar: "8g"
    },
    ingredients: ["Ciabatta bread", "Roasted bell peppers", "Zucchini", "Eggplant", "Basil pesto", "Mozzarella cheese", "Balsamic glaze"]
  },
  
  // Dinner
  {
    id: "dinner-1",
    name: "Portobello Wellington",
    description: "Roasted portobello mushroom and vegetable duxelles wrapped in puff pastry with truffle sauce",
    price: "$22.99",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1673456807379-82a5b5cd02fa?q=80&w=2070&auto=format&fit=crop",
    popular: true,
    tags: ["Premium", "Signature", "Vegetarian"],
    allergens: ["Gluten", "Dairy"],
    preparationTime: "30 min",
    rating: 4.9,
    cuisineType: "french",
    vegetarian: true,
    nutrition: {
      calories: 720,
      protein: "18g",
      carbs: "62g",
      fat: "46g",
      sodium: "680mg",
      fiber: "6g",
      sugar: "5g"
    },
    ingredients: ["Portobello mushrooms", "Puff pastry", "Shallots", "Garlic", "Mixed herbs", "Spinach", "Truffle oil", "Vegetable stock"]
  },
  {
    id: "dinner-2",
    name: "Grilled Cedar Plank Salmon",
    description: "Wild-caught salmon with lemon-dill sauce, quinoa pilaf, and seasonal vegetables",
    price: "$24.99",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1470&auto=format&fit=crop",
    tags: ["Seafood", "Healthy", "Gluten-Free"],
    allergens: ["Fish"],
    preparationTime: "20 min",
    rating: 4.8,
    cuisineType: "scandinavian",
    glutenFree: true,
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
    description: "Breaded eggplant with marinara sauce, melted mozzarella, and fresh basil over gluten-free pasta",
    price: "$18.99",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1625944525903-acc284cd84ce?q=80&w=687&auto=format&fit=crop",
    tags: ["Vegetarian", "Italian"],
    allergens: ["Dairy", "Eggs"],
    preparationTime: "30 min",
    rating: 4.6,
    cuisineType: "italian",
    vegetarian: true,
    nutrition: {
      calories: 680,
      protein: "24g",
      carbs: "84g",
      fat: "28g",
      sodium: "920mg",
      fiber: "12g",
      sugar: "18g"
    },
    ingredients: ["Eggplant", "Gluten-free breadcrumbs", "Eggs", "Marinara sauce", "Mozzarella cheese", "Parmesan cheese", "Gluten-free pasta", "Basil", "Garlic", "Olive oil"]
  },
  {
    id: "dinner-4",
    name: "Vegetable Curry",
    description: "Aromatic coconut curry with seasonal vegetables, chickpeas, and basmati rice",
    price: "$17.99",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=687&auto=format&fit=crop",
    tags: ["Vegan", "Gluten-Free", "Spicy"],
    allergens: ["Tree Nuts"],
    preparationTime: "25 min",
    rating: 4.7,
    cuisineType: "indian",
    vegetarian: true,
    vegan: true,
    glutenFree: true,
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
    id: "dinner-5",
    name: "Thai Green Curry",
    description: "Aromatic green curry with bamboo shoots, bell peppers, and Thai basil, served with jasmine rice",
    price: "$18.99",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=1470&auto=format&fit=crop",
    tags: ["Spicy", "Asian", "Gluten-Free"],
    allergens: ["Fish", "Tree Nuts"],
    preparationTime: "25 min",
    rating: 4.7,
    cuisineType: "asian",
    vegetarian: true,
    glutenFree: true,
    nutrition: {
      calories: 620,
      protein: "18g",
      carbs: "68g",
      fat: "28g",
      sodium: "680mg",
      fiber: "6g",
      sugar: "12g"
    },
    ingredients: ["Coconut milk", "Green curry paste", "Tofu", "Bamboo shoots", "Bell peppers", "Thai basil", "Tamari sauce", "Lime leaves", "Jasmine rice"]
  },
  {
    id: "dinner-6",
    name: "Butternut Squash Risotto",
    description: "Creamy arborio rice with roasted butternut squash, sage, and parmesan",
    price: "$19.99",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=2070&auto=format&fit=crop",
    tags: ["Vegetarian", "Seasonal", "Comfort Food"],
    allergens: ["Dairy"],
    preparationTime: "30 min",
    rating: 4.8,
    cuisineType: "italian",
    vegetarian: true,
    glutenFree: true,
    nutrition: {
      calories: 580,
      protein: "14g",
      carbs: "86g",
      fat: "18g",
      sodium: "620mg",
      fiber: "6g",
      sugar: "8g"
    },
    ingredients: ["Arborio rice", "Butternut squash", "Vegetable broth", "White wine", "Sage", "Parmesan cheese", "Shallots", "Garlic", "Olive oil", "Butter"]
  },
  {
    id: "dinner-7",
    name: "Stuffed Bell Peppers",
    description: "Bell peppers stuffed with quinoa, black beans, corn, and topped with melted cheese",
    price: "$17.99",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1625938144457-ac93534ef082?q=80&w=1974&auto=format&fit=crop",
    tags: ["Vegetarian", "Gluten-Free", "Healthy"],
    allergens: ["Dairy"],
    preparationTime: "35 min",
    rating: 4.6,
    cuisineType: "mexican",
    vegetarian: true,
    glutenFree: true,
    nutrition: {
      calories: 480,
      protein: "18g",
      carbs: "62g",
      fat: "18g",
      sodium: "580mg",
      fiber: "12g",
      sugar: "8g"
    },
    ingredients: ["Bell peppers", "Quinoa", "Black beans", "Corn", "Tomatoes", "Onions", "Garlic", "Cheese", "Cilantro", "Cumin", "Paprika"]
  },
  {
    id: "dinner-8",
    name: "Mushroom & Truffle Pasta",
    description: "House-made fettuccine with wild mushrooms, truffle oil, and parmesan",
    price: "$21.99",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?q=80&w=2070&auto=format&fit=crop",
    tags: ["Vegetarian", "Premium", "Italian"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    preparationTime: "25 min",
    rating: 4.9,
    cuisineType: "italian",
    vegetarian: true,
    nutrition: {
      calories: 680,
      protein: "18g",
      carbs: "82g",
      fat: "28g",
      sodium: "680mg",
      fiber: "4g",
      sugar: "3g"
    },
    ingredients: ["Fettuccine pasta", "Wild mushrooms", "Truffle oil", "Parmesan cheese", "Garlic", "Shallots", "Thyme", "White wine", "Butter", "Olive oil"]
  },
  {
    id: "dinner-9",
    name: "Mediterranean Baked Cod",
    description: "Oven-baked cod with tomatoes, olives, capers, and herbs served with lemon-herb quinoa",
    price: "$23.99",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop",
    tags: ["Seafood", "Mediterranean", "Healthy"],
    allergens: ["Fish"],
    preparationTime: "25 min",
    rating: 4.7,
    cuisineType: "mediterranean",
    glutenFree: true,
    nutrition: {
      calories: 480,
      protein: "38g",
      carbs: "42g",
      fat: "16g",
      sodium: "580mg",
      fiber: "5g",
      sugar: "6g"
    },
    ingredients: ["Cod fillets", "Cherry tomatoes", "Kalamata olives", "Capers", "Garlic", "Lemon", "Fresh herbs", "Quinoa", "Olive oil"]
  },
  {
    id: "dinner-10",
    name: "Roasted Vegetable Tart",
    description: "Flaky pastry tart with roasted seasonal vegetables, goat cheese, and balsamic reduction",
    price: "$18.99",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1559742811-822873691df8?q=80&w=1974&auto=format&fit=crop",
    tags: ["Vegetarian", "Seasonal"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    preparationTime: "35 min",
    rating: 4.7,
    cuisineType: "french",
    vegetarian: true,
    nutrition: {
      calories: 560,
      protein: "14g",
      carbs: "48g",
      fat: "34g",
      sodium: "620mg",
      fiber: "6g",
      sugar: "8g"
    },
    ingredients: ["Puff pastry", "Seasonal vegetables", "Goat cheese", "Balsamic reduction", "Fresh herbs", "Olive oil", "Garlic"]
  },
  
  // Drinks
  {
    id: "drink-1",
    name: "Matcha Latte",
    description: "Ceremonial grade matcha whisked with steamed milk and a touch of honey",
    price: "$5.99",
    category: "drinks",
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=1470&auto=format&fit=crop",
    tags: ["Non-Alcoholic", "Healthy"],
    allergens: ["Dairy"],
    preparationTime: "5 min",
    rating: 4.7,
    cuisineType: "asian",
    vegetarian: true,
    nutrition: {
      calories: 160,
      protein: "6g",
      carbs: "24g",
      fat: "6g",
      sodium: "80mg",
      fiber: "0g",
      sugar: "18g"
    },
    ingredients: ["Matcha powder", "Milk", "Honey"]
  },
  {
    id: "drink-2",
    name: "Berry Smoothie",
    description: "Blend of fresh mixed berries, banana, Greek yogurt, and honey",
    price: "$6.99",
    category: "drinks",
    image: "https://images.unsplash.com/photo-1553530666-ba11a90a0148?q=80&w=736&auto=format&fit=crop",
    tags: ["Non-Alcoholic", "Healthy"],
    allergens: ["Dairy"],
    preparationTime: "5 min",
    rating: 4.8,
    cuisineType: "international",
    vegetarian: true,
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
    price: "$5.49",
    category: "drinks",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=687&auto=format&fit=crop",
    tags: ["Non-Alcoholic", "Refreshing"],
    preparationTime: "5 min",
    rating: 4.6,
    cuisineType: "american",
    vegetarian: true,
    vegan: true,
    glutenFree: true,
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
    name: "Cucumber Mint Cooler",
    description: "Fresh cucumber, mint, lime, and sparkling water for a refreshing drink",
    price: "$5.99",
    category: "drinks",
    image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?q=80&w=1470&auto=format&fit=crop",
    tags: ["Non-Alcoholic", "Refreshing"],
    preparationTime: "5 min",
    rating: 4.5,
    cuisineType: "international",
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    nutrition: {
      calories: 80,
      protein: "0g",
      carbs: "18g",
      fat: "0g",
      sodium: "10mg",
      fiber: "1g",
      sugar: "16g"
    },
    ingredients: ["Cucumber", "Mint", "Lime", "Simple syrup", "Sparkling water", "Ice"]
  },
  {
    id: "drink-5",
    name: "Green Detox Juice",
    description: "Freshly pressed kale, cucumber, celery, apple, and ginger",
    price: "$6.99",
    category: "drinks",
    image: "https://images.unsplash.com/photo-1622597467835-5f3f8a7dc298?q=80&w=1974&auto=format&fit=crop",
    tags: ["Non-Alcoholic", "Healthy", "Detox"],
    preparationTime: "5 min",
    rating: 4.7,
    cuisineType: "international",
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    nutrition: {
      calories: 110,
      protein: "2g",
      carbs: "26g",
      fat: "0g",
      sodium: "30mg",
      fiber: "3g",
      sugar: "18g"
    },
    ingredients: ["Kale", "Cucumber", "Celery", "Green apple", "Ginger", "Lemon"]
  },
  {
    id: "drink-6",
    name: "Turmeric Golden Milk",
    description: "Warm plant-based milk infused with turmeric, cinnamon, ginger, and honey",
    price: "$5.99",
    category: "drinks",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=2070&auto=format&fit=crop",
    tags: ["Non-Alcoholic", "Healthy", "Anti-inflammatory"],
    preparationTime: "8 min",
    rating: 4.6,
    cuisineType: "indian",
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    nutrition: {
      calories: 140,
      protein: "4g",
      carbs: "16g",
      fat: "7g",
      sodium: "45mg",
      fiber: "0g",
      sugar: "14g"
    },
    ingredients: ["Almond milk", "Turmeric", "Cinnamon", "Ginger", "Black pepper", "Honey"]
  },
  {
    id: "drink-7",
    name: "Cold Brew Coffee",
    description: "Smooth, low-acidity coffee brewed for 24 hours with filtered water",
    price: "$4.99",
    category: "drinks",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=2069&auto=format&fit=crop",
    tags: ["Non-Alcoholic", "Caffeinated"],
    preparationTime: "3 min",
    rating: 4.8,
    cuisineType: "international",
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    nutrition: {
      calories: 15,
      protein: "0g",
      carbs: "0g",
      fat: "0g",
      sodium: "5mg",
      fiber: "0g",
      sugar: "0g"
    },
    ingredients: ["Organic coffee beans", "Filtered water"]
  },
  {
    id: "drink-8",
    name: "Kombucha",
    description: "House-fermented probiotic tea with hints of ginger and berries",
    price: "$5.99",
    category: "drinks",
    image: "https://images.unsplash.com/photo-1596132117211-2f1a0997abd1?q=80&w=1974&auto=format&fit=crop",
    tags: ["Non-Alcoholic", "Fermented", "Probiotic"],
    preparationTime: "3 min",
    rating: 4.6,
    cuisineType: "international",
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    nutrition: {
      calories: 60,
      protein: "0g",
      carbs: "14g",
      fat: "0g",
      sodium: "10mg",
      fiber: "0g",
      sugar: "10g"
    },
    ingredients: ["Organic tea", "Sugar", "SCOBY culture", "Ginger", "Mixed berries"]
  },
  
  // Desserts
  {
    id: "dessert-1",
    name: "Vegan Chocolate Cake",
    description: "Rich, moist chocolate cake made without eggs or dairy, topped with ganache",
    price: "$8.99",
    category: "desserts",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1974&auto=format&fit=crop",
    popular: true,
    tags: ["Vegan", "Rich"],
    allergens: ["Gluten"],
    preparationTime: "15 min",
    rating: 4.9,
    cuisineType: "american",
    vegetarian: true,
    vegan: true,
    nutrition: {
      calories: 380,
      protein: "4g",
      carbs: "58g",
      fat: "16g",
      sodium: "220mg",
      fiber: "3g",
      sugar: "38g"
    },
    ingredients: ["Flour", "Cocoa powder", "Plant-based milk", "Vegetable oil", "Sugar", "Vanilla extract", "Dark chocolate"]
  },
  {
    id: "dessert-2",
    name: "Berry Crumble",
    description: "Warm mixed berry filling with a crunchy oat and almond topping, served with coconut ice cream",
    price: "$7.99",
    category: "desserts",
    image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?q=80&w=1470&auto=format&fit=crop",
    tags: ["Fruity", "Gluten-Free"],
    allergens: ["Nuts"],
    preparationTime: "20 min",
    rating: 4.7,
    cuisineType: "american",
    vegetarian: true,
    vegan: true,
    nutrition: {
      calories: 340,
      protein: "4g",
      carbs: "48g",
      fat: "14g",
      sodium: "80mg",
      fiber: "6g",
      sugar: "26g"
    },
    ingredients: ["Mixed berries", "Oats", "Almonds", "Coconut sugar", "Cinnamon", "Coconut oil", "Coconut ice cream"]
  },
  {
    id: "dessert-3",
    name: "Tiramisu",
    description: "Espresso-soaked ladyfingers layered with mascarpone cream and dusted with cocoa",
    price: "$9.99",
    category: "desserts",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=735&auto=format&fit=crop",
    tags: ["Italian", "Coffee"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    preparationTime: "25 min",
    rating: 4.7,
    cuisineType: "italian",
    vegetarian: true,
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
    price: "$10.99",
    category: "desserts",
    image: "https://images.unsplash.com/photo-1559742811-822873691df8?q=80&w=1974&auto=format&fit=crop",
    tags: ["Fruity", "Colorful"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    preparationTime: "30 min",
    rating: 4.6,
    cuisineType: "french",
    vegetarian: true,
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
  {
    id: "dessert-5",
    name: "Crème Brûlée",
    description: "Rich vanilla custard with a crisp caramelized sugar top",
    price: "$8.99",
    category: "desserts",
    image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?q=80&w=1470&auto=format&fit=crop",
    tags: ["French", "Creamy"],
    allergens: ["Dairy", "Eggs"],
    preparationTime: "20 min",
    rating: 4.8,
    cuisineType: "french",
    vegetarian: true,
    glutenFree: true,
    nutrition: {
      calories: 380,
      protein: "5g",
      carbs: "32g",
      fat: "26g",
      sodium: "120mg",
      fiber: "0g",
      sugar: "28g"
    },
    ingredients: ["Heavy cream", "Egg yolks", "Vanilla bean", "Sugar"]
  },
  {
    id: "dessert-6",
    name: "Apple Pie",
    description: "Classic American apple pie with cinnamon and nutmeg, served with vanilla ice cream",
    price: "$7.99",
    category: "desserts",
    image: "https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?q=80&w=1374&auto=format&fit=crop",
    tags: ["Classic", "American"],
    allergens: ["Gluten", "Dairy"],
    preparationTime: "25 min",
    rating: 4.7,
    cuisineType: "american",
    vegetarian: true,
    nutrition: {
      calories: 420,
      protein: "4g",
      carbs: "62g",
      fat: "18g",
      sodium: "220mg",
      fiber: "3g",
      sugar: "38g"
    },
    ingredients: ["Apples", "Flour", "Butter", "Sugar", "Cinnamon", "Nutmeg", "Vanilla ice cream"]
  },
  {
    id: "dessert-7",
    name: "Raw Vegan Cheesecake",
    description: "Cashew-based cheesecake with a date-nut crust and fresh berry topping",
    price: "$8.99",
    category: "desserts",
    image: "https://images.unsplash.com/photo-1560180474-e8563fd75bab?q=80&w=1974&auto=format&fit=crop",
    tags: ["Vegan", "Raw", "Gluten-Free"],
    allergens: ["Nuts"],
    preparationTime: "20 min (plus chilling)",
    rating: 4.8,
    cuisineType: "american",
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    nutrition: {
      calories: 420,
      protein: "8g",
      carbs: "38g",
      fat: "28g",
      sodium: "60mg",
      fiber: "4g",
      sugar: "28g"
    },
    ingredients: ["Cashews", "Coconut cream", "Dates", "Almonds", "Maple syrup", "Coconut oil", "Lemon juice", "Fresh berries"]
  },
  {
    id: "dessert-8",
    name: "Dark Chocolate Avocado Mousse",
    description: "Silky chocolate mousse made with ripe avocados and topped with berries",
    price: "$7.99",
    category: "desserts",
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=2072&auto=format&fit=crop",
    tags: ["Vegan", "Healthy", "Gluten-Free"],
    allergens: [],
    preparationTime: "10 min",
    rating: 4.6,
    cuisineType: "international",
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    nutrition: {
      calories: 280,
      protein: "4g",
      carbs: "28g",
      fat: "18g",
      sodium: "10mg",
      fiber: "8g",
      sugar: "16g"
    },
    ingredients: ["Avocados", "Dark chocolate", "Maple syrup", "Almond milk", "Vanilla extract", "Cacao powder", "Fresh berries"]
  },
  
  // Deals (with hasDiscount flag and adjusted prices)
  {
    id: "deal-1",
    name: "Family Meal Deal",
    description: "Four entrées, two sides, and a dessert to share",
    price: "$79.99",
    discountPrice: "$59.99",
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
    price: "$59.99",
    discountPrice: "$45.99",
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
    price: "$19.99",
    discountPrice: "$15.99",
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
  },
  {
    id: "deal-4",
    name: "Healthy Starter Pack",
    description: "Two superfood bowls, two green juices, and two protein balls",
    price: "$34.99",
    discountPrice: "$27.99",
    category: "deals",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=2070&auto=format&fit=crop",
    hasDiscount: true,
    tags: ["Healthy", "Value", "Vegan-Optional"],
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    nutrition: {
      calories: 1200,
      protein: "60g",
      carbs: "130g",
      fat: "45g"
    }
  },
  {
    id: "deal-5",
    name: "Weekly Meal Prep",
    description: "Five prepped meals with protein, complex carbs, and vegetables",
    price: "$64.99",
    discountPrice: "$49.99",
    category: "deals",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=2072&auto=format&fit=crop",
    hasDiscount: true,
    tags: ["Meal Prep", "Healthy", "Weekly"],
    nutrition: {
      calories: 2500,
      protein: "150g",
      carbs: "280g",
      fat: "80g"
    }
  }
];

// Add additional menu items
export const allMenuItems = [...menuItems, ...additionalMenuItems];

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

// Function to get meals by category
export const getMealsByCategory = (category: string) => {
  if (category === 'all') {
    return allMenuItems;
  }
  return allMenuItems.filter(item => item.category === category);
};

// Function to get all categories
export const getAllCategories = () => {
  return menuCategories.map(category => category.id);
};

// Function to get popular meals
export const getPopularMeals = () => {
  return allMenuItems.filter(item => item.popular);
};

// Function to get meal by ID
export const getMealById = (id: string) => {
  return allMenuItems.find(item => item.id === id);
};

// Function explicitly for DishDetails.tsx
export const getMenuItemById = (id: string) => {
  return allMenuItems.find(item => item.id === id);
};

// Function to get all meals
export const getAllMeals = () => {
  return allMenuItems;
};

// Function to get deals
export const getDeals = () => {
  return allMenuItems.filter(item => item.hasDiscount);
};

// Function to search meals by name or description
export const searchMeals = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return allMenuItems.filter(
    item => 
      item.name.toLowerCase().includes(lowerQuery) || 
      item.description.toLowerCase().includes(lowerQuery) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) ||
      (item.cuisineType && item.cuisineType.toLowerCase().includes(lowerQuery))
  );
};
