const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const checkAuth = require("../middleware/check-auth");
const ProductsController = require("../controllers/products");
const ReviewContoller = require("../controllers/reviews");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});
// Middleware to handle multiple images (field name 'productImages')
const multipleUpload = upload.array("productImages", 5); // Array of images with a maximum of 5

const Product = require("../models/product");
const { request } = require("../../app");
const checkAdmin = require("../middleware/check-admin");

////////////////////////////////////////GET
router.get("/", multipleUpload, ProductsController.products_get_all);

// router for single get with id
router.get("/:productId", ProductsController.products_get_product);
/////////////////////////////////////////////POST

router.post(
  "/",
  checkAuth,
  checkAdmin,
  multipleUpload,
  ProductsController.products_create_product
);

//////////////////////////////////////////////PATCH
///////////newPatch
router.patch(
  "/:id",
  checkAuth,
  checkAdmin,
  ProductsController.products_update_product
);

///////////////////////////////////////////////DELETE
router.delete(
  "/:productId",
  checkAuth,
  ProductsController.products_delete_product
);
////////////////////////////////////////////

///////////////Review routes
// Route to submit a review (requires user authentication)
router.post(
  "/:productId/submit-review",
  checkAuth,
  ReviewContoller.submitReview
);

// Route to get all reviews for a product (no authentication required)
router.get("/:productId/get-review", ReviewContoller.getProductReviews);

module.exports = router;
