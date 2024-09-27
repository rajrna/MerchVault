const mongoose = require("mongoose");
const PosterProduct = require("../models/product-poster");

//Get all products related to apparels
exports.products_get_all = (req, res, next) => {
  PosterProduct.find()
    .select("name price _id productImage description rating ")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          return {
            name: doc.name,
            price: doc.price,
            productImage: doc.productImage,
            description: doc.description,
            rating: doc.rating,
            reviews: doc.reviews,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

///////////get a single apparel using id
exports.products_get_product = (req, res, next) => {
  const id = req.params.productId;
  PosterProduct.findById(id)
    .select("name price _id productImage description rating reviews")
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/products/" + doc._id,
          },
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
////////////creating new product

exports.products_create_product = (req, res, next) => {
  const product = new PosterProduct({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
    description: req.body.description,
    rating: 0, // Initialize with 0, as no reviews exist yet
    reviews: [], // Initialize with an empty array for reviews
  });
  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
          name: result.name,
          price: result.price,
          description: result.description,
          rating: result.rating,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/products/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

////////////////Update product
exports.products_update_product = (req, res, next) => {
  const id = req.params.productId;
  PosterProduct.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/products/" + result._id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

//////////////Add review
exports.add_product_review = (req, res, next) => {
  const productId = req.params.productId;
  const newReview = {
    userId: req.body.userId,
    username: req.body.username,
    rating: req.body.rating,
    comment: req.body.comment,
  };

  PosterProduct.findById(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Add new review to product's reviews array
      product.reviews.push(newReview);

      // Calculate the new average rating
      const totalReviews = product.reviews.length;
      const averageRating =
        product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        totalReviews;

      // Update product's rating
      product.rating = averageRating;

      return product.save();
    })
    .then((updatedProduct) => {
      res.status(200).json({
        message: "Review added successfully",
        product: updatedProduct,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

/////////////delete product
exports.products_delete_product = (req, res, next) => {
  const id = req.params.productId;
  PosterProduct.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/products",
          body: { name: "String", price: "Number" },
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
