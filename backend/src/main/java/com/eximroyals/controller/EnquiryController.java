package com.eximroyals.controller;

import com.eximroyals.model.Enquiry;
import com.eximroyals.service.EnquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enquiries")
public class EnquiryController {
    @Autowired
    EnquiryService enquiryService;

    @PostMapping
    public ResponseEntity<Enquiry> submitEnquiry(
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam(value = "country", required = false) String country,
            @RequestParam("email") String email,
            @RequestParam("message") String message,
            @RequestParam(value = "productId", required = false) Long productId) {

        Enquiry enquiry = new Enquiry(firstName, lastName, country, email, message, null);
        return ResponseEntity.ok(enquiryService.createEnquiry(enquiry, productId));
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public List<Enquiry> getAllEnquiries() {
        return enquiryService.getAllEnquiries();
    }
}
