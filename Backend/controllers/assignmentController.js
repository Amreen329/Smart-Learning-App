const Assignment = require("../models/Assignment");

exports.createAssignment = async (req, res) => {

  const assignment = await Assignment.create(req.body);

  res.status(201).json(assignment);
};

exports.getAssignments = async (req, res) => {

  const assignments = await Assignment.find()
    .populate("course");

  res.json(assignments);
};

exports.getAssignmentById = async (req, res) => {
  const assignment = await Assignment.findById(req.params.id)
    .populate("course");

  if (!assignment) {
    return res.status(404).json({ message: "Assignment not found" });
  }

  res.json(assignment);
};

exports.submitAssignment = async (req, res) => {

  const assignment = await Assignment.findById(
    req.params.id
  );

  if (!assignment) {
    return res.status(404).json({ message: "Assignment not found" });
  }

  assignment.submissions.push({
    student: req.user.id,
    file: req.body.file || "Uploaded file pending"
  });

  await assignment.save();

  res.json({
    message: "Submitted"
  });
};

exports.evaluateAssignment = async (req, res) => {

  const assignment = await Assignment.findById(
    req.params.id
  );

  const submission =
    assignment.submissions.id(req.params.subId);

  submission.marks = req.body.marks;

  await assignment.save();

  res.json({
    message: "Marks Updated"
  });
};