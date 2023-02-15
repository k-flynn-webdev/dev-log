FROM node:16-alpine

RUN mkdir -p /client/ && chown -R node:node /client/

WORKDIR /client

USER node

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile

COPY --chown=node:node . ./

CMD [ "yarn", "run", "dev" ]
