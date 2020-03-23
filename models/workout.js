const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: new Date().setDate(new Date().getDate() - 10)
  },
  exercises: [
    {
      extype: String,
      name: String,
      distance: Number,
      duration: Number,
      weight: Number,
      reps: Number,
      sets: Number
    }
  ],
  totalDuration: {
    type: Number,
    default: 0
  }
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;