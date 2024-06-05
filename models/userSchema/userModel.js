const mongoose = require("mongoose");

// Create a mongoose schema
const Schema = mongoose.Schema;
const schoolSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    min: 5,
    max: 20,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    min: 5,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const SchoolModel = mongoose.model("users", schoolSchema);

module.exports = SchoolModel;
