import { withAuth } from 'next-auth/middleware'
import type { JWT } from 'next-auth/jwt'

export default withAuth({
  callbacks: {
    authorized: ({ token }: { token: JWT | null }) => !!token
  },
})

export const config = {
  matcher: ['/dashboard/:path*']
} 