#!/bin/bash

set -e

echo "📁 Cloning or updating your repository..."
if [ -d "prizma" ]; then
  cd prizma
  git pull
else
  git clone https://github.com/DineshWayaman/prizma_ent.git
  cd prizma
fi

echo "🔐 Checking for .env file..."
if [ ! -f ".env" ]; then
  if [ -f ".env.example" ]; then
    cp .env.example .env
    echo "⚠️ Please update .env file with your credentials"
    exit 1
  else
    echo "❌ .env.example not found. Cannot continue."
    exit 1
  fi
fi

# Go back to parent folder where docker-compose.yml lives
cd ..

echo "🛑 Stopping and removing old containers..."
docker ps -a --filter "name=dineshwayaman" -q | xargs -r docker stop
docker ps -a --filter "name=dineshwayaman" -q | xargs -r docker rm

echo "🧹 Removing dangling and unused images..."
docker image prune -f

echo "🧱 Building and starting Docker containers..."
docker-compose up -d --build

echo "✅ Deployment complete!"