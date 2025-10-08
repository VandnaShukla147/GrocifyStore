const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/product.model");

dotenv.config();

const products = [
  // Fruits
  {
    name: "Apple",
    text: "Fresh and juicy apples.",
    price: 120,
    imgUrl: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=1170&auto=format&fit=crop",
    stock: 50,
    category: "fruit"
  },
  {
    name: "Banana",
    text: "Sweet ripe bananas.",
    price: 60,
    imgUrl: "https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=715&auto=format&fit=crop",
    stock: 100,
    category: "fruit"
  },
  {
    name: "Orange",
    text: "Citrus fresh oranges.",
    price: 90,
    imgUrl: "https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=1074&auto=format&fit=crop",
    stock: 80,
    category: "fruit"
  },
  // Vegetables
  {
    name: "Carrot",
    text: "Organic carrots.",
    price: 80,
    imgUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=687&auto=format&fit=crop",
    stock: 70,
    category: "vegetables"
  },
  {
    name: "Broccoli",
    text: "Fresh green broccoli.",
    price: 150,
    imgUrl: "https://images.unsplash.com/photo-1518164147695-36c13dd568f5?q=80&w=880&auto=format&fit=crop",
    stock: 40,
    category: "vegetables"
  },
  {
    name: "Tomato",
    text: "Ripe red tomatoes.",
    price: 60,
    imgUrl: "https://images.unsplash.com/photo-1546470427-e26264be0b0d?q=80&w=687&auto=format&fit=crop",
    stock: 100,
    category: "vegetables"
  },
  // Dairy
  {
    name: "Milk",
    text: "Pure and fresh cow milk.",
    price: 50,
    imgUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=687&auto=format&fit=crop",
    stock: 200,
    category: "dairy"
  },
  {
    name: "Cheese",
    text: "Delicious cheddar cheese.",
    price: 200,
    imgUrl: "https://images.unsplash.com/photo-1683314573422-649a3c6ad784?q=80&w=1170&auto=format&fit=crop",
    stock: 60,
    category: "dairy"
  },
  {
    name: "Yogurt",
    text: "Creamy plain yogurt.",
    price: 70,
    imgUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=687&auto=format&fit=crop",
    stock: 90,
    category: "dairy"
  },
  // Snacks
  {
    name: "Potato Chips",
    text: "Crispy and salty potato chips.",
    price: 30,
    imgUrl: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=1170&auto=format&fit=crop",
    stock: 120,
    category: "snacks"
  },
  {
    name: "Chocolate Bar",
    text: "Rich and creamy chocolate bar.",
    price: 40,
    imgUrl: "https://images.unsplash.com/photo-1623660053975-cf75a8be0908?q=80&w=687&auto=format&fit=crop",
    stock: 90,
    category: "snacks"
  },
  {
    name: "Cookies",
    text: "Delicious chocolate chip cookies.",
    price: 50,
    imgUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=765&auto=format&fit=crop",
    stock: 110,
    category: "snacks"
  },
  // Household
  {
    name: "Laundry Detergent",
    text: "Powerful cleaning laundry detergent.",
    price: 180,
    imgUrl: "https://images.unsplash.com/photo-1624372635282-b324bcdd4907?q=80&w=764&auto=format&fit=crop",
    stock: 35,
    category: "household"
  },
  {
    name: "Dish Soap",
    text: "Gentle and effective dish soap.",
    price: 60,
    imgUrl: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=1170&auto=format&fit=crop",
    stock: 80,
    category: "household"
  },
  {
    name: "Toilet Paper",
    text: "Soft and strong toilet paper.",
    price: 120,
    imgUrl: "https://images.unsplash.com/photo-1584556326561-c8746083993b?q=80&w=687&auto=format&fit=crop",
    stock: 150,
    category: "household"
  },
  // Drinks
  {
    name: "Orange Juice",
    text: "Fresh squeezed orange juice.",
    price: 80,
    imgUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=687&auto=format&fit=crop",
    stock: 60,
    category: "drinks"
  },
  {
    name: "Coffee",
    text: "Premium ground coffee.",
    price: 250,
    imgUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1170&auto=format&fit=crop",
    stock: 45,
    category: "drinks"
  },
  // Personal Care
  {
    name: "Shampoo",
    text: "Nourishing hair shampoo.",
    price: 180,
    imgUrl: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=1170&auto=format&fit=crop",
    stock: 70,
    category: "personal care"
  },
  {
    name: "Toothpaste",
    text: "Minty fresh toothpaste.",
    price: 60,
    imgUrl: "https://images.unsplash.com/photo-1622372738946-62e02505feb3?q=80&w=1332&auto=format&fit=crop",
    stock: 100,
    category: "personal care"
  },
  // Pet Care
  {
    name: "Dog Food",
    text: "Nutritious dog food.",
    price: 400,
    imgUrl: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=1171&auto=format&fit=crop",
    stock: 30,
    category: "pet care"
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    await Product.deleteMany();
    console.log("Products cleared");

    await Product.insertMany(products);
    console.log("Products seeded successfully");

    process.exit();
  } catch (err) {
    console.error("Error seeding products:", err);
    process.exit(1);
  }
};

seedProducts();