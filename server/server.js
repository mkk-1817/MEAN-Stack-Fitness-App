const express = require('express');
const connectDB = require('./config/db');
const app = express();
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', require('./routes/auth'));

// Define PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
