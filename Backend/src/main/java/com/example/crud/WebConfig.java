package com.example.crud;

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
                registry.addMapping("/**") // อนุญาตทุกเส้นทางของ API
                        .allowedOrigins("*") // ระบุ Origin ที่อนุญาต
                        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS") // ระบุ HTTP Methods
                        .allowedHeaders("*") // อนุญาตทุก Headers
                        .allowCredentials(true); // รองรับการส่ง Credentials (เช่น Cookies หรือ Headers Authentication)
            }
        };
    }
}