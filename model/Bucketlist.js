const mongoose = require("mongoose");

const bucketlistSchema = new mongoose.Schema(
  {
    // title: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   maxlength: 20,
    // },
    detail: {
      type: String,
      required: false,
      unique: false,
    },
    done: {
      type: Boolean,
      required: false,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId, //foreign key
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BucketList", bucketlistSchema);
