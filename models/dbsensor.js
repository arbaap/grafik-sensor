const mongoose = require("mongoose");

const sensortestSchema = new mongoose.Schema(
  {
    suhu: Number,
    kelembaban: Number,
    NH3: Number,
  },
  {
    timestamps: true,
  }
);

const SensorTest = mongoose.model("SensorTest", sensortestSchema);

module.exports = SensorTest;
