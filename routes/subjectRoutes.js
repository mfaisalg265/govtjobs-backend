const express = require("express");
const router = express.Router();
const { createSubject, getSubjects, deleteSubject } = require("../controllers/subjectController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.get("/", getSubjects);
router.post("/", protect, isAdmin, createSubject);
router.delete("/:id", protect, isAdmin, deleteSubject);

module.exports = router;