"use strict";

require('@babel/register')({
  presets: ['@babel/preset-env'],
  plugins: [['@babel/plugin-proposal-decorators', {
    legacy: true
  }]]
});

require('dotenv').config();

require('reflect-metadata');

var express = require('express');

var bodyParser = require('body-parser');

var _require = require('./utils/initializer'),
    initializeModules = _require.initializeModules;

var AppModule = require('./module/module_App/app.module');

var app = express();
app.use(bodyParser.json());
initializeModules(app, [AppModule]);
var port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log("test clone Nest Framework listening at http://localhost:".concat(port));
});