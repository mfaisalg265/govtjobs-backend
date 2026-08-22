const Test = require("../models/Test");


const createTest = async (req, res) => {
  try {
    const { title, subjectId, questions, duration, isPremium, totalMarks } = req.body;
    const test = await Test.create({ title, subjectId, questions, duration, isPremium, totalMarks });
    res.status(201).json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTestsBySubject = async (req, res) => {
  try {
    const tests = await Test.find({ subjectId: req.params.subjectId }).select("-questions");
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTestQuestions = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id).populate("questions");
    if (!test) return res.status(404).json({ message: "Test not found" });
    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ message: "Test not found" });
    Object.assign(test, req.body);
    const updatedTest = await test.save();
    res.status(200).json(updatedTest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ message: "Test not found" });
    await test.deleteOne();
    res.status(200).json({ message: "Test deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTest, getTestsBySubject, getTestQuestions, updateTest, deleteTest };





