#FROM node:alpine
#
#RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app
#
#WORKDIR /usr/src/node-app
#
#COPY package.json yarn.lock ./
#
#USER node
#
#RUN yarn install --pure-lockfile
#
#COPY --chown=node:node . .




# syntax=docker/dockerfile:1.4




#FROM node:lts AS development
#
#ENV CI=true
#ENV PORT=3000
#
#WORKDIR /usr/src/react-app
#COPY package.json /usr/src/react-app/package.json
#COPY package-lock.json /usr/src/react-app/package-lock.json
#
#RUN npm ci
#
#COPY . /usr/src/react-app
#
#CMD [ "npm", "start" ]





#FROM development AS builder
#
#RUN npm run build
#
#FROM development as dev-envs
#RUN <<EOF
#apt-get update
#apt-get install -y --no-install-recommends git
#EOF
#
#RUN <<EOF
#useradd -s /bin/bash -m vscode
#groupadd docker
#usermod -aG docker vscode
#EOF
## install Docker tools (cli, buildx, compose)
#COPY --from=gloursdocker/docker / /
#CMD [ "npm", "start" ]
#
#FROM nginx:1.13-alpine
#
#COPY --from=builder /code/build /usr/share/nginx/html