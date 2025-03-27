import { hash } from 'bcryptjs';
import connectDB from '../lib/db';
import { User } from '../models/User';

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