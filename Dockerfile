FROM node:14

WORKDIR /usr/src/app
COPY . .
RUN npm install

ARG portNumber=8080
ENV PORT=$portNumber
EXPOSE $portNumber
CMD ["node", "src/server.js"]
