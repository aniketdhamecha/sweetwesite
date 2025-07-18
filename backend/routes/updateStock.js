// routes/updateStock.js
const express = require('express');
const router = express.Router();
const { updateStock } = require('../db'); // adjust path if needed

router.post('/updateStock', async (req, res) => {
  const { foodId, quantity } = req.body;

  const result = await updateStock(foodId, quantity);
  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

module.exports = router;