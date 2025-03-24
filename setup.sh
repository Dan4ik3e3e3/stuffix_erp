#!/bin/bash

echo "### Stopping all containers..."
docker compose down

echo "### Removing all containers and volumes..."
docker rm -f $(docker ps -aq)
docker volume rm $(docker volume ls -q)

echo "### Cleaning up Docker system..."
docker system prune -f

echo "### Creating SSL directories..."
mkdir -p certbot/conf
mkdir -p certbot/www

echo "### Starting nginx..."
docker compose up --force-recreate -d nginx

echo "### Waiting for nginx to start..."
sleep 5

echo "### Stopping nginx..."
docker compose stop nginx

echo "### Requesting SSL certificate..."
docker compose run --rm certbot certonly --webroot --webroot-path=/var/www/certbot/ \
  --email dkuzmitskiyy@bk.ru --agree-tos --no-eff-email \
  -d stuffix.com

echo "### Starting all services..."
docker compose up -d

echo "### Setup complete!"
echo "### Check the status with: docker compose ps" 