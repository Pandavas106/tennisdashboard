import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Users, Trophy, CheckCircle, TrendingUp } from 'lucide-react';
import { getPredictionPolls, getLeaderboard } from '../services/matchService';

export const FanEngagement = () => {
  const [polls] = useState(getPredictionPolls());
  const [leaderboard] = useState(getLeaderboard());
  const [votedPolls, setVotedPolls] = useState<Set<string>>(new Set());
  const [showConfetti, setShowConfetti] = useState(false);

  const handleVote = (pollId: string, optionIndex: number) => {
    if (!votedPolls.has(pollId)) {
      setVotedPolls(new Set(votedPolls).add(pollId));
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full"
                initial={{
                  x: '50vw',
                  y: '50vh',
                  scale: 0
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: [0, 1, 0],
                  rotate: Math.random() * 360
                }}
                transition={{
                  duration: 1.5,
                  delay: Math.random() * 0.5
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20">
            <BarChart3 className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Live Predictions</h3>
            <p className="text-sm text-slate-400">Vote and see what others think</p>
          </div>
        </div>

        <div className="space-y-4">
          {polls.map((poll) => {
            const hasVoted = votedPolls.has(poll.id);
            return (
              <motion.div
                key={poll.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50"
              >
                <h4 className="text-lg font-semibold text-white mb-4">{poll.question}</h4>
                <div className="space-y-3">
                  {poll.options.map((option, index) => {
                    const percentage = poll.totalVotes > 0 ? (poll.votes[index] / poll.totalVotes) * 100 : 0;
                    return (
                      <motion.button
                        key={index}
                        onClick={() => handleVote(poll.id, index)}
                        disabled={hasVoted}
                        whileHover={!hasVoted ? { scale: 1.02 } : {}}
                        whileTap={!hasVoted ? { scale: 0.98 } : {}}
                        className={`w-full p-4 rounded-lg text-left transition-all relative overflow-hidden ${
                          hasVoted
                            ? 'cursor-default'
                            : 'cursor-pointer hover:border-emerald-500/50'
                        } border border-slate-700/50`}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20"
                          initial={{ width: 0 }}
                          animate={{ width: hasVoted ? `${percentage}%` : 0 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        />
                        <div className="relative z-10 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {hasVoted && (
                              <CheckCircle className="w-5 h-5 text-emerald-400" />
                            )}
                            <span className="font-semibold text-white">{option}</span>
                          </div>
                          {hasVoted && (
                            <div className="flex items-center gap-3">
                              <span className="text-slate-300">{poll.votes[index].toLocaleString()} votes</span>
                              <span className="text-lg font-bold text-emerald-400">{percentage.toFixed(1)}%</span>
                            </div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
                {hasVoted && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-slate-400 mt-3 flex items-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    {poll.totalVotes.toLocaleString()} total votes
                  </motion.p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/20">
            <Trophy className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Global Leaderboard</h3>
            <p className="text-sm text-slate-400">Top prediction experts worldwide</p>
          </div>
        </div>

        <div className="space-y-3">
          {leaderboard.map((entry, index) => (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
              className={`p-4 rounded-xl backdrop-blur-sm border transition-all ${
                entry.rank === 1
                  ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/50 shadow-lg shadow-yellow-500/20'
                  : entry.rank === 2
                  ? 'bg-gradient-to-r from-slate-400/20 to-slate-500/20 border-slate-400/50'
                  : entry.rank === 3
                  ? 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 border-orange-500/50'
                  : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${
                  entry.rank === 1
                    ? 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-lg'
                    : entry.rank === 2
                    ? 'bg-gradient-to-br from-slate-400 to-slate-500 text-white'
                    : entry.rank === 3
                    ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white'
                    : 'bg-slate-700 text-slate-300'
                }`}>
                  {entry.rank}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg font-bold text-white">{entry.username}</h4>
                    <span className="text-xl">{entry.country}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      {entry.correctPredictions} correct
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end mb-1">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    <p className="text-2xl font-bold text-white">{entry.points.toLocaleString()}</p>
                  </div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Points</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-slate-700/50"
        >
          <p className="text-center text-slate-300">
            <span className="font-semibold text-white">Make predictions</span> to earn points and climb the leaderboard!
          </p>
        </motion.div>
      </div>
    </div>
  );
};
