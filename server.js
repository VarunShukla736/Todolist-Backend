import 'dotenv/config'; // MUST be at top
import express from 'express';
import connectDB from "./config/db.js";
import todoRoutes from './routes/todoRoutes.js';
import logger from './middleware/logger.js';
import swaggerSpec from './config/swagger.js';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Connect DB
connectDB();

// Middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json()); // body parser
app.use(logger); // custom middleware

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/todos', todoRoutes);

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});