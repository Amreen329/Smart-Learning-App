const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/Database");
const seedSampleData = require("./seedData");

const app = express();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await seedSampleData();

  app.use(cors());
  app.use(express.json());

  app.use("/api/auth", require("./routes/authRoutes"));
  app.use("/api/courses", require("./routes/courseRoutes"));
  app.use("/api/assignments", require("./routes/assignmentRoutes"));
  app.use("/api/jobs", require("./routes/jobRoutes"));
  app.use("/api/dashboard", require("./routes/dashboardRoutes"));

  app.get("/", (req, res) => {
    res.send("Smart Student Learning & Placement Management API Running");
  });

  app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Initialization error:", error);
  process.exit(1);
});