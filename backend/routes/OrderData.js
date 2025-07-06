const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

// Route 1: Create an order using POST "/api/order/createorder"
router.post("/OrderData", async (req, res) => {
    // console.log("Received order body:", req.body);
    let data = req.body.order_data;
    if (!Array.isArray(data)) return res.status(400).json({ success: false, message: "Invalid order_data" });

    data.splice(0, 0, { order_date: req.body.order_date });
   

    // if email not exist in db then create else update
    let eId = await Order.findOne({ 'email': req.body.email });
    // console.log("Email ID:", eId);
    if (eId === null) {
        try{
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                return res.status(200).json({ success: true, message: "Order created successfully" });
            })  
        }
        catch (error) {
            console.error("Error creating order:", error);
            return res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    }
    else{
        try {
            await Order.updateOne({ email: req.body.email }, {
                $push: { order_data: data }
            }).then(() => {
                return res.status(200).json({ success: true, message: "Order updated successfully" });
            })
            
        } catch (error) {
            console.error("Error updating order:", error);
            return res.status(500).json({ success: false, error: "Internal Server Error" });     
        }
    }
});


module.exports = router;