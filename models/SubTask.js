const { Schema, model, Types } = require("mongoose");

const subTaskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
  },
  task_id: {
    type: Types.ObjectId,
    ref: "Task",
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
});

module.exports = model("subtasks", subTaskSchema);
