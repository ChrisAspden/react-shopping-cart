#!/bin/bash

echo "☕ Warming up your dev environment..."

# Start PostgreSQL container if it's not running
if [[ $(docker ps -q -f name=postgres_dev) == "" ]]; then
  echo "🐘 Starting PostgreSQL Docker container..."
  docker start postgres_dev
else
  echo "✅ PostgreSQL container already running."
fi

# Start backend server
echo "🚀 Starting backend server..."
exec npm run start:server

