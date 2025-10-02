export interface Player {
  id: string;
  name: string;
  country: string;
  countryFlag: string;
  ranking: number;
  photo: string;
}

export interface MatchScore {
  sets: number[];
  games: number;
  points: string;
}

export interface PlayerStats {
  aces: number;
  doubleFaults: number;
  firstServePercentage: number;
  breakPointsWon: number;
  breakPointsMissed: number;
  winners: number;
  unforcedErrors: number;
  totalPoints: number;
}

export interface MatchEvent {
  id: string;
  timestamp: Date;
  type: 'ace' | 'winner' | 'double_fault' | 'break_point' | 'game' | 'set';
  player: string;
  description: string;
}

export interface Match {
  id: string;
  player1: Player;
  player2: Player;
  score1: MatchScore;
  score2: MatchScore;
  stats1: PlayerStats;
  stats2: PlayerStats;
  currentServer: string;
  status: 'live' | 'completed' | 'upcoming';
  surface: 'hard' | 'clay' | 'grass';
  matchTime: number;
  events: MatchEvent[];
  winProbability: {
    player1: number;
    player2: number;
  };
}

export interface PredictionPoll {
  id: string;
  question: string;
  options: string[];
  votes: number[];
  totalVotes: number;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  country: string;
  points: number;
  correctPredictions: number;
}
