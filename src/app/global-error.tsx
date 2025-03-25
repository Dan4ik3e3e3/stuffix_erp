'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Критическая ошибка
            </h2>
            <p className="text-gray-600 mb-4">
              Произошла критическая ошибка. Наша команда уже уведомлена и работает над исправлением.
            </p>
            <div className="flex justify-end">
              <button
                onClick={reset}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Перезагрузить приложение
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
} 