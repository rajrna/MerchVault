const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  company: { type: String },
  price: { type: Number, required: true },
  colors: { type: [String], required: true },
  productImages: { type: [String], required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  featured: { type: Boolean, default: false },
  stock: { type: Number, default: 1 },
  stars: { type: Number, default: 1 },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
