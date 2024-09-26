const mongoose = require("mongoose");

const artistsDesignSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  company: { type: String, default: "artist" },
  productImages: { type: [String], required: true },
  description: { type: String, required: true },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("ArtistProduct", artistsDesignSchema);
