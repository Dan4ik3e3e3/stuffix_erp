'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Компоненты интерфейса
const Sidebar = () => {
  const menuItems = [
    { name: 'Дашборд', icon: '📊', path: '/dashboard' },
    { name: 'Сотрудники', icon: '👥', path: '/dashboard/employees' },
    { name: 'Проекты', icon: '📁', path: '/dashboard/projects' },
    { name: 'Задачи', icon: '✓', path: '/dashboard/tasks' },
    { name: 'Календарь', icon: '📅', path: '/dashboard/calendar' },
    { name: 'Отчеты', icon: '📈', path: '/dashboard/reports' },
    { name: 'Настройки', icon: '⚙️', path: '/dashboard/settings' },
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

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentDate] = useState(new Date().toLocaleDateString('ru-RU'));

  // Проверяем аутентификацию
  if (status === 'loading') {
    return <div>Загрузка...</div>;
  }

  if (status === 'unauthenticated') {
    router.push('/');
    return null;
  }

  const metrics = [
    { title: 'Активные проекты', value: '12', change: '+2' },
    { title: 'Сотрудники', value: '48', change: '+5' },
    { title: 'Задачи на сегодня', value: '23', change: '-3' },
    { title: 'Выполнено в этом месяце', value: '156', change: '+12' },
  ];

  const recentActivities = [
    { text: 'Новый проект создан: "Разработка CRM"', time: '2 часа назад' },
    { text: 'Задача завершена: "Дизайн главной страницы"', time: '4 часа назад' },
    { text: 'Добавлен новый сотрудник: Иван Петров', time: '6 часов назад' },
  ];

  const upcomingEvents = [
    { title: 'Встреча команды', date: '15:00 сегодня' },
    { title: 'Дедлайн проекта UI/UX', date: 'Завтра' },
    { title: 'Ревью кода', date: '16 марта' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-16 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Дашборд</h1>
          <p className="text-gray-600">{currentDate}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-600 mb-2">{metric.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{metric.value}</span>
                <span className={`text-sm ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Последние активности</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex justify-between items-center">
                  <p>{activity.text}</p>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Предстоящие события</h2>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex justify-between items-center">
                  <p>{event.title}</p>
                  <span className="text-sm text-gray-500">{event.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 