const mongoose = require("mongoose");
const vehicleSchema = mongoose.Schema({
  bus: String,
  car: Number,
  truck: Number,
});
const vehicleModel = mongoose.model("vehicle", vehicleSchema);

module.exports = { vehicleModel };
