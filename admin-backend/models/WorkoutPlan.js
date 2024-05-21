// WorkoutPlan.js

const mongoose = require('mongoose');

const WorkoutPlanSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true
  },
  exercises: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model('WorkoutPlan', WorkoutPlanSchema);
