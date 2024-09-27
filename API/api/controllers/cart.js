const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");

exports.addToCart = async (req, res) => {
  const userId = req.userData.userId; // Extracted from JWT
  const { productId, quantity, color, size } = req.body; // Extract fields from request body
  console.log("Adding to cart for user:", userId);
  try {
    // Validate the userId format
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If no cart exists for the user, create a new one
      cart = new Cart({ userId, cartItems: [] });
    }

    // Validate productId format
    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ message: "Invalid productId format" });
    }

    // Check if the product already exists in the cart
    const itemIndex = cart.cartItems.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.color === color &&
        item.size === size
    );

    if (itemIndex > -1) {
      // If product exists, increment its quantity
      cart.cartItems[itemIndex].quantity += quantity;
    } else {
      // Otherwise, push a new product to cartItems
      cart.cartItems.push({ productId, quantity, color, size });
    }

    await cart.save(); // Save the cart after modifications
    res.status(200).json(cart); // Respond with the updated cart
  } catch (error) {
    console.error("Error adding to cart:", error); // Log the error
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

// Get the user's cart
// exports.getCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ userId: req.params.userId }).populate(
//       "cartItems.productId"
//     );
//     res.status(200).json(cart);
//     console.log(req.params.userId);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching cart", error });
//   }
// };
exports.getCart = async (req, res) => {
  try {
    // Log req.user to ensure it's being set correctly
    console.log("req.userData:", req.userData);

    // Extract the userId from the decoded JWT (attached by the JWT middleware)
    const userId = req.userData.userId; // Ensure that this matches the field in your JWT payload
    console.log("Fetching cart for user:", userId);

    // Fetch the user's cart based on the userId from the token
    const cart = await Cart.findOne({ userId }).populate("cartItems.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Send the cart back to the client
    res.status(200).json(cart);
  } catch (error) {
    // Log the error to see the full details
    console.error("Error fetching cart:", error);

    // Return more detailed error information for debugging
    res
      .status(500)
      .json({ message: "Error fetching cart", error: error.message || error });
  }
};

// Clear the user's cart
exports.clearCart = async (req, res) => {
  try {
    const userId = req.userData.userId;
    console.log("Clearing cart for user:", userId);

    await Cart.findOneAndDelete({ userId });
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    console.error("Error clearing cart:", error); // Log the error
    res.status(500).json({ message: "Error clearing cart", error });
  }
};
