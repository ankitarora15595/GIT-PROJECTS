package service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import java.security.MessageDigest;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

@Service
public class UrlService {
    private final String dataFilePath = "src/main/resources/urls.json";
    private Map<String, String> urlMap;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public UrlService() {
        urlMap = new HashMap<>();
        loadUrls();
    }

    private void loadUrls() {
        try {
            if (Files.notExists(Paths.get(dataFilePath))) {
                Files.createDirectories(Paths.get("src/main/resources"));
                Files.write(Paths.get(dataFilePath), "{}".getBytes());
            }
            String content = new String(Files.readAllBytes(Paths.get(dataFilePath)));
            urlMap = objectMapper.readValue(content, new TypeReference<Map<String, String>>() {});
        } catch (IOException e) {
            urlMap = new HashMap<>();
        }
    }

    public static String sha256Hex(String longUrl) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(longUrl.getBytes(java.nio.charset.StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1)
                    hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public String base62Encode(String input) {
        String chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        StringBuilder sb = new StringBuilder();

        // Convert string to a positive integer using its hash code
        int value = Math.abs(input.hashCode());

        while (value > 0) {
            sb.append(chars.charAt(value % 62));
            value /= 62;
        }

        return sb.length() > 0 ? sb.toString().substring(0, Math.min(7, sb.length())) : "0";
    }
    

    public String shortenUrl(String originalUrl) {
        if (originalUrl == null || originalUrl.isEmpty()) {
            throw new IllegalArgumentException("URL cannot be null or empty");
        }
        String shortenedUrl = base62Encode(sha256Hex(originalUrl));
        urlMap.put(shortenedUrl, originalUrl);
        saveUrls();
        return shortenedUrl;
    }

    public String getLongUrl(String shortenedUrl) {
        return urlMap.get(shortenedUrl);
    }

    private void saveUrls() {
        try {
            String json = objectMapper.writeValueAsString(urlMap);
            Files.write(Paths.get(dataFilePath), json.getBytes());
        } catch (IOException e) {
            System.out.println("Error saving URLs: " + e.getMessage());
        }
    }

   
}