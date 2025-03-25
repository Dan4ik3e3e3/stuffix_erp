#!/bin/bash

# Остановка и удаление существующих контейнеров
docker-compose down

# Сборка новых образов
docker-compose build

# Запуск в продакшен режиме
docker-compose up -d

# Вывод логов
docker-compose logs -f 