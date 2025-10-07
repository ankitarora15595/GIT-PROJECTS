const { shortenUrl, getOriginalUrl } = require('../services/urlService');
global.urlMappings = {};

test('Shortens a valid URL consistently', () => {
  const longUrl = 'https://example.com';
  const short1 = shortenUrl(longUrl);
  const short2 = shortenUrl(longUrl);
  expect(short1).toBe(short2);
});

test('Retrieves original URL from short code', () => {
  const longUrl = 'https://example.com';
  const shortCode = shortenUrl(longUrl);
  const original = getOriginalUrl(shortCode);
  expect(original).toBe(longUrl);
});

test('Returns undefined for unknown short code', () => {
  const result = getOriginalUrl('unknown123');
  expect(result).toBeUndefined();
});
