const express = require("express");
const router = express.Router();

// Project Model
const Project = require("../models/Project");

// @route PUT update/project
// @desc Update a project
// @access Public

router.put("/:id", (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;

  Project.findByIdAndUpdate(
    id,
    {
      $set: {
        name,
        description,
      },
    },
    { new: true }
  )
    .then((project) => {
      res.json(project);
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
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
