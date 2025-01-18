// app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON in request bodies

// Routes
app.use('/api/users', userRoutes);

module.exports = app;
