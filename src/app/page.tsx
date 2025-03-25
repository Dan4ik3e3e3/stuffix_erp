'use client';

import { useState } from 'react';
import Link from 'next/link';

// Компоненты интерфейса
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
        <h2 className="text-xl font-semibold">Дашборд</h2>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">🔔</button>
        <button className="p-2 hover:bg-gray-100 rounded-full">👤</button>
      </div>
    </header>
  );
};

const DashboardCard = ({ title, value, icon, color }: { title: string; value: string; icon: string; color: string }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-500 text-sm">{title}</h3>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
};

export default function Home() {
  const [currentDate] = useState(new Date().toLocaleDateString('ru-RU'));

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-16 p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Добро пожаловать в Stuffix ERP</h2>
          <p className="text-gray-600">Сегодня: {currentDate}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Активные проекты"
            value="12"
            icon="📁"
            color="hover:shadow-lg"
          />
          <DashboardCard
            title="Сотрудники"
            value="48"
            icon="👥"
            color="hover:shadow-lg"
          />
          <DashboardCard
            title="Задачи на сегодня"
            value="24"
            icon="✓"
            color="hover:shadow-lg"
          />
          <DashboardCard
            title="Завершенные проекты"
            value="156"
            icon="🎯"
            color="hover:shadow-lg"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Последние активности</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    📝
                  </div>
                  <div>
                    <p className="font-medium">Обновлен статус проекта</p>
                    <p className="text-sm text-gray-500">2 часа назад</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Предстоящие события</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    📅
                  </div>
                  <div>
                    <p className="font-medium">Встреча команды</p>
                    <p className="text-sm text-gray-500">Завтра, 10:00</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
