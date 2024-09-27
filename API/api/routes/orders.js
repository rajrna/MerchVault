const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/orders");
const checkAuth = require("../middleware/check-auth");

router.post("/place-order/", checkAuth, OrderController.createOrder);

router.get("/get-my-orders/", checkAuth, OrderController.getUserOrders);

router.get("/order-by-id/:orderId", checkAuth, OrderController.getOrderById);

router.patch(
  "/update-order-status/:orderId",
  checkAuth,
  OrderController.updateOrderStatus
);

module.exports = router;
