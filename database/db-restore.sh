#! /usr/bin/env bash

source .env
PGPASSWORD=${DB_PASSWORD}

gunzip -c ./database/dump.sql.gz | docker-compose exec -T ${DB_HOST} psql -U ${DB_USER} ${DB_NAME} --set ON_ERROR_STOP=on
