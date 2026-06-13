const express = require("express");

const router = express.Router();

const auth = require("../middleware/AuthMiddleware");

const {
  getDashboard
} = require("../controllers/DashboardController");

router.get(
  "/",
  auth,
  getDashboard
);

module.exports = router;
