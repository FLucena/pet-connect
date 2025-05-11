import express, { Request, Response } from 'express';
import cors from 'cors';
import { connectToDatabase } from '@/lib/db';

import dotenv from 'dotenv';
import routes from './routes';
import fetch from 'node-fetch';

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

// Google Maps API proxy endpoint
app.get('/api/maps/geocode', (req: Request, res: Response) => {
  const handler = async () => {
    const { address, latlng } = req.query;
    if (!process.env.GOOGLE_MAPS_API_KEY) {
      return res.status(500).json({ error: 'Google Maps API key not configured' });
    }
    try {
      let url = 'https://maps.googleapis.com/maps/api/geocode/json?';
      if (address) {
        url += `address=${encodeURIComponent(address as string)}`;
      } else if (latlng) {
        url += `latlng=${encodeURIComponent(latlng as string)}`;
      } else {
        return res.status(400).json({ error: 'Either address or latlng must be provided' });
      }
      url += `&key=${process.env.GOOGLE_MAPS_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error in geocoding request:', error);
      res.status(500).json({ error: 'Error processing geocoding request' });
    }
  };
  handler();
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