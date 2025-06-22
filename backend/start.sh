#!/bin/bash
set -o errexit

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Check if using ASGI (Daphne) or WSGI (Gunicorn)
if [ -f "backend/asgi.py" ]; then
    echo "Starting Daphne (ASGI) server..."
    exec daphne -b 0.0.0.0 -p $PORT backend.asgi:application
else
    echo "Starting Gunicorn (WSGI) server..."
    exec gunicorn backend.wsgi:application \
        --bind 0.0.0.0:$PORT \
        --workers 4 \
        --timeout 120 \
        --log-level=info \
        --worker-class=gevent
fi