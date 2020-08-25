const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  // 1 to many embedding
  chapter: {
    type: String,
    required: true,
  },

  // pageno: {
  //   type: Number,
  //   max: 2000,
  // },

  text: {
    type: String,
    required: true,
  },
});

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: false,
    },
    // arthurName: {
    //   type: String,
    //   required: true,
    // },
    // summary: {
    //   type: String,
    //   required: false,
    // },
    owner: {
      type: mongoose.Schema.Types.ObjectId, //foreign key
      ref: "User",
      required: true,
    },
    notes: [noteSchema],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
