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
  delivery_address: { type: String, required: true }, // Change to just a string
  shipping: { type: Boolean, default: true },
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

// Pre-save hook to calculate the totalAmount
orderSchema.pre("save", function (next) {
  this.totalAmount = this.cartItems.reduce((total, item) => {
    // Ensure the product price is accessible here
    return total + item.quantity * item.productId.price;
  }, 0);
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
