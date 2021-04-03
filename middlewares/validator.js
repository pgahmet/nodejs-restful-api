const { check } = require("express-validator");

exports.filterRecords = [
  check("startDate")
    .isISO8601("YYYY-MM-DD")
    .withMessage("Invalid date format, please enter a valid date (YYYY-MM-DD)"),
  check("endDate")
    .isISO8601("YYYY-MM-DD")
    .withMessage("Invalid date format, please enter a valid date (YYYY-MM-DD)"),
  check("minCount")
    .isInt()
    .not()
    .isString()
    .withMessage("Must be an integer number"),
  check("maxCount")
    .isInt()
    .not()
    .isString()
    .withMessage("Must be an integer number"),
];
