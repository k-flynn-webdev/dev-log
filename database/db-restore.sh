#! /usr/bin/env bash

source .env
PGPASSWORD=${DB_PASSWORD}

docker-compose exec -T ${DB_HOST} psql -U ${DB_USER} ${DB_NAME} --set ON_ERROR_STOP=on < ./restore/dump.sql
