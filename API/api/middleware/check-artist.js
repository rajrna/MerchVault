const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;

    //Find the user and check if they're artist
    User.findById(req.userData.userId)
      .then((user) => {
        if (user && user.artist) {
          next();
        } else {
          return res.status(403).json({
            message: "ACCESS DENIED, not an artist",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } catch (error) {
    return res.status(401).json({
      message: "Auth Failed",
    });
  }
};
