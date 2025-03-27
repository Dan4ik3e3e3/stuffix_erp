import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import connectDB from '@/lib/db';
import { User } from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Connected to database');

    const { email, password, name } = req.body;
    console.log('Received registration data:', { email, name });

    // Проверяем, есть ли уже пользователи в системе
    console.log('Checking existing users...');
    const usersCount = await User.countDocuments();
    console.log('Current users count:', usersCount);
    
    // Если есть пользователи, запрещаем регистрацию через этот endpoint
    if (usersCount > 0) {
      console.log('Registration blocked: users already exist');
      return res.status(403).json({ error: 'Registration is closed' });
    }

    // Проверяем, не занят ли email
    console.log('Checking if email is taken...');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Email already taken');
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Хешируем пароль
    console.log('Hashing password...');
    const hashedPassword = await hash(password, 12);

    // Создаем администратора
    console.log('Creating admin user...');
    const user = await User.create({
      email,
      name,
      password: hashedPassword,
      role: 'admin', // Первый пользователь всегда админ
    });
    console.log('Admin user created successfully');

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
} 