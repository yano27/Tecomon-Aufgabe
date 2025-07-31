import express from 'express';
import widgetRoutes from './routes/widgets';
import { errorHandler } from './middlewares/errorHandler';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.get('/', (_req, res) => {
  res.send('Backend is running');
});

// Enable CORS for all routes
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE'],
  })
);

app.use(express.json());
mongoose
  .connect('mongodb://localhost:27017/widgets', {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if DB connection fails
  });

// Then routes
app.use('/widgets', widgetRoutes); // Ensure this comes after middleware

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(errorHandler);
