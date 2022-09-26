const express = require("express");
const router = express.Router();

// Project Model
const Project = require("../models/Project");

// @route PUT update/project
// @desc Update a project
// @access Public

router.put("/:id", (req, res) => {
  const { name, desciption, member } = req.body;

  if (name) {
    Project.findOneAndUpdate(
      { _id: req.params.id },
      { name },
      { new: true },
      (err, project) => {
        if (err) return res.status(500).send(err);
        return res.send(project);
      }
    );
  }

  if (desciption) {
    Project.findOneAndUpdate(
      { _id: req.params.id },
      { desciption },
      { new: true },
      (err, project) => {
        if (err) return res.status(500).send(err);
        return res.send(project);
      }
    );
  }

  if (member) {
    Project.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { members: member } },
      { new: true },
      (err, project) => {
        if (err) return res.status(500).send(err);
        return res.send(project);
      }
    );
  }
});

// @route DELETE delete/project
// @desc Delete a project
// @access Public

router.delete("/:id", (req, res) => {
  Project.findOneAndDelete({ _id: req.params.id }, (err, project) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: "Project successfully deleted",
      id: project._id,
    };
    return res.status(200).send(response);
  });
});

module.exports = router;
