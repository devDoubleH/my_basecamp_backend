const { Schema, model, Types } = require("mongoose");

const commentSchema = new Schema({
  id: {
    type: Types.ObjectId,
    ref: "Discussion",
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = model("comments", commentSchema);
