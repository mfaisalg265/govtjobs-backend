const express = require("express");
const router = express.Router();
const {
  createQuestion, getQuestionsBySubject, getQuestionById, updateQuestion, deleteQuestion,
} = require("../controllers/questionController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.get("/subject/:subjectId", getQuestionsBySubject);
router.get("/:id", getQuestionById);
router.post("/", protect, isAdmin, createQuestion);
router.put("/:id", protect, isAdmin, updateQuestion);
router.delete("/:id", protect, isAdmin, deleteQuestion);

module.exports = router;