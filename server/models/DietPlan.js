// DietPlan.js

const mongoose = require('mongoose');

const DietPlanSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true
  },
  meals: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model('DietPlan', DietPlanSchema);
