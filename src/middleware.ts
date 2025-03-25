import { withAuth } from 'next-auth/middleware'
import type { NextAuthMiddlewareOptions, NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    console.log('Middleware checking auth for:', req.nextUrl.pathname)
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log('Checking token in middleware:', token)
        return !!token
      },
    },
  } as NextAuthMiddlewareOptions
)

export const config = {
  matcher: ['/my-cabinet/:path*']
} 