const { shortenUrl, getLongUrl } = require('../urlService/service');
global.urlMappings = {};

test('Valid URL Constistency', () => {
  const longUrl = 'https://google.com';
  const short1 = shortenUrl(longUrl);
  const short2 = shortenUrl(longUrl);
  expect(short1).toBe(short2);
});

test('Original URL from short code', () => {
  const longUrl = 'https://google.com';
  const shortCode = shortenUrl(longUrl);
  const original = getLongUrl(shortCode);
  expect(original).toBe(longUrl);
});

test('Check for unknown short code', () => {
  const result = getLongUrl('qwerty.123');
  expect(result).toBeUndefined();
});

test('Check for null input', () => {
    expect(() => shortenUrl(null)).toThrow();
});

test('Check for undefined input', () => {
expect(() => shortenUrl(undefined)).toThrow();
});

test('Check for very long URL input', () => {
const longUrl = 'https://google.com/' + 'a'.repeat(1000);
const shortCode = shortenUrl(longUrl);
expect(typeof shortCode).toBe('string');
expect(shortCode.length).toBeGreaterThan(0);
const original = getLongUrl(shortCode);
expect(original).toBe(longUrl);
});


test('Check for URLs with special characters', () => {
const longUrl = 'https://example.com/query?name=John&Doe&age=30';
const shortCode = shortenUrl(longUrl);
const original = getLongUrl(shortCode);
expect(original).toBe(longUrl);
});

test('Check for cases senstivity', () => {
const url1 = 'https://google.com/Page';
const url2 = 'https://google.com/page';
const short1 = shortenUrl(url1);
const short2 = shortenUrl(url2);
expect(short1).not.toBe(short2);
});

test('Check for service is persisted and retrievable after reload', () => {
const longUrl = 'https://test.com';
const shortCode = shortenUrl(longUrl);

global.urlMappings = {};// Simulate restart by clearing memory and reloading
const { getLongUrl } = require('../urlService/service');
const original = getLongUrl(shortCode);
expect(original).toBe(longUrl);
});

test('Check for similar URLs to be identify differently', () => {
const url1 = 'https://example.com/abc';
const url2 = 'https://example.com/def';
const short1 = shortenUrl(url1);
const short2 = shortenUrl(url2);
expect(short1).not.toBe(short2);
});
  