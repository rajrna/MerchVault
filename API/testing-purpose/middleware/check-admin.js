const jwt = require("jsonwebtoken");
const User = require("../models/user2"); // Import the user model

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;

    // Find the user and check if they are an admin
    User.findById(req.userData.userId)
      .then((user) => {
        if (user && user.admin) {
          next(); // Allow access if user is an admin
        } else {
          return res.status(403).json({
            message: "Access denied: Admins only",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
