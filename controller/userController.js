const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/UserSchema");
require("dotenv").config();
const bcrypt = require("bcrypt");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ error: "password is incorrect" });
    if (!user)
      return res
        .status(400)
        .json({ error: "emaill or password is not correct" });

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, password, token });
  } catch (error) {
    res.status(400).json({ error: "error while signing in" });
  }
});

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // checking if it is already signed up
    const userIsExixt = await User.findOne({ email });
    if (userIsExixt) return res.json({ error: "user is already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    // create user
    const user = await User.create({ email, password: hashedPassword });

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, password: hashedPassword, token });
  } catch (error) {
    res.status(400).json({ error: 'type a valid email & password' });
  }
};

module.exports = { loginUser, signupUser };
