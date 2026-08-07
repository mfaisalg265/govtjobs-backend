
const Test = require("../models/Test");

// Get tests by subject (Public)
const getTestsBySubject = async (req, res) => {
  try {
    const tests = await Test.find({ subjectId: req.params.subjectId }).select("-questions");
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create test (Admin only)
const createTest = async (req, res) => {
  try {
    const { title, categoryId, questions, duration, isPremium, totalMarks } = req.body;

    const test = await Test.create({
      title,
      categoryId,
      questions,
      duration,
      isPremium,
      totalMarks,
    });

    res.status(201).json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tests by category (Public)
const getTestsByCategory = async (req, res) => {
  try {
    const tests = await Test.find({ categoryId: req.params.categoryId }).select("-questions");
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single test WITH questions (for test-taking)
const getTestQuestions = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id).populate("questions");
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update test (Admin only)
const updateTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    Object.assign(test, req.body);
    const updatedTest = await test.save();
    res.status(200).json(updatedTest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete test (Admin only)
const deleteTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    await test.deleteOne();
    res.status(200).json({ message: "Test deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTest,
  getTestsByCategory,
  getTestsBySubject,
  getTestQuestions,
  updateTest,
  deleteTest,
};


