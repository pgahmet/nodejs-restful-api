const express = require("express");

const RecordController = require("../controllers/RecordController");
const validator = require("../middlewares/validator");

const router = express.Router();

/**
 * Record routes
 */
router.post("/filter", validator.filterRecords, RecordController.filter);

module.exports = router;
