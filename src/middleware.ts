import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Простой in-memory storage для rate limiting
const rateLimit = new Map()

// Очистка старых записей каждые 5 минут
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of rateLimit.entries()) {
    if (now - value.timestamp > 5 * 60 * 1000) {
      rateLimit.delete(key)
    }
  }
}, 5 * 60 * 1000)

export function middleware(request: NextRequest) {
  // Временно пропускаем все запросы без проверки аутентификации
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*']
}; 