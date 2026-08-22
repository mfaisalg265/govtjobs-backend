const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    questionText: { type: String, required: true },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length === 4,
        message: "Question must have exactly 4 options",
      },
    },
    correctAnswer: { type: Number, required: true, min: 0, max: 3 },
    explanation: { type: String },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "medium" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);