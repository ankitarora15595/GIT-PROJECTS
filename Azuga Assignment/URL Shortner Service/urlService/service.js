const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const {encodeBase62} = require('../utils/base62');

const dataUrl = path.join(__dirname,'../dB/urls.json');
global.urlMaps = global.urlMaps || {};
function persistMappings() {
  fs.writeFileSync(dataUrl, JSON.stringify(global.urlMaps, null, 2));
}

function shortenUrl(longUrl) {
  const hash = crypto.createHash('sha256').update(longUrl).digest('hex');
  const shortCode = encodeBase62(hash).substring(0, 7);
  if (!global.urlMaps[shortCode]) {
    global.urlMaps[shortCode] = longUrl;
    persistMappings();
  }
  return shortCode;
}

function getLongUrl(code)
{
    return global.urlMaps[code];
}

module.exports = { shortenUrl, getLongUrl };