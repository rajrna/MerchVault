const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const posterSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  productImage: { type: String, required: true },
  category: { type: String, required: true },
  size: { type: [String], required: true }, // Array of sizes (e.g., S, M, L)
  color: { type: String },
  description: { type: String }, // Detailed product description
  rating: { type: Number, default: 0 }, // Average rating for the product
  reviews: [reviewSchema], // Array of reviews
});

module.exports = mongoose.model("PosterProduct", posterSchema);
