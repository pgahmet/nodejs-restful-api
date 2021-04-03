const apiResponse = require("../helpers");

const Record = require("../models/Record");
const { validationResult } = require("express-validator");

/**
 * Record filter.
 *
 * @param {date}  startDate
 * @param {date}  endDate
 * @param {number}  minCount
 * @param {number}  maxCount
 *
 * @returns {Object}
 */
exports.filter = [
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponse.errorResponse(
        res,
        422,
        "Validation Error",
        errors.array()
      );
    }
    try {
      const { startDate, endDate, minCount, maxCount } = req.body;
      getRecords(startDate, endDate, minCount, maxCount).then((items) => {
        if (items.length > 0) {
          apiResponse.customResponse(res, 200, "Success", items);
        } else {
          apiResponse.errorResponse(res, 404, "Record not found!");
        }
      });
    } catch (error) {
      apiResponse.errorResponse(
        res,
        500,
        "Internal server error!",
        error.message
      );
    }
  },
];

const getRecords = async (startDate, endDate, minCount, maxCount) => {
  return await Record.aggregate([
    {
      $project: {
        _id: false,
        key: true,
        createdAt: true,
        totalCount: { $sum: "$counts" },
      },
    },
    {
      $match: {
        totalCount: { $gte: parseInt(minCount), $lte: parseInt(maxCount) },
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
  ]);
};
