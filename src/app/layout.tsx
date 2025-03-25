'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

const Sidebar = () => {
  const menuItems = [
    { name: 'Дашборд', icon: '📊', path: '/' },
    { name: 'Сотрудники', icon: '👥', path: '/employees' },
    { name: 'Проекты', icon: '📁', path: '/projects' },
    { name: 'Задачи', icon: '✓', path: '/tasks' },
    { name: 'Календарь', icon: '📅', path: '/calendar' },
    { name: 'Отчеты', icon: '📈', path: '/reports' },
    { name: 'Настройки', icon: '⚙️', path: '/settings' },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white h-screen fixed left-0 top-0">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-8">Stuffix ERP</h1>
        <nav>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-lg mb-2"
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <header className="bg-white shadow-md fixed top-0 left-64 right-0 h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold">Stuffix ERP</h2>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">🔔</button>
        <button className="p-2 hover:bg-gray-100 rounded-full">👤</button>
      </div>
    </header>
  );
};

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
        <div className="min-h-screen bg-gray-100">
          <Sidebar />
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
