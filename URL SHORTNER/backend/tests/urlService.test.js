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


describe('URL Shortener Edge Case Tests', () => {
  test('Handles empty string input', () => {
    expect(() => shortenUrl('')).toThrow();
  });

  test('Handles null input', () => {
    expect(() => shortenUrl(null)).toThrow();
  });

  test('Handles undefined input', () => {
    expect(() => shortenUrl(undefined)).toThrow();
  });

  test('Handles very long URL input', () => {
    const longUrl = 'https://example.com/' + 'a'.repeat(1000);
    const shortCode = shortenUrl(longUrl);
    expect(typeof shortCode).toBe('string');
    expect(shortCode.length).toBeGreaterThan(0);
    const original = getOriginalUrl(shortCode);
    expect(original).toBe(longUrl);
  });

  test('Handles repeated shorten calls for same long URL', () => {
    const longUrl = 'https://repeat-test.com';
    const short1 = shortenUrl(longUrl);
    const short2 = shortenUrl(longUrl);
    expect(short1).toBe(short2);
  });

  test('Handles URLs with special characters', () => {
    const longUrl = 'https://example.com/query?name=John&Doe&age=30';
    const shortCode = shortenUrl(longUrl);
    const original = getOriginalUrl(shortCode);
    expect(original).toBe(longUrl);
  });

  test('Returns undefined for unknown short code', () => {
    const result = getOriginalUrl('nonexistent123');
    expect(result).toBeUndefined();
  });
});


describe('Additional URL Shortener Tests', () => {
  test('Returns consistent short code for malformed but same string', () => {
    const input = 'not-a-valid-url';
    const short1 = shortenUrl(input);
    const short2 = shortenUrl(input);
    expect(short1).toBe(short2);
  });

  test('Throws error or handles empty input gracefully', () => {
    expect(() => shortenUrl('')).toThrow();
  });

  test('Different cases in URL produce different short codes', () => {
    const url1 = 'https://example.com/Page';
    const url2 = 'https://example.com/page';
    const short1 = shortenUrl(url1);
    const short2 = shortenUrl(url2);
    expect(short1).not.toBe(short2);
  });

  test('Shortened URL is persisted and retrievable after reload', () => {
    const longUrl = 'https://persist-test.com';
    const shortCode = shortenUrl(longUrl);

    // Simulate restart by clearing memory and reloading
    global.urlMappings = {};
    const { getOriginalUrl } = require('../services/urlService');
    const retrieved = getOriginalUrl(shortCode);
    expect(retrieved).toBe(longUrl);
  });

  test('Different URLs produce different short codes', () => {
    const url1 = 'https://example.com/1';
    const url2 = 'https://example.com/2';
    const short1 = shortenUrl(url1);
    const short2 = shortenUrl(url2);
    expect(short1).not.toBe(short2);
  });
});
