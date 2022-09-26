const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Project Model
const Project = require("../models/Project");
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
  (req, res) => {
    const { name, description, owner } = req.body;

    if (validationResult(req).isEmpty()) {
      return res.status(400).json({ errors: validationResult(req).array() });
    }

    Project.findOne({ name }).then((project) => {
      if (project)
        return res.status(400).json({ msg: "Project already exists" });

      const newProject = new Project({
        name,
        description,
        owner,
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
