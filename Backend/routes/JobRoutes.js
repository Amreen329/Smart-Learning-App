const express = require("express");

const router = express.Router();

const auth = require("../middleware/AuthMiddleware");
const role = require("../middleware/RoleMiddleware");

const {
  createJob,
  getJobs,
  getJobById,
  applyJob
} = require("../controllers/JobController");

router.post(
  "/",
  auth,
  role("admin"),
  createJob
);

router.get(
  "/",
  auth,
  getJobs
);

router.get(
  "/:id",
  auth,
  getJobById
);

router.post(
  "/apply/:id",
  auth,
  role("student"),
  applyJob
);

module.exports = router;
