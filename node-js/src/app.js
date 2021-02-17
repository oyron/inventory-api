const express = require('express');
const expressApp = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

function app(authModule) {
    const api = require('./routes/api')(authModule);
    expressApp.use(bodyParser.json());
    expressApp.use(cors({origin: ['http://gui-swagger-editor-single.playground.radix.equinor.com', 'https://gui-swagger-editor-single.playground.radix.equinor.com', 'http://localhost:3100', 'http://localhost:8080']}));
    expressApp.use(express.static(path.join(__dirname, 'static')));
    expressApp.use('/api', api);
    return expressApp;
}

module.exports = app;