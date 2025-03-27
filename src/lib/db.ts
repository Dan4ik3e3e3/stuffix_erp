import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

const MONGODB_URI: string = process.env.MONGODB_URI;

async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export default connectDB; 