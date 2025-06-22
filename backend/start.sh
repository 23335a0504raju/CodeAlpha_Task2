#!/bin/bash
set -o errexit

# Create required directories
mkdir -p staticfiles
mkdir -p media

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate --noinput

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Start server based on configuration
if [ -f "backend/asgi.py" ] && [ "$USE_ASGI" = "true" ]; then
    echo "Starting Daphne (ASGI) server..."
    exec daphne -b 0.0.0.0 -p $PORT backend.asgi:application
else
    echo "Starting Gunicorn (WSGI) server..."
    exec gunicorn backend.wsgi:application \
        --bind 0.0.0.0:$PORT \
        --workers 4 \
        --timeout 120 \
        --log-level=info
fi