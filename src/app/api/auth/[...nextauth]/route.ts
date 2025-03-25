import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import type { NextAuthOptions } from 'next-auth'
import type { User, Session } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

interface CustomUser extends User {
  role?: string
}

interface CustomSession extends Session {
  user?: CustomUser
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('Authorize called with credentials:', { email: credentials?.email })
        
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials')
          throw new Error('Пожалуйста, введите email и пароль')
        }

        try {
          // Здесь будет ваша логика проверки пользователя
          // Пока используем тестовые данные
          if (credentials.email === 'admin@stuffix.online' && credentials.password === 'admin123') {
            console.log('Login successful for admin')
            return {
              id: '1',
              email: credentials.email,
              name: 'Admin',
              role: 'admin'
            }
          }
          
          console.log('Invalid credentials')
          throw new Error('Неверный email или пароль')
        } catch (error) {
          console.error('Authorization error:', error)
          throw error
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('JWT callback:', { token, user })
      if (user) {
        token.role = (user as CustomUser).role
      }
      return token
    },
    async session({ session, token }) {
      console.log('Session callback:', { session, token })
      if (session.user) {
        (session.user as CustomUser).role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  logger: {
    error(code, metadata) {
      console.error('NextAuth error:', code, metadata)
    },
    warn(code) {
      console.warn('NextAuth warning:', code)
    },
    debug(code, metadata) {
      console.log('NextAuth debug:', code, metadata)
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST } 