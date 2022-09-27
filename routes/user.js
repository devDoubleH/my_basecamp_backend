const express = require("express");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

router.post(
  "/",
  check("jwt", "Please enter a valid token"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { token } = req.body;

    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log(decoded);
    res.send(decoded);
  }
);

module.exports = router;
