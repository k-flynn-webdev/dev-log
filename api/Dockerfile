FROM node:16-alpine

RUN mkdir -p /app/ && chown -R node:node /app/

WORKDIR /app

USER node

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile

COPY --chown=node:node . .
