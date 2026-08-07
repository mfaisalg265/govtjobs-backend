const Question = require("../models/Question");

// Get questions by subject (Public/Admin)
const getQuestionsBySubject = async (req, res) => {
  try {
    const questions = await Question.find({ subjectId: req.params.subjectId });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create question (Admin only)
const createQuestion = async (req, res) => {
  try {
    const { categoryId, subjectId, questionText, options, correctAnswer, explanation, difficulty } = req.body;

    const question = await Question.create({
      categoryId,
      subjectId,
      questionText,
      options,
      correctAnswer,
      explanation,
      difficulty,
    });

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get questions by category (Public/Admin)
const getQuestionsByCategory = async (req, res) => {
  try {
    const questions = await Question.find({ categoryId: req.params.categoryId });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single question
const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update question (Admin only)
const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    Object.assign(question, req.body);
    const updatedQuestion = await question.save();
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete question (Admin only)
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    await question.deleteOne();
    res.status(200).json({ message: "Question deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createQuestion,
  getQuestionsByCategory,
  getQuestionsBySubject,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};