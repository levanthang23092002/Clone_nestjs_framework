"use strict";
require('@babel/register')({
  presets: ['@babel/preset-env'],
  plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]]
});
require('dotenv').config();
require('reflect-metadata');

const express = require('express');
const bodyParser = require('body-parser');
const { initializeModules } = require('./utils/initializer');
const AppModule = require('./module/module_App/app.module');


const app = express();

app.use(bodyParser.json());
initializeModules(app, [AppModule]);


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`test clone Nest Framework listening at http://localhost:${port}`);
});
