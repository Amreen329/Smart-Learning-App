const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createJob,
  getJobs,
  getJobById,
  applyJob
} = require("../controllers/jobController");

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
