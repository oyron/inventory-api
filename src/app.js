const express = require('express');
const expressApp = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

function app(verifyToken) {
    const api = require('./api')(verifyToken);
    expressApp.use(bodyParser.json());
    expressApp.use(cors({origin: ['https://editor.swagger.io', 'http://editor.swagger.io', 'http://localhost:8080']}));
    expressApp.use(express.static(path.join(__dirname, 'static')));
    expressApp.use('/api', api);
    return expressApp;
}

module.exports = app;