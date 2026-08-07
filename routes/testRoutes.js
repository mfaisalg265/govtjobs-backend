const express = require("express");
const router = express.Router();
const {
  createTest,
  getTestsByCategory,
  getTestsBySubject,
  getTestQuestions,
  updateTest,
  deleteTest,
} = require("../controllers/testController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

// Public
router.get("/category/:categoryId", getTestsByCategory);
router.get("/subject/:subjectId", getTestsBySubject);
router.get("/:id", getTestQuestions);

// Admin only
router.post("/", protect, isAdmin, createTest);
router.put("/:id", protect, isAdmin, updateTest);
router.delete("/:id", protect, isAdmin, deleteTest);

module.exports = router;