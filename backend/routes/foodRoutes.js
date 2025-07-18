const express = require("express");
const router = express.Router();
const FoodItem = require("../models/FoodItem");

// ✅ Get all food items
router.get("/fooditems", async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.json(foodItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update food stock for a specific item directly
router.patch("/fooditems/:id/stock", async (req, res) => {
  try {
    const { stock } = req.body;
    const updatedItem = await FoodItem.findByIdAndUpdate(
      req.params.id,
      { foodstock: stock },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Decrease stock for a specific item
router.patch("/fooditems/:id/decrease-stock", async (req, res) => {
  const { qty } = req.body;
  const itemId = req.params.id;

  try {
    const item = await FoodItem.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.foodstock < qty) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    item.foodstock -= qty;
    await item.save();

    // Returning the full updated item
    res.json({ message: "Stock updated", updatedItem: item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
