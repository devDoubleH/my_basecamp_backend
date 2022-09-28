const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Project Model
const Project = require("../models/Project");
const User = require("../models/User");
const Member = require("../models/Member");

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

// @route POST project
// @desc add member to project
// @access Public

router.post(
  "/addMember",
  [
    check("id", "Please add id").not().isEmpty(),
    check("permissions", "Please add permissions").not().isEmpty(),
    check("role", "Please add role").not().isEmpty(),
    check("email", "Please add email").not().isEmpty(),
  ],
  async (req, res) => {
    const { id, role, permissions, email } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({ email });

    Member.findOne({ user_id: id }).then((member) => {
      if (member) return res.status(400).json({ msg: "Member already exists" });

      const newMember = new Member({
        user_id: id,
        email: user.email,
        role: role,
        permissions: permissions,
        name: user.name,
      });

      newMember.save().then((member) => {
        res.json(member);
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
