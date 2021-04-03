const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema(
  {
    key: {
      type: String,
    },
    value: {
      type: String,
    },
    counts: {
      type: [Number],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model("Record", RecordSchema);
