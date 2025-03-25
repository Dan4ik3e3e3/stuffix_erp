'use client';

import Link from 'next/link';

export const Sidebar = () => {
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