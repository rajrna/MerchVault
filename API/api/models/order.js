const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cartItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },

      color: String,
      size: String,
    },
  ],
  delivery_address: {
    name: { type: String, required: true },
    city: { type: String, required: true },
  },
  shipping: { type: Boolean, default: false },
  orderStatus: {
    type: String,
    default: "pending", // Other possible values: 'shipped', 'delivered', 'canceled'
  },
  paymentMethod: {
    type: String,
    default: "Cash on Delivery",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  totalAmount: {
    type: Number,
    required: true, // Total cost of the order
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
