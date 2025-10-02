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
    hard: 'from-blue-500 to-blue-600',
    clay: 'from-orange-500 to-orange-600',
    grass: 'from-green-500 to-green-600',
    all: 'from-slate-500 to-slate-600'
  };

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-1">Historical Matches</h3>
          <p className="text-sm text-slate-400">Past encounters and performance trends</p>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-slate-400" />
          <div className="flex gap-2">
            {surfaces.map((surface) => (
              <motion.button
                key={surface}
                onClick={() => setSelectedSurface(surface)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
                  selectedSurface === surface
                    ? 'bg-gradient-to-r ' + surfaceColors[surface] + ' text-white shadow-lg'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
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
            className="p-5 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 transition-all cursor-pointer group"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${surfaceColors[match.surface]} text-white text-xs font-bold uppercase shadow-lg`}>
                    {match.surface}
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{match.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {match.tournament}
                  </h4>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Winner: <span className="font-semibold text-white">{match.winner}</span></span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="px-6 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50">
                  <p className="text-sm text-slate-400 mb-1">Final Score</p>
                  <p className="text-lg font-bold text-white font-mono">{match.score}</p>
                </div>

                <motion.div
                  className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors"
                  whileHover={{ rotate: 90 }}
                >
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-1">{matches.length}</p>
            <p className="text-sm text-slate-400">Total Matches</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-400 mb-1">
              {matches.filter(m => m.winner === 'Carlos Alcaraz').length}
            </p>
            <p className="text-sm text-slate-400">Alcaraz Wins</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-400 mb-1">
              {matches.filter(m => m.winner === 'Novak Djokovic').length}
            </p>
            <p className="text-sm text-slate-400">Djokovic Wins</p>
          </div>
        </div>
      </div>
    </div>
  );
};
