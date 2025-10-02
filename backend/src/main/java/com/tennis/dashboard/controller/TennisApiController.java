package com.tennis.dashboard.controller;

import com.tennis.dashboard.model.WTARanking;
import com.tennis.dashboard.service.TennisApiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import java.util.List;

@RestController
@RequestMapping("/api/tennis")
public class TennisApiController {
    private final TennisApiService tennisApiService;

    public TennisApiController(TennisApiService tennisApiService) {
        this.tennisApiService = tennisApiService;
    }

    @GetMapping("/rankings/wta")
    public Mono<ResponseEntity<List<WTARanking>>> getWTARankings() {
        return tennisApiService.getWTARankings()
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public Mono<ResponseEntity<List<Object>>> searchTennisData(@RequestParam String query) {
        return tennisApiService.searchTennisData(query)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @GetMapping("/player/{playerId}")
    public Mono<ResponseEntity<Object>> getPlayerDetails(@PathVariable String playerId) {
        return tennisApiService.getPlayerDetails(playerId)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @GetMapping("/calendar")
    public Mono<ResponseEntity<Object>> getTournamentCalendar() {
        return tennisApiService.getTournamentCalendar()
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}