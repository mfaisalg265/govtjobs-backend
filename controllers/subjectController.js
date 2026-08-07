const Subject = require("../models/Subject");

// Create subject (Admin only)
const createSubject = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    const subject = await Subject.create({ name, categoryId });
    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get subjects by category (Public)
const getSubjectsByCategory = async (req, res) => {
  try {
    const subjects = await Subject.find({ categoryId: req.params.categoryId });
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete subject (Admin only)
const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    await subject.deleteOne();
    res.status(200).json({ message: "Subject deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createSubject, getSubjectsByCategory, deleteSubject };