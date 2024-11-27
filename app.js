require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Database connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);

// Start server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port:${PORT}`));
