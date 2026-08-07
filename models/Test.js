const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    subjectId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Subject",
  required: true,
},
    title: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    duration: {
      type: Number, // minutes
      required: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    totalMarks: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Test", testSchema);