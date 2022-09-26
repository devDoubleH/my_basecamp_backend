const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Project Model
const Project = require("../models/Project");
const User = require("../models/User");
const Task = require("../models/Task");
const File = require("../models/File");
const Discussion = require("../models/Discussion");
const Comment = require("../models/Comment");

// @route POST project
// @desc Post discussion
// @access Public

router.post(
  "/:id/discussion",
  [
    check("discussion", "Discussion is required").not().isEmpty(),
    check("owner", "Owner is required").not().isEmpty(),
  ],
  async (req, res) => {
    const { discussion, owner } = req.body;
    const { id } = req.params;

    const user = await User.findOne({ _id: owner });

    const discuss = Discussion.findById(id);

    if (discuss) {
      return res.status(400).json({ msg: "Discussion already exists" });
    }

    const newDiscussion = new Discussion({
      name: discussion,
      project_id: id,
      owner: user.name,
    });

    newDiscussion.save().then((discussion) => {
      res.json({
        discussion: {
          id: discussion.project_id,
          name: discussion.name,
          owner: discussion.owner,
        },
      });
    });
  }
);

// @route POST project
// @desc Post comment
// @access Public

router.post(
  "/:id/comment",
  [
    check("content", "Content is required").not().isEmpty(),
    check("owner", "Owner is required").not().isEmpty(),
  ],
  async (req, res) => {
    const { content, owner } = req.body;
    const { id } = req.params;

    const user = await User.findOne({ _id: owner });

    const newComment = new Comment({
      content,
      discussion_id: id,
      owner: user.name,
    });

    newComment.save().then((comment) => {
      res.json({
        comment: {
          discussion_id: comment.discussion_id,
          name: comment.name,
          owner: comment.owner,
          message: comment.content,
        },
      });
    });
  }
);

module.exports = router;
