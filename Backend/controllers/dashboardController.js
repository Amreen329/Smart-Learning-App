const User = require("../models/User");
const Course = require("../models/Course");
const Job = require("../models/Job");

exports.getDashboard = async (req, res) => {

  const students = await User.countDocuments({
    role: "student"
  });

  const trainers = await User.countDocuments({
    role: "trainer"
  });

  const courses = await Course.countDocuments();

  const jobs = await Job.countDocuments();

  res.json({
    students,
    trainers,
    courses,
    jobs
  });
};