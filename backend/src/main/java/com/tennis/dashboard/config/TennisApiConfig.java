package com.tennis.dashboard.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@Configuration
public class TennisApiConfig {

    @Value("${tennis.api.key}")
    private String apiKey;

    @Value("${tennis.api.host}")
    private String apiHost;

    @Bean
    public WebClient tennisApiClient() {
        return WebClient.builder()
                .baseUrl("https://tennisapi1.p.rapidapi.com")
                .defaultHeader("X-RapidAPI-Key", apiKey)
                .defaultHeader("X-RapidAPI-Host", apiHost)
                .build();
    }
}