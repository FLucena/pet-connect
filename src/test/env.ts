import mongoose from 'mongoose';

// Define types for mock objects
interface MockEvent {
  httpMethod: string;
  path: string;
  body?: string;
  pathParameters?: Record<string, string>;
}

interface MockResponse {
  body: string;
}

// Set up environment variables for testing
process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
process.env.NODE_ENV = 'test';

// Set up global test utilities
declare global {
  let clearDatabase: () => Promise<void>;
  let createMockEvent: (method: string, path: string, body?: unknown, pathParameters?: Record<string, string>) => MockEvent;
  let parseResponseBody: (response: MockResponse) => unknown;
}

global.clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

global.createMockEvent = (method: string, path: string, body?: unknown, pathParameters?: Record<string, string>): MockEvent => {
  return {
    httpMethod: method,
    path,
    body: body ? JSON.stringify(body) : undefined,
    pathParameters
  };
};

global.parseResponseBody = (response: MockResponse): unknown => {
  return JSON.parse(response.body);
}; 