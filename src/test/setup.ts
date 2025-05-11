import { beforeAll, afterAll, afterEach } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../lib/mongodb';

// Load test environment variables
dotenv.config({ path: '.env.test' });

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  // Create an in-memory MongoDB instance
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  // Set up test environment variables
  process.env.MONGODB_URI = mongoUri;
  process.env.NODE_ENV = 'test';
  
  // Connect to test database
  await connectDB();
});

afterEach(async () => {
  if (mongoose.connection.readyState === 1 && mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
});

// Helper function to clear all collections
export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

interface MockEvent {
  httpMethod: string;
  path: string;
  body?: string;
  pathParameters?: Record<string, string>;
}

// Helper function to create a mock event
export const createMockEvent = (
  method: string,
  path: string,
  body?: unknown,
  pathParameters?: Record<string, string>
): MockEvent => {
  return {
    httpMethod: method,
    path,
    body: body ? JSON.stringify(body) : undefined,
    pathParameters
  };
};

// Helper function to parse response body
export const parseResponseBody = (response: { body: string }) => {
  return JSON.parse(response.body);
}; 