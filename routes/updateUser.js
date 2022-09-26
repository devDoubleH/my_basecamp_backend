const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// User Model
const User = require("../models/User");

// @route   PUT update/user
// @desc    Update user
// @access  Public

router.put(
  "/",
  [
    check("name", "Please add name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],

  (req, res) => {
    const { name, email, password } = req.body;

    if (validationResult(req).isEmpty()) {
      return res.status(400).json({ errors: validationResult(req).array() });
    }

    User.findOneAndUpdate(
      { email },
      { name, email, password },
      { new: true },
      (err, user) => {
        if (err) return res.status(500).send(err);
        return res.send(user);
      }
    );
  }
);

router.delete("/", check("Email", "Email is required!"), (req, res) => {
  const { email } = req.body;

  if (validationResult(req).isEmpty()) {
    return res.status(400).json({ errors: validationResult(req).array() });
  }

  User.findOneAndDelete({ email }, (err, user) => {
    if (err) return res.status(500).send(err);
    return res.send(user);
  });
});

module.exports = router;
