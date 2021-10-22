const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResistanceSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Exercise Name is Required"
  },

  weight: {
    type: Number,
    required: true
  },

  sets: {
    type: Number,
    required: true
  },

  reps: {
    type: Number,
    required: true
  },

  duration: {
    type: Number,
    required: true
  }
});

const Resistance = mongoose.model("Resistance", ResistanceSchema);

module.exports = Resistance;