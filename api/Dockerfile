FROM node:16-alpine

RUN mkdir -p /api/ && chown -R node:node /api/

WORKDIR /api

USER node

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile

COPY --chown=node:node . .
