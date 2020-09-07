const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: false,
    },
    blog: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId, //foreign key
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Log", logSchema);
