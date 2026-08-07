const express = require("express");
const router = express.Router();
const {
  createSubject,
  getSubjectsByCategory,
  deleteSubject,
} = require("../controllers/subjectController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.get("/category/:categoryId", getSubjectsByCategory);
router.post("/", protect, isAdmin, createSubject);
router.delete("/:id", protect, isAdmin, deleteSubject);

module.exports = router;