const Course = require("./models/Course");
const Assignment = require("./models/Assignment");
const Job = require("./models/Job");

const seedSampleData = async () => {
  const courseCount = await Course.countDocuments();
  const assignmentCount = await Assignment.countDocuments();
  const jobCount = await Job.countDocuments();

  let courses = [];
  if (courseCount === 0) {
    courses = await Course.create([
      {
        title: "Full Stack Web Development",
        description: "Learn React, Node.js, Express, and MongoDB in a single course designed for real-world projects.",
      },
      {
        title: "Data Science Essentials",
        description: "Master Python analytics, data visualization, and machine learning fundamentals.",
      },
      {
        title: "UI/UX Design Fundamentals",
        description: "Build intuitive interfaces and user experiences using modern design tools and workflows.",
      },
      {
        title: "Cloud Computing Basics",
        description: "Get started with AWS, Azure, and cloud architecture for scalable applications.",
      },
      {
        title: "Cybersecurity Fundamentals",
        description: "Learn to secure applications, protect data, and defend systems from modern threats.",
      },
    ]);
  } else {
    courses = await Course.find().limit(5);
  }

  if (assignmentCount === 0) {
    const courseMap = {
      web: courses[0]?._id,
      data: courses[1]?._id,
      design: courses[2]?._id,
      cloud: courses[3]?._id,
      security: courses[4]?._id,
    };

    await Assignment.create([
      {
        title: "Portfolio Website Project",
        description: "Create a portfolio website that showcases your skills, projects, and resume.",
        course: courseMap.web,
      },
      {
        title: "API Development Assignment",
        description: "Build a RESTful API with Express and connect it to a MongoDB database.",
        course: courseMap.web,
      },
      {
        title: "Data Analysis Case Study",
        description: "Analyze a dataset, build charts, and summarize your conclusions in a short report.",
        course: courseMap.data,
      },
      {
        title: "Machine Learning Model Report",
        description: "Train a predictive model and explain the results in a short report.",
        course: courseMap.data,
      },
      {
        title: "Design System Prototype",
        description: "Design and prototype a responsive UI system for a small business application.",
        course: courseMap.design,
      },
      {
        title: "User Journey Mapping Task",
        description: "Create user journeys and wireframes for a mobile learning app.",
        course: courseMap.design,
      },
      {
        title: "Cloud Infrastructure Setup",
        description: "Deploy a sample application using cloud services and document the architecture.",
        course: courseMap.cloud,
      },
      {
        title: "Security Assessment",
        description: "Perform a basic security assessment and recommend improvements for a web app.",
        course: courseMap.security,
      },
    ]);
  }

  if (jobCount === 0) {
    await Job.create([
      {
        company: "DevForge Labs",
        role: "Frontend Developer Intern",
        location: "Remote",
        description: "Join a fast-paced startup team to build responsive web experiences using React and modern CSS.",
      },
      {
        company: "ByteMetrics",
        role: "Data Analyst",
        location: "New York, NY",
        description: "Work with real business data to generate insights and reports using Python and SQL.",
      },
      {
        company: "PixelWave Studio",
        role: "UI Designer",
        location: "San Francisco, CA",
        description: "Design user interfaces for mobile and web products in a collaborative creative team.",
      },
      {
        company: "CloudCore Solutions",
        role: "Junior Cloud Engineer",
        location: "Austin, TX",
        description: "Assist with cloud infrastructure projects and automate service deployment workflows.",
      },
      {
        company: "SecureNet",
        role: "Cybersecurity Analyst",
        location: "Seattle, WA",
        description: "Monitor threats, investigate incidents, and help improve application security posture.",
      },
      {
        company: "EduTech Labs",
        role: "Technical Support Associate",
        location: "Remote",
        description: "Provide technical support for students and help maintain learning platform uptime.",
      },
    ]);
  }

  console.log("Sample courses, assignments, and jobs have been seeded.");
};

module.exports = seedSampleData;
