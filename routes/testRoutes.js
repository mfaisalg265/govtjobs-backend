const express = require("express");
const router = express.Router();
const {
  createTest, getTestsBySubject, getTestQuestions, updateTest, deleteTest,
} = require("../controllers/testController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.get("/subject/:subjectId", getTestsBySubject);
router.get("/:id", getTestQuestions);
router.post("/", protect, isAdmin, createTest);
router.put("/:id", protect, isAdmin, updateTest);
router.delete("/:id", protect, isAdmin, deleteTest);

module.exports = router;