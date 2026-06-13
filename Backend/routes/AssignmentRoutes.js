const express = require("express");

const router = express.Router();

const auth = require("../middleware/AuthMiddleware");
const role = require("../middleware/RoleMiddleware");

const {
  createAssignment,
  getAssignments,
  getAssignmentById,
  submitAssignment,
  evaluateAssignment
} = require("../controllers/AssignmentController");

router.post(
  "/",
  auth,
  role("trainer"),
  createAssignment
);

router.get(
  "/",
  auth,
  getAssignments
);

router.get(
  "/:id",
  auth,
  getAssignmentById
);

router.post(
  "/submit/:id",
  auth,
  role("student"),
  submitAssignment
);

router.put(
  "/evaluate/:id/:subId",
  auth,
  role("trainer"),
  evaluateAssignment
);

module.exports = router;
