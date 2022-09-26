const { Schema, model, Types } = require("mongoose");

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
  },
  id: {
    type: Types.ObjectId,
    ref: "Project",
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
});

module.exports = model("tasks", taskSchema);
