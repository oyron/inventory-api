const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const api = require('./api');
const cors = require('cors');
const path = require('path');
const http = require('http');
const logger = require('./logger');
const port = process.env.PORT || 3100;

app.use(bodyParser.json());
app.use(cors({origin: ['https://editor.swagger.io', 'http://editor.swagger.io', 'http://localhost:8080']}));
app.use(express.static(path.join(__dirname, 'static')));
app.use('/api', api);

const server = http.createServer(app);
server.listen(port, () => logger.info(`Library server is running on ${port}`));

module.exports = server;