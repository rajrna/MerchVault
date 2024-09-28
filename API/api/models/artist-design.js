const mongoose = require("mongoose");

const artProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // URL or file path to the image
  status: { type: String, default: "Pending" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who submitted the product
  createdAt: { type: Date, default: Date.now },
});

const ArtistProduct = mongoose.model("ArtistProduct", artProductSchema);
module.exports = ArtistProduct;
