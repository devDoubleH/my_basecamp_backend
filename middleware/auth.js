const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.jwtToken;

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).join({ msg: "No token, authorization denied" });
  }

  try {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).json({ msg: "Token is not valid" });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (error) {
    console.error("something wrong with auth middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};
