const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { sendEmail } = require("./emailservice");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/user");
const cartRoutes = require("./api/routes/cart");

mongoose.connect(
  "mongodb+srv://rajnepal1raj:oxjPhKB4xgEF5WAX@node-rest-shop.gsvab.mongodb.net/?retryWrites=true&w=majority&appName=node-rest-shop"
);

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads")); //makes upload folder available to everyone
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

//Routes whic should handle requests
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);
app.use("/cart", cartRoutes);

// Endpoint to send email
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await sendEmail(name, email, message);
    res.status(200).send("Email sent successfully.");
  } catch (error) {
    res.status(500).send("Error sending email: " + error.toString());
  }
});

//Error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
