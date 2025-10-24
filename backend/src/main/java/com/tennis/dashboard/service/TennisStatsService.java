package com.tennis.dashboard.service;

import com.tennis.dashboard.model.TennisStats;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class TennisStatsService {
    
    private final WebClient tennisApiClient;

    public TennisStatsService(WebClient tennisApiClient) {
        this.tennisApiClient = tennisApiClient;
    }

    @Cacheable(value = "liveMatches", key = "#matchId", condition = "#matchId != null")
    public Mono<TennisStats> getLiveMatchStats(String matchId) {
        return tennisApiClient.get()
                .uri("/matches/{matchId}/stats", matchId)
                .retrieve()
                .bodyToMono(TennisStats.class);
    }

    public Mono<TennisStats[]> getOngoingMatches() {
        return tennisApiClient.get()
                .uri("/matches/live")
                .retrieve()
                .bodyToMono(TennisStats[].class);
    }

    @Cacheable(value = "tournamentStats", key = "#tournamentId")
    public Mono<TennisStats[]> getTournamentStats(String tournamentId) {
        return tennisApiClient.get()
                .uri("/tournaments/{tournamentId}/stats", tournamentId)
                .retrieve()
                .bodyToMono(TennisStats[].class);
    }
}