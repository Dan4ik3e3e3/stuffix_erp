import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from '@/lib/db';
import { compare } from 'bcryptjs';
import { User } from '@/models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Введите email и пароль');
        }

        await connectDB();
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('Пользователь не найден');
        }

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Неверный пароль');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role as 'admin' | 'user';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as 'admin' | 'user';
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
}; 