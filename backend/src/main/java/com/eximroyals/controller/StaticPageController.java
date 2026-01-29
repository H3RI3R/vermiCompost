package com.eximroyals.controller;

import com.eximroyals.model.StaticPage;
import com.eximroyals.repository.StaticPageRepository;
import com.eximroyals.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/static-pages")
public class StaticPageController {
    @Autowired
    StaticPageRepository staticPageRepository;

    @Autowired
    FileStorageService fileStorageService;

    @GetMapping("/{pageName}")
    public ResponseEntity<StaticPage> getPage(@PathVariable String pageName) {
        return staticPageRepository.findByPageName(pageName)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{pageName}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<StaticPage> createOrUpdatePage(
            @PathVariable String pageName,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        StaticPage page = staticPageRepository.findByPageName(pageName)
                .orElse(new StaticPage(pageName, title, content, null));

        page.setTitle(title);
        page.setContent(content);
        page.setUpdatedAt(LocalDateTime.now());

        if (image != null && !image.isEmpty()) {
            String imageUrl = fileStorageService.save(image);
            page.setImageUrl(imageUrl);
        }

        return ResponseEntity.ok(staticPageRepository.save(page));
    }
}
