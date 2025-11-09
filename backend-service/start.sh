#!/bin/bash

# Render startup script for backend service
# This ensures the service starts correctly with Render's PORT variable

echo "Starting FlashRequest Backend Service..."
echo "Python version: $(python --version)"
echo "PORT: ${PORT:-8000}"

# Start the service
exec uvicorn backend.app:app --host 0.0.0.0 --port ${PORT:-8000}
