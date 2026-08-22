

const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    duration: { type: Number, required: true },
    isPremium: { type: Boolean, default: false },
    totalMarks: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Test", testSchema);