package com.eximroyals.service;

import com.eximroyals.model.Enquiry;
import com.eximroyals.model.Product;
import com.eximroyals.repository.EnquiryRepository;
import com.eximroyals.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnquiryService {
    @Autowired
    private EnquiryRepository enquiryRepository;

    @Autowired
    private ProductRepository productRepository;

    public Enquiry createEnquiry(Enquiry enquiry, Long productId) {
        if (productId != null) {
            Product product = productRepository.findById(productId).orElse(null);
            enquiry.setProduct(product);
        }
        return enquiryRepository.save(enquiry);
    }

    public List<Enquiry> getAllEnquiries() {
        return enquiryRepository.findAllByOrderByCreatedAtDesc();
    }
}
