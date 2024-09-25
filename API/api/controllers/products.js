const mongoose = require("mongoose");
const Product = require("../models/product");

// exports.products_get_all = (req, res, next) => {
//   Product.find()
//     .select("name price _id productImage")
//     .exec()
//     .then((docs) => {
//       const response = {
//         count: docs.length,
//         products: docs.map((doc) => {
//           return {
//             name: doc.name,
//             price: doc.price,
//             productImage: doc.productImage,
//             _id: doc.id,
//             request: {
//               type: "GET",
//               url: "http://localhost:3000/products/" + doc.id,
//             },
//           };
//         }),
//       };
//       // if (docs.length >= 0) {
//       res.status(200).json(response);
//       // } else {
//       //   res.status(404).json({
//       //     message: "No entries found",
//       //   });
//       // }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// };
exports.products_get_all = (req, res, next) => {
  Product.find()
    .select(
      "_id name company price colors productImages description category featured"
    )
    .exec()
    .then((docs) => {
      const response = docs.map((doc) => {
        return {
          id: doc._id, // Rename _id to id
          name: doc.name,
          company: doc.company,
          price: doc.price,
          colors: doc.colors,
          image:
            doc.productImages && doc.productImages.length > 0
              ? req.protocol +
                "://" +
                req.get("host") +
                "/" +
                doc.productImages[0]
              : null, // Create full URL for image
          description: doc.description,
          category: doc.category,
          featured: doc.featured,
        };
      });

      res.status(200).json(response); // Remove the wrapping "products" key
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
///////////////SINGLE PRODUCT
// exports.products_get_product = (req, res, next) => {
//   const id = req.params.productId;

//   Product.findById(id)
//     .select(
//       "name price _id productImages description category stock stars reviews company colors"
//     )
//     .exec()
//     .then((doc) => {
//       if (!doc) {
//         return res.status(404).json({ message: "Product not found" });
//       }

//       // Construct the response object
//       const response = {
//         id: doc._id, // Rename _id to id
//         name: doc.name,
//         company: doc.company, // Make sure company is selected and returned
//         price: doc.price,
//         colors: doc.colors, // Ensure colors exist in your model
//         image:
//           doc.productImages && doc.productImages.length > 0
//             ? `${req.protocol}://${req.get("host")}/${doc.productImages[0]}`
//             : null, // Construct full URL for the image
//         description: doc.description,
//         category: doc.category,
//         stock: doc.stock,
//         stars: doc.stars,
//         reviews: doc.reviews,
//       };

//       res.status(200).json(response); // Return single product object
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).json({ error: err });
//     });
// };
exports.products_get_product = (req, res, next) => {
  const id = req.params.productId;

  Product.findById(id)
    .select(
      "name price _id productImages description category stock stars reviews company colors"
    )
    .exec()
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Map over productImages to include additional details for each image
      const images = doc.productImages.map((img, index) => ({
        id: `randomid${index + 1}`, // Generate or retrieve unique ids for each image
        width: 1080, // Example width, replace with actual if available
        height: 650, // Example height, replace with actual if available
        url: `${req.protocol}://${req.get("host")}/${img}`, // Construct full URL for each image
        filename: img, // Use the image name from your productImages array
        size: 1080, // Example size, replace with actual if available
        type: "image/png", // Example type, replace with actual if available
      }));

      // Construct the response object with the desired structure
      const response = {
        id: doc._id, // Rename _id to id
        name: doc.name,
        company: doc.company, // Ensure company is included
        price: doc.price,
        colors: doc.colors, // Assuming colors is an array in your model
        description: doc.description,
        category: doc.category,
        shipping: doc.stock > 0, // Determine if shipping is available based on stock
        stock: doc.stock,
        stars: doc.stars,
        reviews: doc.reviews.length, // Assuming reviews is an array, return the count
        image: images, // Use the mapped image array for the response
      };

      res.status(200).json(response); // Return single product object
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
};
////////////////////CREATE PRODUCT
exports.products_create_product = (req, res, next) => {
  // Ensure colors are an array (if needed)
  let colorsArray = req.body.colors;

  // If colors are passed as a string, convert to array
  if (typeof colorsArray === "string") {
    colorsArray = colorsArray.split(",").map((color) => color.trim());
  }
  // Ensure multiple images are uploaded
  const productImages = req.files.map((file) => file.path); // Map file paths from multiple upload
  // Create a new product instance
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImages: productImages, // Assuming you're using Multer for file uploads
    description: req.body.description,
    company: req.body.company,
    colors: colorsArray, // Use the parsed colors array
    category: req.body.category,
    featured: req.body.featured || false, // Default to false if not provided
  });

  // Save the product to the database
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
          id: result._id, // Return id instead of _id
          name: result.name,
          price: result.price,
          image: result.productImages.map(
            (img) => "http://localhost:8080/" + img
          ), // Full URLs for each image
          description: result.description,
          company: result.company,
          colors: result.colors,
          category: result.category,
          featured: result.featured,
          request: {
            type: "GET",
            url: "http://localhost:3000/products/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

///////////////////////PATCH
exports.products_update_product = (req, res, next) => {
  const id = req.params.id;
  Product.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then((result) =>
      res.status(200).json({
        message: "Product updated",
        // request: {
        //   type: "GET",
        //   url: "http://localhost:/products/" + id,
        // },
      })
    )
    .catch((err) => res.status(500).json({ error: err }));
};

//////////////////////////////DELETE
exports.products_delete_product = (req, res, next) => {
  const id = req.params.productId;
  Product.deleteOne({
    _id: id,
  })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
