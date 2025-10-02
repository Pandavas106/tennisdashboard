package com.tennis.dashboard.model;

import lombok.Data;

@Data
public class WTARanking {
    private Integer rank;
    private String playerName;
    private String country;
    private Integer points;
    private Integer tournamentsPlayed;
    private String pointsToDefend;
}