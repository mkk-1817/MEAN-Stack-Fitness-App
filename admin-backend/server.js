const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');
const DietPlan = require('./models/DietPlan');
const WorkoutPlan = require('./models/WorkoutPlan');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://karthikkrishna230104:be_alone@cluster0.eg6w25h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

app.get('/api/users/:mobileNumber', async (req, res) => {
  const user = await User.findOne({ mobileNumber: req.params.mobileNumber });
  res.send(user);
});

app.get('/api/dietPlans/:mobileNumber', async (req, res) => {
  const dietPlan = await DietPlan.findOne({ mobileNumber: req.params.mobileNumber });
  res.send(dietPlan);
});

app.put('/api/dietPlans/:mobileNumber', async (req, res) => {
  const dietPlan = await DietPlan.findOneAndUpdate(
    { mobileNumber: req.params.mobileNumber },
    req.body,
    { new: true }
  );
  res.send(dietPlan);
});

app.get('/api/workoutPlans/:mobileNumber', async (req, res) => {
  const workoutPlan = await WorkoutPlan.findOne({ mobileNumber: req.params.mobileNumber });
  res.send(workoutPlan);
});

app.put('/api/workoutPlans/:mobileNumber', async (req, res) => {
  const workoutPlan = await WorkoutPlan.findOneAndUpdate(
    { mobileNumber: req.params.mobileNumber },
    req.body,
    { new: true }
  );
  res.send(workoutPlan);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
