const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Project Model
const Project = require("../models/Project");
const User = require("../models/User");
const Task = require("../models/Task");
const SubTask = require("../models/SubTask");
const File = require("../models/File");
const Discussion = require("../models/Discussion");
const Comment = require("../models/Comment");

// @route POST project
// @desc Post discussion
// @access Public

router.post(
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

// @route PUT project
// @desc Update comment
// @access Public

router.put(
  "/:id/comment",
  check("content", "Content is required").not().isEmpty(),
  async (req, res) => {
    const { content } = req.body;
    const { id } = req.params;

    await Comment.findOneAndUpdate(
      { discussion_id: id },
      { content },
      { new: true }
    ).then((comment) => {
      res.send(comment);
    });
  }
);

// @route POST project
// @desc Post task
// @access Public

router.post(
  "/:id/task",
  [
    check("task", "Task is required").not().isEmpty(),
    check("owner", "Owner is required").not().isEmpty(),
  ],
  async (req, res) => {
    const { task, owner } = req.body;
    const { id } = req.params;

    const user = await User.findOne({ _id: owner });

    const newTask = new Task({
      name: task,
      project_id: id,
      owner: user.name,
      done: false,
    });

    newTask.save().then((task) => {
      res.status(200).json({
        task: {
          id: task.project_id,
          name: task.name,
          owner: task.owner,
          done: task.done,
        },
      });
    });
  }
);

// @route PUT project
// @desc Update task
// @access Public

router.put("/:id/task", async (req, res) => {
  const { id } = req.params;

  const _task = await Task.findOne({ _id: id });

  await Task.findOneAndUpdate(
    { project_id: id },
    { done: !_task.done },
    { new: true }
  ).then((task) => {
    res.send(task);
  });
});

// @route POST project
// @desc Post Subtask
// @access Public

router.post(
  "/:id/subtask",
  [
    check("subtask", "Subtask is required").not().isEmpty(),
    check("owner", "Owner is required").not().isEmpty(),
  ],
  async (req, res) => {
    const { subtask, owner } = req.body;
    const { id } = req.params;

    const user = await User.findOne({ _id: owner });

    const newSubtask = new SubTask({
      name: subtask,
      task_id: id,
      owner: user.name,
      done: false,
    });

    newSubtask.save().then((subtask) => {
      res.status(200).json({
        subtask: {
          id: subtask.task_id,
          name: subtask.name,
          owner: subtask.owner,
          done: subtask.done,
        },
      });
    });
  }
);

// @route PUT project
// @desc Update Subtask
// @access Public

router.put("/:id/subtask", async (req, res) => {
  const { id } = req.params;

  const _subtask = await SubTask.findOne({ _id: id });

  await SubTask.findOneAndUpdate(
    { task_id: id },
    { done: !_subtask.done },
    { new: true }
  ).then((subtask) => {
    res.send(subtask);
  });
});

module.exports = router;
