#! /usr/bin/env bash

source .env
PGPASSWORD=${DB_PASSWORD}

docker-compose exec ${DB_HOST} pg_dump -U ${DB_USER} ${DB_NAME} --no-owner > pgdump-$(date +%F_%H-%M-%S).sql
