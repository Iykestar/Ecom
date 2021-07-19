const express = require("express");
const app = express();

// Import routes
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");

const PORT = 8000;

// Parse json
app.use(express.json());

// Set routes
app.use("/api/products", productRoute);
app.use("/api", userRoute);

app.listen(PORT, () => console.log(`server listening on ${PORT}....`));