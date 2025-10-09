package service;
public class Url {
    private String longUrl;
    private String shortCode;

    public Url() {
    }

    public Url(String longUrl, String shortCode) {
        this.longUrl = longUrl;
        this.shortCode = shortCode;
    }

    public String getLongUrl() {
        return longUrl;
    }

    public void setLongUrl(String longUrl) {
        this.longUrl = longUrl;
    }

    public String getShortCode() {
        return shortCode;
    }

    public void setShortCode(String shortCode) {
        this.shortCode = shortCode;
    }
}