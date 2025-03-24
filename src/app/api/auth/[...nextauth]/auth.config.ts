import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
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
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password')
        }

        // Здесь будет ваша логика проверки пользователя
        // Пока используем тестовые данные
        if (credentials.email === 'admin@stuffix.online' && credentials.password === 'admin123') {
          return {
            id: '1',
            email: credentials.email,
            name: 'Admin',
            role: 'admin'
          }
        }
        return null
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as CustomUser).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as CustomUser).role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
} 