const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const CartController = require("../controllers/cart");

const Cart = require("../models/cart");
const Order = require("../models/order");

// router.post("/add", CartController);
router.post("/create-order", async (req, res) => {
  const { userId, delivery_address } = req.body;

  try {
    // Fetch the user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate the total price
    const totalAmount = cart.cartItems.reduce((acc, item) => {
      return acc + item.quantity * item.productId.price; // Assuming product model has price
    }, 0);

    // Create a new Order
    const order = new Order({
      userId: cart.userId,
      cartItems: cart.cartItems, // Transfer cart items
      delivery_address, // Transfer delivery address
      shipping: true, // Cash on delivery implies confirmed order
      totalAmount, // Total amount of the order
    });

    // Save the order
    const savedOrder = await order.save();

    // Clear the cart after placing the order
    await Cart.findOneAndDelete({ userId });

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
