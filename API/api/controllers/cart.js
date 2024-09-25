const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
// const Cart = require("../models/cart"); // Your Cart model for MongoDB

// Add item to the cart
// exports.carts_add_item =
router.post("/add", async (req, res) => {
  try {
    const { userId, productId, color, amount } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const product = { productId, color, amount };
    cart.items.push(product);
    await cart.save();

    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update cart (increment, decrement, etc.)
// exports.carts_update_cart=
router.put("/update", async (req, res) => {
  // Implement update logic based on the action needed (increment/decrement)
});

// Remove item from the cart
// exports.carts_delete_item=
router.delete("/remove/:id", async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;

  let cart = await Cart.findOne({ userId });
  cart.items = cart.items.filter((item) => item.productId !== id);
  await cart.save();

  res.status(200).json(cart);
});

// Clear cart
router.delete("/clear", async (req, res) => {
  const { userId } = req.body;
  await Cart.deleteOne({ userId });
  res.status(200).json({ message: "Cart cleared" });
});

module.exports = router;
