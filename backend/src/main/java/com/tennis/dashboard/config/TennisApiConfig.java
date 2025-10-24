package com.tennis.dashboard.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class TennisApiConfig {

    @Value("${tennis.api.key}")
    private String apiKey;

    @Value("${tennis.api.host}")
    private String apiHost;

    @Value("${tennis.api.base-url}")
    private String baseUrl;

    @Bean
    WebClient tennisApiClient() {
        return WebClient.builder()
                .baseUrl(baseUrl)
                .defaultHeader("X-RapidAPI-Key", apiKey)
                .defaultHeader("X-RapidAPI-Host", apiHost)
                .build();
    }
}