#! /usr/bin/env bash

source .env
PGPASSWORD=${DB_PASSWORD}

docker-compose exec ${DB_HOST} pg_dump -U ${DB_USER} ${DB_NAME} --no-owner | gzip -9  > db-backup-$(date +%d-%m-%y).sql.gz
