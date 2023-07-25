const mongoose = require("mongoose");

// Define the school board schema
const schoolBoardSchema = new mongoose.Schema({
  boardname: {
    type: String,
    required: true,
    unique: true,
  },
  state: {
    type: String,
    required: true,
  },
});

// Create and export the SchoolBoard model
module.exports = mongoose.model("SchoolBoard", schoolBoardSchema);
