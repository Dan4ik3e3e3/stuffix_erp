import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

const MONGODB_URI: string = process.env.MONGODB_URI;
let client: MongoClient | null = null;

export async function connectToDatabase() {
  if (client) {
    return { db: client.db() };
  }

  client = await MongoClient.connect(MONGODB_URI);
  return { db: client.db() };
}

export default connectToDatabase; 