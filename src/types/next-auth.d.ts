import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
  }

  interface Session extends DefaultSession {
    user: User;
  }

  interface JWT {
    id: string;
    role: 'admin' | 'user';
  }
} 