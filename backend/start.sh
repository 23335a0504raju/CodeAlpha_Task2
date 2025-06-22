#!/bin/bash
set -o errexit

# Create required directories
mkdir -p staticfiles
mkdir -p media

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate --noinput

# Create static directory if it doesn't exist
mkdir -p static

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

python manage.py load_products
# Start Gunicorn
echo "Starting Gunicorn..."
exec gunicorn backend.wsgi:application \
    --bind 0.0.0.0:$PORT \
    --workers 4 \
    --timeout 120 \
    --log-level=info