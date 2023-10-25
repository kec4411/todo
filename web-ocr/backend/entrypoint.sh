#!/bin/bash

echo "waiting for postgres server"

while ! nc -z web-db 5432; do
  sleep 0.5
done

echo "Connection Successfully"

exec "$@"