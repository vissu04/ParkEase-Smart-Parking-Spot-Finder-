package com.infosys.ParkEasy.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.Components;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI parkEasyOpenAPI() {

        final String securitySchemeName = "bearerAuth";

        return new OpenAPI()

                // API Information
                .info(new Info()
                        .title("ParkEasy Smart Parking Management API")
                        .version("1.0")
                        .description("""
                                ParkEasy is a Smart Parking Management System designed to simplify parking operations.

                                This API documentation helps frontend developers integrate with backend services easily.

                                Main Features:
                                • User Registration & Authentication
                                • JWT based secure authentication
                                • Vehicle Management
                                • Address Management
                                • Parking Slot Management
                                • Parking Booking
                                • Payment Integration (Razorpay)
                                • Admin Parking Control

                                Authentication Guide:
                                -----------------------------------
                                1. Call the /auth/login API.
                                2. You will receive a JWT token.
                                3. Click the Authorize button in Swagger.
                                4. Paste the token like this:

                                Bearer YOUR_JWT_TOKEN

                                After authorization you can access secured endpoints like:
                                • /user/**
                                • /admin/**
                                • /parking/**
                                
                                """)
                        .contact(new Contact()
                                .name("ParkEasy Backend Team")
                                .email("support@parkeasy.com")
                                .url("https://parkeasy.com"))
                )

                // JWT Security Setup
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                .components(
                        new Components()
                                .addSecuritySchemes(securitySchemeName,
                                        new SecurityScheme()
                                                .name(securitySchemeName)
                                                .type(SecurityScheme.Type.HTTP)
                                                .scheme("bearer")
                                                .bearerFormat("JWT")
                                                .description("Enter JWT token in the format: Bearer <token>")
                                )
                );
    }
}