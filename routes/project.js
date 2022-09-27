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

// @route GET project
// @desc Get all projects
// @access Public

router.get("/all", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// @route POST project
// @desc Post projects created by user
// @access Public

router.post("/created", async (req, res) => {
  const { token } = req.body;
  const id = jwt.verify(token, config.get("jwtSecret")).user.id;
  const projects = await Project.find({ project_id: id });
  res.json(projects);
});

// @route POST project
// @desc Post projects shared with user
// @access Public

router.post("/shared", async (req, res) => {
  const { token } = req.body;
  const id = jwt.verify(token, config.get("jwtSecret")).user.id;
  //  get user from token
  const user = await User.findById(id);

  //  get projects where user is a member
  const projects = await Project.find({ "members.email": user.email });
  res.json(projects);
});

module.exports = router;
