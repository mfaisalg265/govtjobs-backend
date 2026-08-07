const express = require("express");
const router = express.Router();
const {
  submitTest,
  getMyResults,
  getTestLeaderboard,
  getGlobalLeaderboard,
} = require("../controllers/resultController");
const { protect } = require("../middleware/authMiddleware");

router.post("/submit", protect, submitTest);
router.get("/my-results", protect, getMyResults);
router.get("/leaderboard/test/:testId", getTestLeaderboard);
router.get("/leaderboard/global", getGlobalLeaderboard);

module.exports = router;