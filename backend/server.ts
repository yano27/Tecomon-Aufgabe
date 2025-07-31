import express from 'express';
import widgetRoutes from './routes/widgets';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// Middleware first
app.use(express.json());

// Then routes
app.use('/widgets', widgetRoutes);  // Ensure this comes after middleware

app.listen(5000, () => console.log('Server running'));

app.use(errorHandler);