'use client';

export const Header = () => {
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