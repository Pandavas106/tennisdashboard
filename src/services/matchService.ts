import { Match, Player, MatchScore, PlayerStats, MatchEvent, PredictionPoll, LeaderboardEntry } from '../types/tennis';

const player1: Player = {
  id: '1',
  name: 'Carlos Alcaraz',
  country: 'Spain',
  countryFlag: '🇪🇸',
  ranking: 2,
  photo: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400'
};

const player2: Player = {
  id: '2',
  name: 'Novak Djokovic',
  country: 'Serbia',
  countryFlag: '🇷🇸',
  ranking: 1,
  photo: 'https://images.pexels.com/photos/1103833/pexels-photo-1103833.jpeg?auto=compress&cs=tinysrgb&w=400'
};

let currentMatch: Match = {
  id: 'match-1',
  player1,
  player2,
  score1: {
    sets: [6, 4, 3],
    games: 3,
    points: '30'
  },
  score2: {
    sets: [4, 6, 2],
    games: 2,
    points: '40'
  },
  stats1: {
    aces: 12,
    doubleFaults: 3,
    firstServePercentage: 68,
    breakPointsWon: 4,
    breakPointsMissed: 2,
    winners: 28,
    unforcedErrors: 15,
    totalPoints: 142
  },
  stats2: {
    aces: 8,
    doubleFaults: 5,
    firstServePercentage: 72,
    breakPointsWon: 3,
    breakPointsMissed: 3,
    winners: 31,
    unforcedErrors: 18,
    totalPoints: 138
  },
  currentServer: player1.id,
  status: 'live',
  surface: 'hard',
  matchTime: 8234,
  events: [],
  winProbability: {
    player1: 62,
    player2: 38
  }
};

const eventTypes = ['ace', 'winner', 'double_fault', 'break_point'] as const;
const eventDescriptions = {
  ace: ['Powerful ace down the middle', 'Ace out wide', 'Service ace unreturnable'],
  winner: ['Forehand winner down the line', 'Backhand cross-court winner', 'Volley winner at the net'],
  double_fault: ['Double fault under pressure', 'Second serve into the net'],
  break_point: ['Break point saved!', 'Break point converted!', 'Critical break point']
};

export const getMatch = (): Match => {
  return { ...currentMatch };
};

export const subscribeToMatchUpdates = (callback: (match: Match) => void) => {
  const interval = setInterval(() => {
    const random = Math.random();

    if (random > 0.7) {
      const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const isPlayer1 = Math.random() > 0.5;
      const player = isPlayer1 ? player1 : player2;
      const descriptions = eventDescriptions[eventType];

      const newEvent: MatchEvent = {
        id: `event-${Date.now()}`,
        timestamp: new Date(),
        type: eventType,
        player: player.name,
        description: descriptions[Math.floor(Math.random() * descriptions.length)]
      };

      currentMatch.events = [newEvent, ...currentMatch.events.slice(0, 19)];

      if (eventType === 'ace') {
        if (isPlayer1) currentMatch.stats1.aces++;
        else currentMatch.stats2.aces++;
      } else if (eventType === 'double_fault') {
        if (isPlayer1) currentMatch.stats1.doubleFaults++;
        else currentMatch.stats2.doubleFaults++;
      } else if (eventType === 'winner') {
        if (isPlayer1) currentMatch.stats1.winners++;
        else currentMatch.stats2.winners++;
      }
    }

    if (random > 0.85) {
      const points = ['0', '15', '30', '40', 'AD'];
      currentMatch.score1.points = points[Math.floor(Math.random() * points.length)];
      currentMatch.score2.points = points[Math.floor(Math.random() * points.length)];

      currentMatch.winProbability.player1 = 45 + Math.floor(Math.random() * 30);
      currentMatch.winProbability.player2 = 100 - currentMatch.winProbability.player1;
    }

    currentMatch.matchTime++;

    callback({ ...currentMatch });
  }, 2000);

  return () => clearInterval(interval);
};

export const getPredictionPolls = (): PredictionPoll[] => {
  return [
    {
      id: 'poll-1',
      question: 'Who will win this set?',
      options: [player1.name, player2.name],
      votes: [3245, 2876],
      totalVotes: 6121
    },
    {
      id: 'poll-2',
      question: 'Will there be a tiebreak?',
      options: ['Yes', 'No'],
      votes: [1823, 2456],
      totalVotes: 4279
    }
  ];
};

export const getLeaderboard = (): LeaderboardEntry[] => {
  return [
    { rank: 1, username: 'TennisKing', country: '🇺🇸', points: 8945, correctPredictions: 127 },
    { rank: 2, username: 'AceMaster', country: '🇬🇧', points: 8721, correctPredictions: 124 },
    { rank: 3, username: 'CourtCrusher', country: '🇫🇷', points: 8456, correctPredictions: 119 },
    { rank: 4, username: 'NetNinja', country: '🇦🇺', points: 8234, correctPredictions: 116 },
    { rank: 5, username: 'BaselineBoss', country: '🇩🇪', points: 7998, correctPredictions: 113 }
  ];
};

export const getHistoricalMatches = () => {
  return [
    { date: '2025-09-15', tournament: 'US Open', winner: player1.name, score: '6-4, 6-3', surface: 'hard' },
    { date: '2025-07-20', tournament: 'Wimbledon', winner: player2.name, score: '7-6, 6-4, 6-3', surface: 'grass' },
    { date: '2025-06-10', tournament: 'French Open', winner: player1.name, score: '6-2, 7-5, 6-4', surface: 'clay' },
    { date: '2025-01-28', tournament: 'Australian Open', winner: player2.name, score: '6-4, 3-6, 6-3, 7-6', surface: 'hard' }
  ];
};
