ARG NODE_VERSION=18.18.2-slim
FROM node:${NODE_VERSION} as base

ENV USER=paperwhitelist

WORKDIR /app
COPY package*.json .
RUN npm i

COPY . .

RUN npm run build

ENTRYPOINT [ "npm", "run", "start" ]


