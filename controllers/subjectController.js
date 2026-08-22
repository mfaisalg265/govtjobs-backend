const Subject = require("../models/Subject");

const createSubject = async (req, res) => {
  try {
    const { name } = req.body;
    const subject = await Subject.create({ name });
    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) return res.status(404).json({ message: "Subject not found" });
    await subject.deleteOne();
    res.status(200).json({ message: "Subject deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createSubject, getSubjects, deleteSubject };