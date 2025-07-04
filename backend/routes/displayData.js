const express = require("express");
const router = express.Router();

router.post("/displayData", async (req, res) =>{
    try{
        res.send([global.food_items , global.food_category]);
    }
    catch(err){
        console.error("Error in displayData route:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
} )

// Export the router
module.exports = router;