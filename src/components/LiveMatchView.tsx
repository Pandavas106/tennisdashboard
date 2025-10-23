import { Clock, Radio } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Match } from '../types/tennis';
import { getTennisData } from '../services/tennisApiService';
import { PlayerScoreCard } from './PlayerScoreCard';
import '../styles/components.css';

interface TennisData {
  matches: Match[];
  rankings: any[];
}

interface LiveMatchViewProps {
  match: Match;
}

export const LiveMatchView = () => {
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const data = (await getTennisData()) as TennisData;
        if (data.matches?.[0]) {
          setCurrentMatch(data.matches[0]);
        }
      } catch (error) {
        console.error('Error fetching match data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchData();
    const interval = setInterval(fetchMatchData, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="p-6 rounded-2xl bg-card-bg border border-color-border">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/3 bg-bg-secondary rounded"></div>
          <div className="h-32 bg-bg-secondary rounded"></div>
          <div className="h-32 bg-bg-secondary rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl bg-card-bg border border-color-border">
      <h2 className="text-2xl font-bold text-text-primary mb-6">Live Match</h2>
      {currentMatch ? (
        <div className="space-y-6">
          <PlayerScoreCard
            player={currentMatch.player1}
            score={currentMatch.player1Score}
            isServer={currentMatch.server === 1}
            accentColor="primary"
          />
          <PlayerScoreCard
            player={currentMatch.player2}
            score={currentMatch.player2Score}
            isServer={currentMatch.server === 2}
            accentColor="secondary"
          />
          <div className="mt-4 p-4 rounded-lg bg-bg-secondary/50 border border-color-border">
            <div className="flex items-center justify-between text-text-secondary">
              <span>{currentMatch.tournament}</span>
              <span>{currentMatch.round}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-text-secondary">
          No live matches available at the moment
        </div>
      )}
    </div>
  );
};
