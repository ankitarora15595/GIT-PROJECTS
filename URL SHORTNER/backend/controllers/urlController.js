const { shortenUrl, getOriginalUrl } = require('../services/urlService');

exports.shorten = (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl || typeof longUrl !== 'string') {
    return res.status(400).json({ error: 'Invalid URL' });
  }
  const shortCode = shortenUrl(longUrl);
  res.json({ shortCode });
};

exports.retrieve = (req, res) => {
  const { code } = req.params;
  const longUrl = getOriginalUrl(code);
  if (!longUrl) {
    return res.status(404).json({ error: 'Short code not found' });
  }
  res.redirect(longUrl);
};
