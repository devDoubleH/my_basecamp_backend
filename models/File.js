const { Schema, model, Types } = require("mongoose");

const fileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: Types.ObjectId,
    ref: "Project",
    required: true,
  },
});

module.exports = model("files", fileSchema);
