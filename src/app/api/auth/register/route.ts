import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import connectDB from '@/lib/db';
import { User } from '@/models/User';

export async function POST(request: Request) {
  try {
    console.log('Starting registration process...');
    
    const body = await request.json();
    console.log('Received request body:', body);
    
    const { email, password, name } = body;
    console.log('Extracted data:', { email, name, hasPassword: !!password });

    // Проверяем наличие всех необходимых полей
    if (!email || !password || !name) {
      console.log('Missing required fields:', { email: !!email, password: !!password, name: !!name });
      return NextResponse.json(
        { error: 'Все поля обязательны для заполнения' },
        { status: 400 }
      );
    }

    // Проверяем формат email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format:', email);
      return NextResponse.json(
        { error: 'Неверный формат email' },
        { status: 400 }
      );
    }

    // Проверяем длину пароля
    if (password.length < 6) {
      console.log('Password too short:', password.length);
      return NextResponse.json(
        { error: 'Пароль должен содержать минимум 6 символов' },
        { status: 400 }
      );
    }

    console.log('Connecting to database...');
    try {
      await connectDB();
      console.log('Connected to database successfully');
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      throw dbError;
    }

    // Проверяем, есть ли уже пользователи в системе
    console.log('Checking existing users...');
    let usersCount;
    try {
      usersCount = await User.countDocuments();
      console.log('Current users count:', usersCount);
    } catch (countError) {
      console.error('Error counting users:', countError);
      throw countError;
    }
    
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
    let existingUser;
    try {
      existingUser = await User.findOne({ email });
      console.log('Existing user check result:', !!existingUser);
    } catch (findError) {
      console.error('Error checking existing user:', findError);
      throw findError;
    }

    if (existingUser) {
      console.log('Email already taken');
      return NextResponse.json(
        { error: 'Email уже зарегистрирован' },
        { status: 400 }
      );
    }

    // Хешируем пароль
    console.log('Hashing password...');
    let hashedPassword;
    try {
      hashedPassword = await hash(password, 12);
      console.log('Password hashed successfully');
    } catch (hashError) {
      console.error('Error hashing password:', hashError);
      throw hashError;
    }

    // Создаем администратора
    console.log('Creating admin user...');
    let user;
    try {
      user = await User.create({
        email,
        name,
        password: hashedPassword,
        role: 'admin', // Первый пользователь всегда админ
      });
      console.log('Admin user created successfully:', user._id);
    } catch (createError) {
      console.error('Error creating user:', createError);
      throw createError;
    }

    return NextResponse.json(
      { message: 'Пользователь успешно создан' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    // Добавляем больше информации об ошибке в ответ
    return NextResponse.json(
      { 
        error: 'Ошибка при создании пользователя',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 