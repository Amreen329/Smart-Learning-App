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

  // Configure CORS to allow requests from frontend deployment
  app.use(cors({
    origin: "https://smart-learning-app-1.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));
  
  app.use(express.json());

  app.use("/api/auth", require("./routes/AuthRoutes"));
  app.use("/api/courses", require("./routes/CourseRoutes"));
  app.use("/api/assignments", require("./routes/AssignmentRoutes"));
  app.use("/api/jobs", require("./routes/JobRoutes"));
  app.use("/api/dashboard", require("./routes/DashboardRoutes"));

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