const express = require("express");
const { loginUser, signupUser } = require("../controller/userController");

// controller functions

const userRouter = express.Router();

// login route
userRouter.post("/login", loginUser);

// signup route
userRouter.post("/signup", signupUser);

module.exports = userRouter;
