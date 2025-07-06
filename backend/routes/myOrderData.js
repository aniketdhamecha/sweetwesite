const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/myOrderData", async (req, res) => {
    try {
        const orderData = await Order.findOne({ email: req.body.email });
        res.json({ success: true, orderData: orderData });
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

module.exports = router;
