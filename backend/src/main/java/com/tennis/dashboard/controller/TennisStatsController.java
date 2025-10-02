package com.tennis.dashboard.controller;

import com.tennis.dashboard.model.TennisStats;
import com.tennis.dashboard.service.TennisStatsService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/tennis")
public class TennisStatsController {

    private final TennisStatsService tennisStatsService;

    public TennisStatsController(TennisStatsService tennisStatsService) {
        this.tennisStatsService = tennisStatsService;
    }

    @GetMapping(value = "/matches/live", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<TennisStats[]> getLiveMatches() {
        return tennisStatsService.getOngoingMatches();
    }

    @GetMapping(value = "/matches/{matchId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<TennisStats> getLiveMatchStats(@PathVariable String matchId) {
        return tennisStatsService.getLiveMatchStats(matchId);
    }

    @GetMapping(value = "/tournaments/{tournamentId}/stats", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<TennisStats[]> getTournamentStats(@PathVariable String tournamentId) {
        return tennisStatsService.getTournamentStats(tournamentId);
    }
}