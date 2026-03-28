require('dotenv').config(); // MUST be at top

const express = require('express');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');
const logger = require('./middleware/logger');

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json()); // body parser
// app.use(logger); // custom middleware

// Routes
app.use('/api/todos', todoRoutes);

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});