#!/bin/bash

echo "🧹 Shutting down any existing containers..."
docker-compose down

echo "☕ Warming up your dev environment..."

echo "🐳 Starting Docker containers (Backend, Postgres, pgAdmin)..."
docker-compose up --build -d

echo "✅ All services running. Backend will auto-reload on code changes."
docker logs -f backend





