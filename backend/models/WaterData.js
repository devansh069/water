const mongoose = require('mongoose');

const WaterDataSchema = new mongoose.Schema({
  areaName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  ph: {
    type: Number,
    required: true,
  },
  turbidity: {
    type: Number,
    required: true,
  },
  tds: {
    type: Number,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('WaterData', WaterDataSchema);
