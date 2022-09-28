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
    check("id", "Please add ID").not().isEmpty(),
    check("description", "Please add description").not().isEmpty(),
  ],
  async (req, res) => {
    const { name, description, id } = req.body;

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
        owner: user.name,
        members: [
          {
            user_id: id,
            email: user.email,
            role: "owner",
            permissions: {
              create: true,
              read: true,
              update: true,
              delete: true,
            },
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
  const { id } = req.body;
  const projects = await Project.find({ project_id: id });
  res.json(projects);
});

// @route POST project
// @desc Post projects shared with user
// @access Public

router.post("/shared", async (req, res) => {
  const { id } = req.body;
  //  get user from token
  const user = await User.findById(id);

  //  get projects where user is a member
  const projects = await Project.find({ "members.email": user.email });
  res.json(projects);
});

module.exports = router;
