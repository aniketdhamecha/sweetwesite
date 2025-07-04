const mongoose = require('mongoose');

// 1. Define UserSchema
const UserSchema = new mongoose.Schema({
  name: String,
  location: String,
  email: String,
  password: String,
  date: {
    type: Date,
    default: Date.now,
  }
});

// 2. Register the User model (exportable)
const User = mongoose.model('User', UserSchema);

// 3. Connect to MongoDB and fetch food_items
const mongoDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mernApp', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB connected ✅');

    const foodCollection = mongoose.connection.db.collection("food_items");
    const data = await foodCollection.find({}).toArray();
    const foodCategory = await mongoose.connection.db.collection("food_category");
    const foodCategoryData = await foodCategory.find({}).toArray();
    global.food_items = data;
    global.food_category = foodCategoryData;
    console.log("Fetched food_items:", global.food_items);
    console.log("Fetched foodCategory:", global.food_category);
    
  } catch (err) {
    console.error("Error fetching food_items:", err);
  }
};

// 4. Export mongoDB function and User model
module.exports = {
  mongoDB,
  User
};
