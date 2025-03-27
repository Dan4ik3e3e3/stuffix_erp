import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import { compare } from "bcryptjs";

// Проверяем наличие переменных окружения
if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('Please add your NEXTAUTH_SECRET to .env.local');
}

const client = new MongoClient(process.env.MONGODB_URI);

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { 
          label: "Email", 
          type: "email",
          placeholder: "example@example.com"
        },
        password: { 
          label: "Password", 
          type: "password"
        }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email и пароль обязательны");
        }

        try {
          await client.connect();
          const db = client.db("stuffix-online");
          const user = await db.collection("users").findOne({ 
            email: credentials.email.toLowerCase()
          });

          if (!user) {
            throw new Error("Пользователь не найден");
          }

          const isPasswordValid = await compare(credentials.password, user.password);

          if (!isPasswordValid) {
            throw new Error("Неверный пароль");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role as "admin" | "user"
          };
        } catch (error) {
          throw error;
        } finally {
          await client.close();
        }
      }
    })
  ],
  pages: {
    signIn: "/",
    error: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          role: token.role as "admin" | "user",
        };
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 дней
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 