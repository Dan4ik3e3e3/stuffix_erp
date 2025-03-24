#!/bin/bash

# Создаем необходимые директории
mkdir -p certbot/conf
mkdir -p certbot/www

# Останавливаем существующие контейнеры
docker-compose down

# Запускаем только nginx для первоначальной проверки домена
docker-compose up -d nginx

# Ждем, пока nginx запустится
sleep 5

# Запускаем certbot для получения сертификатов
docker-compose run --rm certbot

# Перезапускаем все сервисы
docker-compose down
docker-compose up -d

echo "SSL initialization completed!" 