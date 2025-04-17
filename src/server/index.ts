import express from 'express';
import cors from 'cors';
import { connectToDatabase } from '../lib/db';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Use routes
app.use('/api', routes);

// Start server
app.listen(port, async () => {
  try {
    await connectToDatabase();
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}); 