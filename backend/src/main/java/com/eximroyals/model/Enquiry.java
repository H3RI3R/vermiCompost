package com.eximroyals.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "enquiries")
public class Enquiry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    private String country;

    @Column(nullable = false)
    private String email;

    @Column(columnDefinition = "TEXT")
    private String message;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product; // Optional, linking enquiry to a specific product

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Enquiry(String firstName, String lastName, String country, String email, String message, Product product) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.country = country;
        this.email = email;
        this.message = message;
        this.product = product;
    }
}
