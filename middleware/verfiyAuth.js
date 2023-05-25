const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const authHeaders = req.headers.Authorization || req.headers.authorization;

  if (!authHeaders) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authHeaders.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
