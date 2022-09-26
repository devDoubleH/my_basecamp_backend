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

    // find owner in database
    const user = await User.findOne({ _id: owner });

    // find project by id and add discussion to it with owner

    try {
      const newDiscussion = new Discussion({
        name: discussion,
        owner: user.name,
      });

      newDiscussion.save().then((discussion) => {
        Project.findOneAndUpdate(
          { _id: id },
          { $push: { discussions: discussion } },
          { new: true }
        ).then((project) => {
          res.json(project);
        });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    } finally {
      console.log("Discussion added");
      res.end();
    }
  }
);

module.exports = router;
