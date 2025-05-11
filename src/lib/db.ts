import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Use a different name for the global variable to avoid conflicts
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

// MongoDB Client connection
let client: MongoClient | null = null;

export async function connectToDatabase() {
  if (client) {
    return { client, db: client.db() };
  }

  try {
    client = await MongoClient.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB client connected successfully');
    return { client, db: client.db() };
  } catch (error) {
    console.error('MongoDB client connection error:', error);
    throw error;
  }
}

export async function closeDatabaseConnection() {
  if (client) {
    await client.close();
    client = null;
    console.log('MongoDB client connection closed');
  }
}

// Mongoose connection
export async function connectDB() {
  if (cached.conn) {
    console.log('Using cached mongoose connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Creating new mongoose connection...');
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(process.env.MONGODB_URI as string, opts)
      .then((mongoose) => {
        console.log('Mongoose connected successfully');
        return mongoose;
      })
      .catch((error) => {
        console.error('Mongoose connection error:', error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    console.error('Failed to connect to database:', e);
    throw e;
  }
}

export default connectDB; 