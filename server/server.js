const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const DietPlan = require('./models/DietPlan');
const WorkoutPlan = require('./models/WorkoutPlan');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.post('/api/auth/register', async (req, res) => {
  const { name, mobile, age, gender, height, weight, bloodGroup, password } = req.body;

  try {
    if (!name || !mobile || !age || !gender || !height || !weight || !bloodGroup || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const newUser = new User({
      name,
      mobile,
      age,
      gender,
      height,
      weight,
      bloodGroup,
      password
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Save the new user
    await newUser.save();

    // Calculate BMI
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    // Determine diet plan based on BMI
    let dietPlanMeals = [];
    if (bmi < 18.5) {
      dietPlanMeals = ['Calorie-Dense Foods: Focus on high-calorie, nutrient-rich foods like nuts, seeds, avocados, and dried fruits.', 
                       'Frequent Meals: Eat smaller, frequent meals throughout the day to increase calorie intake.', 
                       'Protein-Rich Foods: Include lean meats, dairy products, beans, and legumes to build muscle mass.',
                       'Healthy Fats: Incorporate sources of healthy fats like olive oil, nuts, and fatty fish.',
                       'Complex Carbohydrates: Include whole grains, starchy vegetables, and legumes to provide sustained energy.'];
    } else if (bmi >= 18.5 && bmi < 25) {
      dietPlanMeals = ['Balanced Diet: Follow a balanced diet with a variety of foods from all food groups: fruits, vegetables, lean proteins, whole grains, and healthy fats.', 
                       'Portion Control: Practice portion control to maintain a healthy weight.', 
                       'Nutrient-Dense Foods: Choose nutrient-dense foods over empty calories (e.g., sugary snacks).',
                       'Hydration: Drink plenty of water throughout the day.',
                       'Moderation: Enjoy treats and indulgences in moderation.'];
    } else if (bmi > 25){
      dietPlanMeals = ['Caloric Deficit: Create a caloric deficit by consuming fewer calories than you burn, focusing on a gradual and sustainable weight loss (1-2 pounds per week).', 
                       'High-Fiber Foods: Eat high-fiber foods like fruits, vegetables, whole grains, and legumes to promote satiety.', 
                       'Lean Proteins: Include lean proteins such as chicken, fish, tofu, and legumes to preserve muscle mass during weight loss.',
                       'Healthy Fats: Consume healthy fats in moderation, such as those from avocados, nuts, and olive oil.',
                       'Limit Processed Foods: Reduce intake of processed foods, sugary beverages, and high-fat snacks.'];
    }

    // Create and save a new DietPlan instance with the associated user's mobile
    const dietPlan = new DietPlan({
      userId: newUser._id,
      mobile: newUser.mobile, // Ensure the mobile field is provided
      meals: dietPlanMeals
    });
    await dietPlan.save();

    // Determine workout plan based on BMI
    let workoutPlanExercises = [];
    if (bmi < 18.5) {
      workoutPlanExercises = ['Strength Training: Engage in weight lifting, bodyweight exercises (like push-ups, pull-ups), and resistance band workouts 3-4 times a week to build muscle mass.', 
                              'Moderate Cardio: Perform light to moderate cardio like brisk walking, swimming, or cycling for 20-30 minutes, 2-3 times a week to improve cardiovascular health without excessive calorie burning.',
                              'Flexibility and Balance: Incorporate yoga or Pilates 1-2 times a week to improve flexibility and balance.'];
    } else if (bmi >= 18.5 && bmi < 25) {
      workoutPlanExercises = ['Strength Training: Perform strength training exercises 2-3 times a week focusing on all major muscle groups.', 
                              'Cardio: Aim for at least 150 minutes of moderate-intensity cardio (e.g., brisk walking, cycling) or 75 minutes of vigorous-intensity cardio (e.g., running) per week.', 
                              'Flexibility and Balance: Include activities like yoga, stretching, or tai chi 2-3 times a week.',
                              'Functional Training: Engage in exercises that improve functional movements and overall fitness, such as bodyweight circuits or kettlebell workouts.'  ];
    } else if (bmi >=25) {
      workoutPlanExercises = ['Cardio: Engage in moderate to vigorous cardio exercises like brisk walking, jogging, swimming, or cycling for at least 150 minutes per week, gradually increasing to 300 minutes.', 
                              'Strength Training: Incorporate strength training exercises 2-3 times a week to build muscle and boost metabolism.', 
                              'Low-Impact Activities: For those with joint issues, focus on low-impact activities like swimming, elliptical training, or water aerobics.',
                              'Flexibility and Mobility: Perform stretching and mobility exercises to improve flexibility and reduce injury risk.',
                              'Functional Movements: Include functional training that mimics daily activities to improve overall movement and strength.'];
    }

    // Create and save a new WorkoutPlan instance with the associated user's mobile
    const workoutPlan = new WorkoutPlan({
      userId: newUser._id,
      mobile: newUser.mobile, // Ensure the mobile field is provided
      exercises: workoutPlanExercises
    });
    await workoutPlan.save();

    // Update the user with the newly created diet and workout plans
    newUser.dietPlan.push(dietPlan._id);
    newUser.workoutPlan.push(workoutPlan._id);
    await newUser.save();

    res.status(201).json({ msg: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});


app.post('/api/auth/login', async (req, res) => {
  const { mobile, password } = req.body;

  try {
    const user = await User.findOne({ mobile });

    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Populate the diet plan and workout plan based on the user's mobile number
    const populatedUser = await User.findOne({ mobile })
      .populate('dietPlan', 'meals')
      .populate('workoutPlan', 'exercises');

    res.status(200).json({ msg: 'Login successful', user: populatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});


app.get('/api/auth/user', async (req, res) => {
  const { mobile } = req.query;

  try {
    const user = await User.findOne({ mobile }).populate('dietPlan').populate('workoutPlan');
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

app.put('/api/auth/user', async (req, res) => {
  const { mobile, name, age, gender, height, weight, bloodGroup, dietPlan, workoutPlan } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { mobile },
      { name, age, gender, height, weight, bloodGroup },
      { new: true }
    ).populate('dietPlan').populate('workoutPlan');

    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    if (dietPlan) {
      await DietPlan.findByIdAndUpdate(user.dietPlan[0]._id, { meals: dietPlan }, { new: true });
    }

    if (workoutPlan) {
      await WorkoutPlan.findByIdAndUpdate(user.workoutPlan[0]._id, { exercises: workoutPlan }, { new: true });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

app.listen(port, () => console.log(`Server started on port ${port}`));
