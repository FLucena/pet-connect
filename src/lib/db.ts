import 'dotenv/config';
import { MongoClient, ServerApiVersion, Db, MongoClientOptions } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

if (!dbName) {
  throw new Error('Please define the MONGODB_DB_NAME environment variable inside .env');
}

// After validation, we can assert these are strings
const mongoUri = uri as string;
const mongoDatabaseName = dbName as string;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

const clientOptions: MongoClientOptions = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
};

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(mongoUri, clientOptions);

  try {
    await client.connect();
    const db = client.db(mongoDatabaseName);
    
    // Test the connection
    await db.command({ ping: 1 });
    console.log('Successfully connected to MongoDB!');

    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export async function closeDatabaseConnection() {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
  }
} 