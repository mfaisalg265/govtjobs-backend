const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();


app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ message: "Database connection failed" });
  }
});

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const questionRoutes = require("./routes/questionRoutes");
app.use("/api/questions", questionRoutes);

const testRoutes = require("./routes/testRoutes");
app.use("/api/tests", testRoutes);

const resultRoutes = require("./routes/resultRoutes");
app.use("/api/results", resultRoutes);

const subjectRoutes = require("./routes/subjectRoutes");
app.use("/api/subjects", subjectRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;