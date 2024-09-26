const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");

exports.addToCart = async (req, res) => {
  const userId = req.userData.userId; // Extracted from JWT
  const { productId, quantity, color, size } = req.body; // Extract fields from request body

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
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

// Get the user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate(
      "cartItems.productId"
    );
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

// Clear the user's cart
exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.params.userId });
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
};
