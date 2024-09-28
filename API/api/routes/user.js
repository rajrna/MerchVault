const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkAuth = require("../middleware/check-auth");

const User = require("../models/user");

const UserController = require("../controllers/user");
const AuthenticationController = require("../controllers/authentication");
router.post("/signup", UserController.user_signup);
///////////////login route
router.post("/login", UserController.user_login);

////////////////////////////DELETE USER
router.delete("/:userId", checkAuth, UserController.user_delete);

router.patch("/updateUser", checkAuth, UserController.user_update);

router.get("/check", checkAuth, AuthenticationController.check_auth);

router.get("/userdata", checkAuth, UserController.getUserInfo);
module.exports = router;
