const auth = require('./auth/auth');
const app = require('./app')(auth);
const http = require('http');
const logger = require('./logger');
const port = process.env.PORT || 3100;

const server = http.createServer(app);
server.listen(port, () => logger.info(`Library server is running on ${port}`));

module.exports = server;