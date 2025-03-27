const { hash } = require('bcryptjs');
const mongoose = require('mongoose');
const { User } = require('../models/User');

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    await mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10,
    });
    
    console.log('MongoDB connected successfully');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

async function createAdmin() {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Connected to database successfully');

    // Проверяем, есть ли уже пользователи
    const usersCount = await User.countDocuments();
    if (usersCount > 0) {
      console.log('Admin already exists');
      process.exit(0);
    }

    // Хешируем пароль
    const hashedPassword = await hash('Strelok101', 12);

    // Создаем администратора
    const admin = await User.create({
      name: 'Admin',
      email: 'dkuzmitskiyy@bk.ru',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('Admin created successfully:', admin);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin(); 