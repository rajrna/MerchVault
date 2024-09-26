const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const ProductsApparelController = require("../controllers/product-apparels");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
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

///////////////GET
router.get("/", ProductsApparelController.products_get_all);

// router for single get with id
router.get("/:productId", ProductsApparelController.products_get_product);

/////////////////////////////////////////////POST
router.post(
  "/",
  checkAuth,
  upload.single("productImage"),
  ProductsApparelController.products_create_product
);

///////////newPatch
router.patch(
  "/:id",
  checkAuth,
  ProductsApparelController.products_update_product
);

///////////////////////////////////////////////DELETE
router.delete(
  "/:productId",
  checkAuth,
  ProductsApparelController.products_delete_product
);
////////////////////////////////////////////
module.exports = router;
