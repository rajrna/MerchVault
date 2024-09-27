// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_KEY);
//     req.userData = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       message: "Auth failed",
//     });
//   }
// };
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Check if authorization header is present
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Extract token from header
    const token = req.headers.authorization.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Log decoded token for debugging
    console.log("Decoded token:", decoded);

    // Attach user data to request
    req.userData = decoded; // Ensure consistency in property name

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    console.error("Auth failed:", error); // Log the error for debugging
    return res.status(401).json({ message: "Auth failed" });
  }
};
