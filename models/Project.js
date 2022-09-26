const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  members: {
    type: Array,
    required: false,
    member: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      permission: {
        type: String,
        required: true,
      },
    },
  },
  discussions: {
    type: Array,
    id: {
      type: String,
      required: true,
    },
    required: false,
    comment: {
      type: String,
      required: false,
    },
  },
  tasks: {
    type: Array,
    required: false,
    task: {
      type: Object,
      required: false,
      howManySubTasks: {
        type: Number,
        required: false,
      },
      subTasks: {
        type: Array,
        required: false,
        subTask: {
          type: String,
          required: false,
        },
      },
    },
  },
  files: {
    type: Array,
    required: false,
    file: {
      type: Object,
      required: false,
      name: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
    },
  },
});

module.exports = mongoose.model("projects", ProjectSchema);
