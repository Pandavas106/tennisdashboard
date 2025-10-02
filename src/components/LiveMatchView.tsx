import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Radio } from 'lucide-react';
import { Match } from '../types/tennis';

interface LiveMatchViewProps {
  match: Match;
}

export const LiveMatchView = ({ match }: LiveMatchViewProps) => {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <motion.div
            className="flex items-center gap-3 bg-red-500/20 backdrop-blur-sm px-5 py-2 rounded-full border border-red-500/30"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Radio className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-bold text-sm uppercase tracking-wider">Live</span>
          </motion.div>

          <div className="flex items-center gap-2 text-slate-300">
            <Clock className="w-5 h-5" />
            <span className="text-xl font-mono font-semibold">{formatTime(match.matchTime)}</span>
          </div>

          <div className="px-5 py-2 rounded-full bg-slate-700/50 backdrop-blur-sm border border-slate-600/50">
            <span className="text-slate-300 text-sm font-semibold uppercase">{match.surface} Court</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${match.score1.points}-${match.score1.games}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className={`relative p-6 rounded-2xl backdrop-blur-md transition-all duration-300 ${
                match.currentServer === match.player1.id
                  ? 'bg-emerald-500/20 border-2 border-emerald-400/50 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800/50 border border-slate-700/50'
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img
                    src={match.player1.photo}
                    alt={match.player1.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-slate-700"
                  />
                  {match.currentServer === match.player1.id && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <span className="text-slate-900 text-xs font-bold">S</span>
                    </motion.div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-2xl font-bold text-white">{match.player1.name}</h3>
                    <span className="text-3xl">{match.player1.countryFlag}</span>
                  </div>
                  <p className="text-slate-400 text-sm">Rank #{match.player1.ranking}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {match.score1.sets.map((set, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="w-12 h-12 rounded-xl bg-slate-700/50 flex items-center justify-center border border-slate-600/50"
                  >
                    <span className="text-2xl font-bold text-white">{set}</span>
                  </motion.div>
                ))}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <span className="text-3xl font-bold text-white">{match.score1.games}</span>
                </div>
                <motion.div
                  key={match.score1.points}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="ml-2 px-4 py-2 rounded-lg bg-slate-800/80"
                >
                  <span className="text-2xl font-bold text-emerald-400">{match.score1.points}</span>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${match.score2.points}-${match.score2.games}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className={`relative p-6 rounded-2xl backdrop-blur-md transition-all duration-300 ${
                match.currentServer === match.player2.id
                  ? 'bg-blue-500/20 border-2 border-blue-400/50 shadow-lg shadow-blue-500/20'
                  : 'bg-slate-800/50 border border-slate-700/50'
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img
                    src={match.player2.photo}
                    alt={match.player2.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-slate-700"
                  />
                  {match.currentServer === match.player2.id && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <span className="text-slate-900 text-xs font-bold">S</span>
                    </motion.div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-2xl font-bold text-white">{match.player2.name}</h3>
                    <span className="text-3xl">{match.player2.countryFlag}</span>
                  </div>
                  <p className="text-slate-400 text-sm">Rank #{match.player2.ranking}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {match.score2.sets.map((set, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="w-12 h-12 rounded-xl bg-slate-700/50 flex items-center justify-center border border-slate-600/50"
                  >
                    <span className="text-2xl font-bold text-white">{set}</span>
                  </motion.div>
                ))}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <span className="text-3xl font-bold text-white">{match.score2.games}</span>
                </div>
                <motion.div
                  key={match.score2.points}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="ml-2 px-4 py-2 rounded-lg bg-slate-800/80"
                >
                  <span className="text-2xl font-bold text-blue-400">{match.score2.points}</span>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 p-6 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Win Probability</h4>
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold text-white w-12">{match.winProbability.player1}%</span>
            <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                initial={{ width: 0 }}
                animate={{ width: `${match.winProbability.player1}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-lg font-bold text-white w-12 text-right">{match.winProbability.player2}%</span>
          </div>
          <div className="flex justify-between mt-2 text-sm text-slate-400">
            <span>{match.player1.name}</span>
            <span>{match.player2.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
