package service;


import service.UrlService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class UrlServiceTest {
    private UrlService urlService;

    @BeforeEach
    public void setUp() {
        urlService = new UrlService();
    }

    @Test
    public void testValidUrlConsistency() {
        String longUrl = "https://google.com";
        String short1 = urlService.shortenUrl(longUrl);
        String short2 = urlService.shortenUrl(longUrl);
        assertEquals(short1, short2);
    }

    @Test
    public void testOriginalUrlFromShortCode() {
        String longUrl = "https://google.com";
        String shortCode = urlService.shortenUrl(longUrl);
        String original = urlService.getLongUrl(shortCode);
        assertEquals(longUrl, original);
    }

    @Test
    public void testUnknownShortCode() {
        String result = urlService.getLongUrl("qwerty.123");
        assertNull(result);
    }

    @Test
    public void testNullInput() {
        assertThrows(IllegalArgumentException.class, () -> urlService.shortenUrl(null));
    }

    @Test
    public void testUndefinedInput() {
        assertThrows(IllegalArgumentException.class, () -> urlService.shortenUrl(""));
    }

    @Test
    public void testVeryLongUrlInput() {
        String longUrl = "https://google.com/" + "a".repeat(1000);
        String shortCode = urlService.shortenUrl(longUrl);
        assertNotNull(shortCode);
        assertTrue(shortCode.length() > 0);
        String original = urlService.getLongUrl(shortCode);
        assertEquals(longUrl, original);
    }

    @Test
    public void testUrlsWithSpecialCharacters() {
        String longUrl = "https://example.com/query?name=John&Doe&age=30";
        String shortCode = urlService.shortenUrl(longUrl);
        String original = urlService.getLongUrl(shortCode);
        assertEquals(longUrl, original);
    }

    @Test
    public void testCaseSensitivity() {
        String url1 = "https://google.com/Page";
        String url2 = "https://google.com/page";
        String short1 = urlService.shortenUrl(url1);
        String short2 = urlService.shortenUrl(url2);
        assertNotEquals(short1, short2);
    }

    @Test
    public void testSimilarUrlsIdentifiedDifferently() {
        String url1 = "https://example.com/abc";
        String url2 = "https://example.com/def";
        String short1 = urlService.shortenUrl(url1);
        String short2 = urlService.shortenUrl(url2);
        assertNotEquals(short1, short2);
    }
}