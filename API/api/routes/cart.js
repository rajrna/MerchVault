const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const CartController = require("../controllers/cart");

const Cart = require("../models/cart");
const Order = require("../models/order");

router.post("/add-to-cart", checkAuth, CartController.addToCart);

router.get("/get-cart", checkAuth, CartController.getCart);

router.delete("/delete-cart", checkAuth, CartController.clearCart);

module.exports = router;
