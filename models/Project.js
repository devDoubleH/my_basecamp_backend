const { Schema, model, Types } = require("mongoose");

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
  project_id: {
    type: Types.ObjectId,
    required: true,
    ref: "User",
  },
  owner: {
    type: String,
    required: true,
  },
  members: [
    {
      type: Object,
      user_id: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["owner", "admin", "member"],
        required: true,
      },
    },
  ],
});

module.exports = model("projects", ProjectSchema);
