#!/bin/bash

# Остановить все контейнеры
docker compose down

# Удалить старые сертификаты
rm -rf ./certbot/conf/*

# Создать необходимые директории
mkdir -p certbot/conf
mkdir -p certbot/www

# Запустить nginx в режиме HTTP
docker compose up -d nginx

# Подождать, пока nginx запустится
sleep 5

# Получить сертификат
docker compose run --rm certbot certonly --webroot --webroot-path=/var/www/certbot/ \
  --email dkuzmitskiyy@bk.ru --agree-tos --no-eff-email \
  -d stuffix.com --force-renewal

# Перезапустить все сервисы
docker compose down
docker compose up -d 