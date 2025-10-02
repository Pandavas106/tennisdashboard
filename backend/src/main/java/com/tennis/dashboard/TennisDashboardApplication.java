package com.tennis.dashboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@SpringBootApplication
@OpenAPIDefinition(
    info = @Info(
        title = "Tennis Dashboard API",
        version = "1.0",
        description = "Enterprise-level Tennis Dashboard Backend API"
    )
)
public class TennisDashboardApplication {
    public static void main(String[] args) {
        SpringApplication.run(TennisDashboardApplication.class, args);
    }
}