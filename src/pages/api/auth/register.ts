import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import connectDB from '@/lib/db';
import { User } from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password, name } = req.body;

    // Проверяем наличие всех необходимых полей
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
    }

    // Проверяем формат email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Неверный формат email' });
    }

    // Проверяем длину пароля
    if (password.length < 6) {
      return res.status(400).json({ error: 'Пароль должен содержать минимум 6 символов' });
    }

    console.log('Connecting to database...');
    await connectDB();
    console.log('Connected to database');

    // Проверяем, есть ли уже пользователи в системе
    console.log('Checking existing users...');
    const usersCount = await User.countDocuments();
    console.log('Current users count:', usersCount);
    
    // Если есть пользователи, запрещаем регистрацию через этот endpoint
    if (usersCount > 0) {
      console.log('Registration blocked: users already exist');
      return res.status(403).json({ error: 'Регистрация закрыта' });
    }

    // Проверяем, не занят ли email
    console.log('Checking if email is taken...');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Email already taken');
      return res.status(400).json({ error: 'Email уже зарегистрирован' });
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
    console.log('Admin user created successfully:', user._id);

    res.status(201).json({ message: 'Пользователь успешно создан' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Ошибка при создании пользователя' });
  }
} 