import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stuffix ERP",
  description: "Эффективное управление персоналом и ресурсами предприятия",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={`${inter.className} antialiased`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
