const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Assuming you have a User model defined

const app = express();
const port = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:4200', // Allow requests from the Angular development server
  optionsSuccessStatus: 200
}));
app.use(bodyParser.json());

// MongoDB connection string
const mongoURI = 'mongodb+srv://karthikkrishna230104:be_alone@cluster0.eg6w25h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Registration endpoint
app.post('/api/auth/register', async (req, res) => {
  const { name, mobile, age, gender, height, weight, bloodGroup, password } = req.body;

  try {
    // Validation (basic example)
    if (!name || !mobile || !age || !gender || !height || !weight || !bloodGroup || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
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

    res.status(200).json({ msg: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});


app.get('/api/auth/user', async (req, res) => {
  const { mobile } = req.query;

  try {
    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});


app.listen(port, () => console.log(`Server started on port ${port}`));