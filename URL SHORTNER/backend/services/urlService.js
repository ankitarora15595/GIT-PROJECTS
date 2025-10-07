const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { encodeBase62 } = require('../utils/base62');

const dataPath = path.join(__dirname, '../data/urls.json');

function persistMappings() {
  fs.writeFileSync(dataPath, JSON.stringify(global.urlMappings, null, 2));
}

function shortenUrl(longUrl) {
  const hash = crypto.createHash('sha256').update(longUrl).digest('hex');
  const shortCode = encodeBase62(hash).substring(0, 8);
  if (!global.urlMappings[shortCode]) {
    global.urlMappings[shortCode] = longUrl;
    persistMappings();
  }
  return shortCode;
}

function getOriginalUrl(code) {
  return global.urlMappings[code];
}

module.exports = { shortenUrl, getOriginalUrl };
