const { Schema, model, Types } = require("mongoose");

const discussionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  project_id: {
    type: Types.ObjectId,
    ref: "Project",
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
});

module.exports = model("discussions", discussionSchema);
