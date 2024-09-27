// In user controller or a separate controller for authentication
exports.check_auth = (req, res, next) => {
  if (req.userData) {
    console.log("User authenticated:", req.userData);
    res.status(200).json({
      user: req.userData,
    });
  } else {
    res.status(401).json({
      message: "Not authenticated",
    });
  }
};
