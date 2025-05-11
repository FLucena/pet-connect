import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import mongoose from 'mongoose';
import connectDB from '../lib/mongodb';

describe('MongoDB Connection', () => {
  beforeEach(async () => {
    // Clear mongoose cache and connection
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    // Clear the mongoose cache
    if (global.mongoose) {
      global.mongoose.conn = null;
      global.mongoose.promise = null;
    }
  });

  afterEach(async () => {
    // Disconnect from the database
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    // Clear the mongoose cache
    if (global.mongoose) {
      global.mongoose.conn = null;
      global.mongoose.promise = null;
    }
  });

  it('should connect to MongoDB successfully', async () => {
    // Clear cache to ensure a fresh connection
    if (global.mongoose) {
      global.mongoose.conn = null;
      global.mongoose.promise = null;
    }
    
    const mongooseConnectSpy = vi.spyOn(mongoose, 'connect');
    const connection = await connectDB();
    
    expect(mongooseConnectSpy).toHaveBeenCalled();
    expect(connection).toBeDefined();
    expect(mongoose.connection.readyState).toBe(1); // 1 = connected
    mongooseConnectSpy.mockRestore();
  });

  it('should reuse existing connection', async () => {
    // Clear cache to ensure a fresh connection
    if (global.mongoose) {
      global.mongoose.conn = null;
      global.mongoose.promise = null;
    }
    
    const mongooseConnectSpy = vi.spyOn(mongoose, 'connect');
    // First connection
    const firstConnection = await connectDB();
    const firstCallCount = mongooseConnectSpy.mock.calls.length;
    // Second connection
    const secondConnection = await connectDB();
    const secondCallCount = mongooseConnectSpy.mock.calls.length;
    expect(secondCallCount).toBe(firstCallCount); // Should not call connect again
    expect(secondConnection).toBe(firstConnection); // Should return the same connection
    mongooseConnectSpy.mockRestore();
  });

  it('should throw error if MONGODB_URI is not defined', async () => {
    const originalEnv = process.env.MONGODB_URI;
    delete process.env.MONGODB_URI;
    await expect(connectDB()).rejects.toThrow('Please define the MONGODB_URI environment variable');
    process.env.MONGODB_URI = originalEnv;
  });
}); 