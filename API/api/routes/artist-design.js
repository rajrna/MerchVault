const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const ArtistProductController = require("../controllers/artist-design");

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/artist-submission"); // Folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique file name
  },
});
const upload = multer({ storage });

// Route to submit a new product (authenticated)
router.post(
  "/submit-products",
  checkAuth,
  upload.single("image"),
  ArtistProductController.submitProduct
);
router.get(
  "/get-my-designs",
  checkAuth,
  ArtistProductController.getUserProducts
);
module.exports = router;
