export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Панель управления
          </h1>
          <div className="mt-4">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Добро пожаловать в HR ERP систему
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Здесь будет размещена основная информация и статистика
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 