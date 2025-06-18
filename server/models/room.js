const mongoose = require("mongoose");

const roomsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    topic: { type: String, required: true },
    isPrivate: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Room", roomsSchema);
