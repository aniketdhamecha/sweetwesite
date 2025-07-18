const mongoose = require("mongoose");

const FoodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  CategoryName: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  options: {
    type: [mongoose.Schema.Types.Mixed], // Since options is an array with objects inside
    required: true
  },
  description: {
    type: String,
    required: true
  },
  foodstock: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model("Food_Item", FoodItemSchema);
