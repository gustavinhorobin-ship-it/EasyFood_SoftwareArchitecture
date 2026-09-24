const express = require("express");
const cors = require("cors");
const path = require("path");
const restaurantRoutes =
require("./modules/restaurants/restaurant.routes");
const app = express();
const authRoutes =
  require("./modules/auth/auth.routes");
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use(
express.static(
path.join(__dirname, "../public")
)
);
app.use("/restaurants", restaurantRoutes);
module.exports = app;