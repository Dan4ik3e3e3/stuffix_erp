#!/bin/bash

# Обновляем систему
apt-get update
apt-get upgrade -y

# Устанавливаем необходимые пакеты
apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    git

# Добавляем официальный GPG ключ Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Добавляем репозиторий Docker
echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Устанавливаем Docker
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io

# Устанавливаем Docker Compose
curl -L "https://github.com/docker/compose/releases/download/v2.24.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Клонируем репозиторий
git clone https://github.com/Dan4ik3e3e3/stuffix_erp.git /opt/stuffix_erp

# Переходим в директорию проекта
cd /opt/stuffix_erp

# Запускаем инициализацию SSL
chmod +x init-ssl.sh
./init-ssl.sh 