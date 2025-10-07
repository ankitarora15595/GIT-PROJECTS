const express = require('express');
const urlRoutes = require('./routes/urlRoutes');
const fs = require('fs');
const path = require('path');

// Load existing mappings
const dataPath = path.join(__dirname, 'data', 'urls.json');
if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, '{}');
global.urlMappings = JSON.parse(fs.readFileSync(dataPath));

const app = express();
app.use(express.json());
app.use('/api', urlRoutes);

module.exports = app;
