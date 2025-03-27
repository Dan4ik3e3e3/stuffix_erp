import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

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

export default withAuth(
  function middleware(req: NextRequest) {
    // Если пользователь авторизован и пытается получить доступ к странице входа,
    // перенаправляем его на дашборд
    if (req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Базовая защита от CSRF
  response.headers.set('X-CSRF-Protection', '1; mode=block')
  
  // Запрет кэширования для авторизованных страниц
  if (request.nextUrl.pathname.startsWith('/dashboard') || 
      request.nextUrl.pathname.startsWith('/my-cabinet')) {
    response.headers.set('Cache-Control', 'no-store, max-age=0')
    response.headers.set('Pragma', 'no-cache')
  } else {
    // Кэширование для статического контента
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }

  // Rate limiting для API
  if (request.nextUrl.pathname.startsWith('/api')) {
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') || 'unknown'
    
    const now = Date.now()
    const windowMs = 60 * 1000 // 1 минута
    const maxRequests = 60 // максимум запросов в минуту

    const current = rateLimit.get(ip) || { count: 0, timestamp: now }
    
    if (now - current.timestamp > windowMs) {
      current.count = 0
      current.timestamp = now
    }
    
    current.count++
    rateLimit.set(ip, current)

    if (current.count > maxRequests) {
      return new NextResponse(JSON.stringify({
        error: 'Too many requests'
      }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60'
        }
      })
    }

    response.headers.set('X-RateLimit-Limit', String(maxRequests))
    response.headers.set('X-RateLimit-Remaining', String(maxRequests - current.count))
  }

  return response
}

export const config = {
  matcher: ['/', '/dashboard/:path*']
}; 