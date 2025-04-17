import 'dotenv/config';
import { connectToDatabase, closeDatabaseConnection } from './db.js';

async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB...');
    const { db } = await connectToDatabase();
    
    // Test the connection by listing all collections
    const collections = await db.listCollections().toArray();
    console.log('Successfully connected to MongoDB!');
    console.log('Available collections:', collections.map(c => c.name));
    
    // Close the connection
    await closeDatabaseConnection();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

// Run the test
testConnection(); 