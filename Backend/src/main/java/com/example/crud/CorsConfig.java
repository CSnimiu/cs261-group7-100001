package com.example.crud;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // อนุญาตทุก URL
                .allowedOrigins("http://localhost:3000") // ระบุ origin ที่อนุญาต
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS") // ระบุ HTTP Methods
                .allowedHeaders("*") // อนุญาตทุก Headers
                .allowCredentials(true); // อนุญาตการใช้งาน Credential
    }
}
