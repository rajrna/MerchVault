const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("../models/review");
const Product = require("../models/product");

// POST: Add a review to a product
exports.submitReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.userData.userId;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the user already submitted a review
    const existingReview = await Review.findOne({
      product: productId,
      user: userId,
    });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "User has already reviewed this product" });
    }

    // Create and save new review
    const newReview = new Review({
      user: userId,
      product: productId,
      rating,
      comment,
    });

    await newReview.save();

    // Update product's average rating and review count
    const reviews = await Review.find({ product: productId });
    const reviewCount = reviews.length;
    const averageRating =
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviewCount;

    product.reviewCount = reviewCount;
    product.averageRating = averageRating;
    await product.save();

    res
      .status(201)
      .json({ message: "Review submitted successfully", review: newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET: Retrieve reviews for a product
exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find all reviews for the product and populate the user information
    const reviews = await Review.find({ product: productId }).populate(
      "user",
      "name"
    );

    if (!reviews) {
      return res
        .status(404)
        .json({ message: "No reviews found for this product" });
    }

    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
