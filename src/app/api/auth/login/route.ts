import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Временные учетные данные администратора (в реальном приложении должны храниться в базе данных)
const ADMIN_EMAIL = 'admin@stuffix.online';
const ADMIN_PASSWORD = 'admin123'; // В реальном приложении должен быть хеширован

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true });
      
      // Устанавливаем cookie для аутентификации
      response.cookies.set('auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 дней
        path: '/'
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Неверные учетные данные' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
} 