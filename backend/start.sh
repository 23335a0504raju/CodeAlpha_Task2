#!/bin/bash
set -o errexit

# Create required directories
mkdir -p staticfiles
mkdir -p media
mkdir -p static

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate --noinput

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Load products (only in production)
if [ "$RENDER" ]; then
    echo "Loading products..."
    python manage.py loadproducts || echo "Product loading failed or products already exist"
fi

# Start Gunicorn
echo "Starting Gunicorn..."
exec gunicorn backend.wsgi:application \
    --bind 0.0.0.0:$PORT \
    --workers 4 \
    --timeout 120 \
    --log-level=info