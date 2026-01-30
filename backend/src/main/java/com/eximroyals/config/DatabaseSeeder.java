package com.eximroyals.config;

import com.eximroyals.model.Admin;
import com.eximroyals.model.StaticPage;
import com.eximroyals.repository.AdminRepository;
import com.eximroyals.repository.StaticPageRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DatabaseSeeder {

    @Bean
    CommandLineRunner initDatabase(AdminRepository adminRepository, StaticPageRepository staticPageRepository,
            PasswordEncoder passwordEncoder) {
        return args -> {
            // Seed Admin
            if (!adminRepository.existsByEmail("admin@dndglobal.com")) {
                Admin admin = new Admin();
                admin.setEmail("admin@dndglobal.com");
                admin.setPassword(passwordEncoder.encode("Admin@123"));
                adminRepository.save(admin);
                System.out.println("Default Admin initialized");
            }

            // Seed Static Pages
            seedPage(staticPageRepository, "about-us", "About Exim Royals",
                    "Welcome to Exim Royals, India's premier agro-export company.");
            seedPage(staticPageRepository, "why-choose-us", "Why Choose Us",
                    "We offer the best quality products, reliable logistics, and competitive pricing.");
        };
    }

    private void seedPage(StaticPageRepository repo, String pageName, String title, String content) {
        if (repo.findByPageName(pageName).isEmpty()) {
            repo.save(new StaticPage(pageName, title, content, null));
            System.out.println("Seeded page: " + pageName);
        }
    }
}
