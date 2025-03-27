import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import connectDB from '@/lib/db';
import { User } from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { email, password, name } = req.body;

    // Проверяем, есть ли уже пользователи в системе
    const usersCount = await User.countDocuments();
    
    // Если есть пользователи, запрещаем регистрацию через этот endpoint
    if (usersCount > 0) {
      return res.status(403).json({ error: 'Registration is closed' });
    }

    // Хешируем пароль
    const hashedPassword = await hash(password, 12);

    // Создаем администратора
    const user = await User.create({
      email,
      name,
      password: hashedPassword,
      role: 'admin', // Первый пользователь всегда админ
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
} 