import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import connectDB from '@/lib/db';
import { User } from '@/models/User';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Проверяем наличие всех необходимых полей
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Все поля обязательны для заполнения' },
        { status: 400 }
      );
    }

    // Проверяем формат email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Неверный формат email' },
        { status: 400 }
      );
    }

    // Проверяем длину пароля
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Пароль должен содержать минимум 6 символов' },
        { status: 400 }
      );
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
      return NextResponse.json(
        { error: 'Регистрация закрыта' },
        { status: 403 }
      );
    }

    // Проверяем, не занят ли email
    console.log('Checking if email is taken...');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Email already taken');
      return NextResponse.json(
        { error: 'Email уже зарегистрирован' },
        { status: 400 }
      );
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

    return NextResponse.json(
      { message: 'Пользователь успешно создан' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Ошибка при создании пользователя' },
      { status: 500 }
    );
  }
} 