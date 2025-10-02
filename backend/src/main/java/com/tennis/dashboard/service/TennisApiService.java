package com.tennis.dashboard.service;

import com.tennis.dashboard.model.WTARanking;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import java.util.List;
import java.util.Arrays;

@Service
public class TennisApiService {
    private final WebClient tennisApiClient;

    public TennisApiService(WebClient tennisApiClient) {
        this.tennisApiClient = tennisApiClient;
    }

    public Mono<List<WTARanking>> getWTARankings() {
        return tennisApiClient.get()
                .uri("/tennis/rankings/wta/live")
                .retrieve()
                .bodyToMono(WTARanking[].class)
                .map(Arrays::asList);
    }

    public Mono<List<Object>> searchTennisData(String query) {
        return tennisApiClient.get()
                .uri(uriBuilder -> uriBuilder
                    .path("/tennis/search")
                    .queryParam("q", query)
                    .build())
                .retrieve()
                .bodyToMono(Object[].class)
                .map(Arrays::asList);
    }

    public Mono<Object> getPlayerDetails(String playerId) {
        return tennisApiClient.get()
                .uri("/tennis/player/{playerId}", playerId)
                .retrieve()
                .bodyToMono(Object.class);
    }

    public Mono<Object> getTournamentCalendar() {
        return tennisApiClient.get()
                .uri("/tennis/calendar")
                .retrieve()
                .bodyToMono(Object.class);
    }
}
