const Product = require("../models/product");
const Review = require("../models/review");
const mongoose = require("mongoose");

const express = require("express");
const router = express.Router();

const ReviewContoller = require("../controllers/reviews");
const checkAuth = require("../middleware/check-auth");

// // Route to submit a review (requires user authentication)
// router.post(
//   "/:productId/submit-review",
//   checkAuth,
//   ReviewContoller.submitReview
// );

// // Route to get all reviews for a product (no authentication required)
// router.get("/:productId/get-review", ReviewContoller.getProductReviews);

module.exports = router;
