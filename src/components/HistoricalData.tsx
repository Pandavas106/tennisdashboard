import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trophy, MapPin, Filter } from 'lucide-react';
import { getHistoricalMatches } from '../services/matchService';

export const HistoricalData = () => {
  const [selectedSurface, setSelectedSurface] = useState<string>('all');
  const matches = getHistoricalMatches();

  const filteredMatches = selectedSurface === 'all'
    ? matches
    : matches.filter(m => m.surface === selectedSurface);

  const surfaces = ['all', 'hard', 'clay', 'grass'];

  const surfaceColors: Record<string, string> = {
    hard: 'from-accent-primary to-accent-secondary',
    clay: 'from-warning to-error',
    grass: 'from-success to-accent-secondary',
    all: 'from-bg-secondary to-text-secondary'
  };

  return (
    <div className="p-6 rounded-2xl bg-card-bg border border-color-border shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-2xl font-bold text-text-primary mb-1">Historical Matches</h3>
          <p className="text-sm text-text-secondary">Past encounters and performance trends</p>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-text-secondary" />
          <div className="flex gap-2">
            {surfaces.map((surface) => (
              <motion.button
                key={surface}
                onClick={() => setSelectedSurface(surface)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
                  selectedSurface === surface
                    ? 'bg-gradient-to-r ' + surfaceColors[surface] + ' text-text-primary shadow-lg'
                    : 'bg-bg-secondary/50 text-text-secondary hover:bg-bg-secondary/70'
                }`}
              >
                {surface}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredMatches.map((match, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
            className="p-5 rounded-xl bg-bg-secondary/50 backdrop-blur-sm border border-color-border hover:border-accent-primary/50 transition-all cursor-pointer group"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${surfaceColors[match.surface]} text-text-primary text-xs font-bold uppercase shadow-lg`}>
                    {match.surface}
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{match.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="w-5 h-5 text-accent-primary" />
                  <h4 className="text-lg font-bold text-text-primary group-hover:text-accent-secondary transition-colors">
                    {match.tournament}
                  </h4>
                </div>

                <div className="flex items-center gap-2 text-text-secondary">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Winner: <span className="font-semibold text-text-primary">{match.winner}</span></span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="px-6 py-3 rounded-xl bg-bg-secondary/50 border border-color-border">
                  <p className="text-sm text-text-secondary mb-1">Final Score</p>
                  <p className="text-lg font-bold text-text-primary font-mono">{match.score}</p>
                </div>

                <motion.div
                  className="w-10 h-10 rounded-lg bg-bg-secondary/50 flex items-center justify-center group-hover:bg-accent-primary/20 transition-colors"
                  whileHover={{ rotate: 90 }}
                >
                  <svg className="w-5 h-5 text-text-secondary group-hover:text-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-bg-secondary/50 to-bg-secondary/30 border border-color-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-text-primary mb-1">{matches.length}</p>
            <p className="text-sm text-text-secondary">Total Matches</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-accent-primary mb-1">
              {matches.filter(m => m.winner === 'Carlos Alcaraz').length}
            </p>
            <p className="text-sm text-text-secondary">Alcaraz Wins</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-accent-secondary mb-1">
              {matches.filter(m => m.winner === 'Novak Djokovic').length}
            </p>
            <p className="text-sm text-text-secondary">Djokovic Wins</p>
          </div>
        </div>
      </div>
    </div>
  );
};
