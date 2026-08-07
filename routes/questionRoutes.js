// const express = require("express");



// const router = express.Router();
// const {
//   createQuestion,
//   getQuestionsByCategory,
//   getQuestionsBySubject,
//   getQuestionById,
//   updateQuestion,
//   deleteQuestion,
// } = require("../controllers/questionController");

// const { protect, isAdmin } = require("../middleware/authMiddleware");

// // Public
// router.get("/category/:categoryId", getQuestionsByCategory);
// router.get("/:id", getQuestionById);

// // Admin only
// router.post("/", protect, isAdmin, createQuestion);
// router.put("/:id", protect, isAdmin, updateQuestion);
// router.delete("/:id", protect, isAdmin, deleteQuestion);
// router.get("/subject/:subjectId", getQuestionsBySubject);

// module.exports = router;


const express = require("express");
const router = express.Router();
const {
  createQuestion,
  getQuestionsByCategory,
  getQuestionsBySubject,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

const { protect, isAdmin } = require("../middleware/authMiddleware");

// Public
router.get("/category/:categoryId", getQuestionsByCategory);
router.get("/subject/:subjectId", getQuestionsBySubject);
router.get("/:id", getQuestionById);

// Admin only
router.post("/", protect, isAdmin, createQuestion);
router.put("/:id", protect, isAdmin, updateQuestion);
router.delete("/:id", protect, isAdmin, deleteQuestion);

module.exports = router;