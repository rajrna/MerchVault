const Order = require("../models/order");
const Cart = require("../models/cart");
const User = require("../models/user");
// Place a new order
exports.createOrder = async (req, res) => {
  const userId = req.userData.userId; // Get userId from JWT
  const { delivery_address, totalAmount } = req.body;

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Create a new order
    const newOrder = new Order({
      userId,
      cartItems: cart.cartItems,
      delivery_address, // This is now a string
      totalAmount,
      paymentMethod: "Cash on Delivery", // Assuming cash on delivery
    });

    // Save the order to the database
    await newOrder.save();

    // Clear the user's cart after placing the order
    await Cart.findOneAndDelete({ userId });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

// Get orders for a user
exports.getUserOrders = async (req, res) => {
  const userId = req.userData.userId; // Get userId from JWT

  try {
    const orders = await Order.find({ userId }).populate("cartItems.productId");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};
// Get a single order by orderId
exports.getOrderById = async (req, res) => {
  const userId = req.userData.userId; // Get userId from JWT
  const { orderId } = req.params;

  try {
    const order = await Order.findOne({ _id: orderId, userId }).populate(
      "cartItems.productId"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};

// Update order status and shipping status
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { orderStatus, shipping } = req.body;

  try {
    // Find the order by ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update order status and shipping status
    if (orderStatus !== undefined) {
      order.orderStatus = orderStatus;
    }

    if (shipping !== undefined) {
      order.shipping = shipping;
    }

    await order.save();

    res.status(200).json({ message: "Order updated", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
};
