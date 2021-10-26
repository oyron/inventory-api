FROM node:16-alpine as base
WORKDIR /usr/src/app
COPY package*.json .

FROM base
RUN npm install
COPY src src
RUN npm test

FROM base
RUN npm install --production
COPY src src

ARG portNumber=8080
ENV PORT=$portNumber
EXPOSE $portNumber
USER 1001
CMD ["node", "src/server.js"]
