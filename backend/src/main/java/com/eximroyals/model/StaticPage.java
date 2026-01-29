package com.eximroyals.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "static_pages")
public class StaticPage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String pageName; // e.g. "about-us", "why-choose-us"

    private String title;

    @Lob
    private String content; // HTML or Markdown content

    private String imageUrl;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt = LocalDateTime.now();

    public StaticPage(String pageName, String title, String content, String imageUrl) {
        this.pageName = pageName;
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl;
    }
}
