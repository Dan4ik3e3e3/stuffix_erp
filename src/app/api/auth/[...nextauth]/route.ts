import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import connectDB from '@/lib/db';
import { User } from '@/models/User';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          console.log('Starting authorization process...');
          
          if (!credentials?.email || !credentials?.password) {
            console.log('Missing credentials');
            throw new Error('Пожалуйста, введите email и пароль');
          }

          console.log('Connecting to database...');
          await connectDB();
          console.log('Database connected');

          console.log('Finding user:', credentials.email);
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            console.log('User not found');
            throw new Error('Пользователь не найден');
          }
          console.log('User found:', user.email);

          console.log('Comparing passwords...');
          const isValid = await compare(credentials.password, user.password);
          console.log('Password comparison result:', isValid);

          if (!isValid) {
            console.log('Invalid password');
            throw new Error('Неверный пароль');
          }

          console.log('Authorization successful');
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role as 'admin' | 'user',
          };
        } catch (error) {
          console.error('Authorization error:', error);
          throw error;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as 'admin' | 'user';
      }
      return session;
    }
  },
  pages: {
    signIn: '/',
    error: '/',
  },
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 