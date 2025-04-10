import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/database';
import storyRoutes from './routes/story.routes';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/stories', storyRoutes);
app.use('/api/auth', authRoutes);

// Error handling
app.use(errorHandler);

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 