package com.eximroyals.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    private String imageUrl;

    private String pdfUrl;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    @JsonIgnoreProperties("products") // Prevent infinite recursion if Category has product list
    private Category category;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Product(String title, String description, String imageUrl, String pdfUrl, Category category) {
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.pdfUrl = pdfUrl;
        this.category = category;
    }
}
