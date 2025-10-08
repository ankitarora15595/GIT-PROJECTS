const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const urlRoutes = require('./urlService/routes');

const dataUrl = path.join(__dirname,'dB','urls.json');
console.log(dataUrl);
if(!fs.existsSync(dataUrl))
    fs.writeFileSync(dataUrl,'{}');

global.urlMaps = JSON.parse(fs.readFileSync(dataUrl));

app.use(express.json());
app.use('/url',urlRoutes);

module.exports = app;
