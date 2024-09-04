const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = function (req, res, next) {
  const token = req.header("token");
  if (!token) {
    return res.status(401).json({ message: "No Token available" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SEC);
    req.user = decode.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
