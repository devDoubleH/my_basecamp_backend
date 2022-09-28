const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

router.post("/", check("id", "Please enter a valid id"), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.body;
  // find by id

  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({ msg: "User does not exist" });
  }
  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

module.exports = router;
