const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const displayData = require('./routes/displayData');

// connect to MongoDB
const { mongoDB } = require('./db'); // only mongoDB for now
mongoDB(); // connects and fetches food_items


app.use(cors()); // <-- This line allows requests from different origins
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Middleware to parse JSON
app.use(express.json());
// Import routes
app.use("/api", require("./routes/CreateUser"));
app.use("/api", require("./routes/displayData"));
app.use("/api", require("./routes/loginuser"));
app.use("/api", require("./routes/OrderData"));
app.use("/api", require("./routes/myOrderData"));


// Sample route
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
