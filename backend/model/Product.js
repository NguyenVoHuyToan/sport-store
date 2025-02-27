const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  category: String,
  rating: Number,
  reviews: Number,
});

module.exports = mongoose.model("Product", ProductSchema);
