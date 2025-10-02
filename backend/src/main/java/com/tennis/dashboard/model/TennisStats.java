package com.tennis.dashboard.model;

import lombok.Data;

@Data
public class TennisStats {
    private String matchId;
    private String tournamentName;
    private String player1Name;
    private String player2Name;
    private int player1Score;
    private int player2Score;
    private String currentSet;
    private String currentGame;
    private StatsDetails player1Stats;
    private StatsDetails player2Stats;

    @Data
    public static class StatsDetails {
        private int aces;
        private int doubleFaults;
        private int firstServePercentage;
        private int winningOnFirstServe;
        private int winningOnSecondServe;
        private int breakPointsConverted;
        private int netPointsWon;
        private int totalPointsWon;
    }
}