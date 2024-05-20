const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  age: String,
  gender: String,
  height: String,
  weight: String,
  bloodGroup: String,
  password: String,
  dietPlan: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DietPlan' }],
  workoutPlan: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutPlan' }]
});

module.exports = mongoose.model('User', UserSchema);
