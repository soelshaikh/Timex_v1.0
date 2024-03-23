const mongoose = require("mongoose");

const coupanSchema = new mongoose.Schema({
  coupanName: {
    type: String,
    trim: true,
    required: true,
  },
  coupanDiscount: {
    type: Number,
    trim: true,
    required: true,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  isDisplay: {
    type: Boolean,
  },
  isActive: {
    type: Boolean,
  },
  dataCreated: {
    type: Date,
    default: Date.now,
  },
});

const coupandb = new mongoose.model("coupans", coupanSchema);

module.exports = coupandb;
