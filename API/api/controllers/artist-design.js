const ArtistProduct = require("../models/artist-design");
const User = require("../models/user");

// POST route to submit a new product
exports.submitProduct = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file.path; // Get the file path for the uploaded image
    const userId = req.userData.userId; // Assuming req.userData contains the authenticated user's ID

    // Find the user who is submitting the product
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create and save the new product in the database
    const newProduct = new ArtistProduct({
      name,
      description,
      image,
      status: "Pending", // Default status
      user: user._id, // Associate the product with the user
    });

    await newProduct.save();

    res.status(201).json(newProduct); // Return the newly created product
  } catch (error) {
    console.error("Error submitting product:", error);
    res.status(500).json({ message: "Failed to submit product" });
  }
};

// GET route to fetch products submitted by the authenticated user
exports.getUserProducts = async (req, res) => {
  try {
    const userId = req.userData.userId;

    const products = await ArtistProduct.find({ user: userId });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};
