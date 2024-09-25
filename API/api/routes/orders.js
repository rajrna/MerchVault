const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");

// const Product = require("../models/product");
// const Order = require("../models/order");
const { request } = require("../../app");

const OrdersController = require("../controllers/orders");
////////////////////////////////////////GET
router.get("/", checkAuth, OrdersController.orders_get_all);

router.get("/:orderId", checkAuth, OrdersController.orders_get_order);
/////////////////////////////////////////////POST
router.post("/", checkAuth, OrdersController.orders_create_order);
//
router.post("/:orderId", checkAuth, (req, res, next) => {
  res.status(201).json({
    message: "Order was created",
    orderId: req.params.orderId,
  });
});
//////////////////////////////////////////////PATCH

///////////////////////////////////////////////DELETE
router.delete("/:orderId", checkAuth, OrdersController.orders_delete_order);
////////////////////////////////////////////
module.exports = router;
