const { model, Schema, Types } = require("mongoose");

const MemberSchema = new Schema({
  user_id: {
    type: Types.ObjectId,
    ref: "Project",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  permissions: {
    create: {
      type: Boolean,
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
    },
    edit: {
      type: Boolean,
      required: true,
    },

    delete: {
      type: Boolean,
      required: true,
    },
  },
  role: {
    type: String,
    enum: ["member", "admin"],
  },
});

module.exports = model("members", MemberSchema);
