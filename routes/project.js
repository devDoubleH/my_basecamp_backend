const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

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
    check("token", "Please add JWT").not().isEmpty(),
  ],
  async (req, res) => {
    const { name, description, token } = req.body;

    const id = jwt.verify(token, config.get("jwtSecret")).user.id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(id);

    Project.findOne({ name }).then((project) => {
      if (project)
        return res.status(400).json({ msg: "Project already exists" });

      const newProject = new Project({
        name,
        description,
        project_id: id,
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
