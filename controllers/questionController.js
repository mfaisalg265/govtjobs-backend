const Question = require("../models/Question");

const createQuestion = async (req, res) => {
  try {
    const { subjectId, questionText, options, correctAnswer, explanation, difficulty } = req.body;
    const question = await Question.create({ subjectId, questionText, options, correctAnswer, explanation, difficulty });
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuestionsBySubject = async (req, res) => {
  try {
    const questions = await Question.find({ subjectId: req.params.subjectId });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });
    Object.assign(question, req.body);
    const updatedQuestion = await question.save();
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });
    await question.deleteOne();
    res.status(200).json({ message: "Question deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createQuestion, getQuestionsBySubject, getQuestionById, updateQuestion, deleteQuestion };