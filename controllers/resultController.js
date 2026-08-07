const mongoose = require("mongoose");
const Result = require("../models/Result");
const Test = require("../models/Test");

// Submit test answers and calculate score
const submitTest = async (req, res) => {
  try {
    const { testId, answers, timeTaken } = req.body;
    // answers format: [{ questionId: "...", selectedOption: 1 }, ...]

    const test = await Test.findById(testId).populate("questions");
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    let correctAnswers = 0;
    let wrongAnswers = 0;

    test.questions.forEach((question) => {
      const userAnswer = answers.find(
        (a) => a.questionId === question._id.toString()
      );

      if (userAnswer && userAnswer.selectedOption === question.correctAnswer) {
        correctAnswers++;
      } else {
        wrongAnswers++;
      }
    });

    const score = correctAnswers; // 1 mark per correct answer

    const result = await Result.create({
      userId: req.user._id,
      testId,
      score,
      correctAnswers,
      wrongAnswers,
      timeTaken,
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logged-in user's result history
const getMyResults = async (req, res) => {
  try {
    const results = await Result.find({ userId: req.user._id })
      .populate("testId", "title categoryId")
      .sort({ createdAt: -1 });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Leaderboard for a specific test (top scorers, best attempt per user)
const getTestLeaderboard = async (req, res) => {
  try {
    const { testId } = req.params;

    const leaderboard = await Result.aggregate([
      { $match: { testId: new mongoose.Types.ObjectId(testId) } },
      {
        $sort: { score: -1, timeTaken: 1 },
      },
      {
        $group: {
          _id: "$userId",
          bestScore: { $first: "$score" },
          timeTaken: { $first: "$timeTaken" },
          correctAnswers: { $first: "$correctAnswers" },
          wrongAnswers: { $first: "$wrongAnswers" },
          attemptedAt: { $first: "$createdAt" },
        },
      },
      { $sort: { bestScore: -1, timeTaken: 1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          name: "$user.name",
          bestScore: 1,
          timeTaken: 1,
          correctAnswers: 1,
          wrongAnswers: 1,
          attemptedAt: 1,
        },
      },
    ]);

    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Global leaderboard (across all tests, total correct answers)
const getGlobalLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Result.aggregate([
      {
        $group: {
          _id: "$userId",
          totalCorrect: { $sum: "$correctAnswers" },
          totalWrong: { $sum: "$wrongAnswers" },
          testsAttempted: { $sum: 1 },
        },
      },
      { $sort: { totalCorrect: -1 } },
      { $limit: 20 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          name: "$user.name",
          totalCorrect: 1,
          totalWrong: 1,
          testsAttempted: 1,
        },
      },
    ]);

    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitTest, getMyResults, getTestLeaderboard, getGlobalLeaderboard };