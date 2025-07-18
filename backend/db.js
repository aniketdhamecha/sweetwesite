const mongoose = require("mongoose");

// 1. Define User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  location: String,
  email: String,
  password: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

// 2. Register User model
const User = mongoose.model("User", UserSchema);

// 3. Define FoodItem Schema with stock field
const FoodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  CategoryName: { type: String, required: true },
  img: { type: String, required: true },
  description: { type: String },
  options: [
    {
      type: Map,
      of: Number,
    },
  ],
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
});

// 4. Register FoodItem model
const FoodItem = mongoose.model("food_item", FoodItemSchema);

// 5. Connect to MongoDB and preload global data
const mongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/sweetWeb", {});
    console.log("MongoDB connected ✅");

    const foodCollection = mongoose.connection.db.collection("food_items");
    const data = await foodCollection.find({}).toArray();
    console.log("All Food Items:", data); 

    const foodCategory = mongoose.connection.db.collection("food_category");
    const foodCategoryData = await foodCategory.find({}).toArray();

    global.food_items = data;
    global.food_category = foodCategoryData;
  } catch (err) {
    console.error("Error connecting or fetching data:", err);
  }
};

// 6. Function to update stock (✅ with ObjectId fix)
const updateStock = async (foodId, quantity) => {
  try {
    // Ensure foodId is a valid ObjectId
    const objectId = new mongoose.Types.ObjectId(foodId);

    const foodItem = await FoodItem.findById(objectId);

    if (!foodItem) {
      throw new Error("Food item not found");
    }

    if (foodItem.stock < quantity) {
      throw new Error("Not enough stock available");
    }

    foodItem.stock -= quantity;
    await foodItem.save();

    return { success: true, newStock: foodItem.stock };
  } catch (err) {
    console.error("Error updating stock:", err.message);
    return { success: false, message: err.message };
  }
};

// 7. Export everything
module.exports = {
  mongoDB,
  User,
  FoodItem,
  updateStock,
};