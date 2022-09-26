const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Project Model
const Project = require("../models/Project");
const User = require("../models/User");

// @route POST project
// @desc Create a project
// @access Public

router.post(
  "/",
  [
    check("name", "Please add name").not().isEmpty(),
    check("description", "Please add description").not().isEmpty(),
    check("owner", "Please add owner").not().isEmpty(),
  ],
  async (req, res) => {
    const { name, description, owner } = req.body;

    const user = await User.findById(owner);

    Project.findOne({ name }).then((project) => {
      if (project)
        return res.status(400).json({ msg: "Project already exists" });

      const newProject = new Project({
        name,
        description,
        owner,
        members: [
          {
            name: user.name,
            email: user.email,
            permission: "admin",
          },
        ],
      });

      newProject.save().then((project) => {
        res.json({
          project: {
            id: project.id,
            name: project.name,
            description: project.description,
            owner: project.owner,
          },
        });
      });
    });
  }
);

module.exports = router;
