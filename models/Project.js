const { Schema, model, Types } = require("mongoose");

// Create Schema
const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
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
      permissions: {
        type: Object,
        required: true,
        create: { type: Boolean, required: true },
        read: { type: Boolean, required: true },
        update: { type: Boolean, required: true },
        delete: { type: Boolean, required: true },
      },
    },
  ],
});

module.exports = model("projects", ProjectSchema);
