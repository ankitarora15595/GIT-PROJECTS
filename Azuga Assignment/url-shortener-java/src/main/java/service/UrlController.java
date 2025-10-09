package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/url")
public class UrlController {

    @Autowired
    private UrlService urlService;

    @PostMapping("/shorten")
    public ResponseEntity<String> shortenUrl(@RequestBody Url url) {
        try {
            if (url.getLongUrl() == null || url.getLongUrl().isEmpty()) {
                return ResponseEntity.badRequest().body("Invalid URL!!");
            }
            String shortCode = urlService.shortenUrl(url.getLongUrl());
            return ResponseEntity.ok(shortCode);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid URL!!");
        }

    }

    @GetMapping("/{shortened}")
    public ResponseEntity<String> getLongUrl(@PathVariable String shortened) {
        try {
            if (shortened == null || shortened.isEmpty()) {
                return ResponseEntity.badRequest().body("Shortened URL cannot be null or empty");
            }
            String originalUrl = urlService.getLongUrl(shortened);
            if (originalUrl == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(originalUrl);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid URL");
        }

    }

}