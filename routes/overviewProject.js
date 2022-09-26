const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
// Project Model
const Project = require("../models/Project");
const User = require("../models/User");

// @route POST project
// @desc Overview a project
// @access Public

router.post("/:id", async (req, res) => {
  const { discussion, task, comment, file } = req.body;

  Project.findOne({ _id: req.params.id }).then((project) => {
    if (project) return res.status(400).json({ msg: "Project already exists" });
  });

  if (discussion) {
    Project.discussions.push({
      comment: comment,
    });
  }
});
