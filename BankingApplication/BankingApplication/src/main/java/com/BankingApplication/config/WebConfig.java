package com.BankingApplication.config; // Same package

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**") // Match the paths you want to allow
                        
                        // Add your Angular app's URLs here
                        .allowedOrigins(
<<<<<<< HEAD
                            "http://localhost:4200",
                            "http://localhost:5173",// For local development
=======
                           "http://localhost:5173",// For local development
>>>>>>> 4af8f0ada17a72cc3d6c7b6b96bb9d22d1eeaf10
                            "https://bank-crud-livid.vercel.app" // Your deployed Angular app URL
                        ) 
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
