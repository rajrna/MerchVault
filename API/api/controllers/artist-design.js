exports.get_artist_designs = (req, res, next) => {
  ArtistProduct.find()
    .select("_id name company productImages description")
    .exec()
    .then((docs) => {
      const response = docs.map((doc) => {
        return {
          id: doc._id, // Rename _id to id
          name: doc.name,
          company: doc.company,
          image:
            doc.productImages && doc.productImages.length > 0
              ? req.protocol +
                "://" +
                req.get("host") +
                "/" +
                doc.productImages[0]
              : null, // Create full URL for image
          description: doc.description,
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
