import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Users, Trophy, CheckCircle, TrendingUp } from 'lucide-react';
import { getPredictionPolls, getLeaderboard } from '../services/matchService';

// Fallback UI for real-time data
const RealTimeUnavailable = () => (
  <div className="mb-4 p-3 rounded bg-yellow-100 text-yellow-800 text-sm">
    Real-time data is not available for fan engagement. Displaying static/mock data.
  </div>
);

export const FanEngagement = () => {
  const [polls] = useState(getPredictionPolls());
  const [leaderboard] = useState(getLeaderboard());
  const [votedPolls, setVotedPolls] = useState<Set<string>>(new Set());
  const [showConfetti, setShowConfetti] = useState(false);

  const handleVote = (pollId: string) => {
    if (!votedPolls.has(pollId)) {
      setVotedPolls(new Set(votedPolls).add(pollId));
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <RealTimeUnavailable />
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            {Array.from({ length: 50 }).map(() => {
              const confettiKey = `confetti-${Math.random().toString(36).substring(2, 11)}`;
              return (
                <motion.div
                  key={confettiKey}
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
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-6 rounded-2xl bg-card-bg border border-color-border shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20">
            <BarChart3 className="w-6 h-6 text-accent-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-primary">Live Predictions</h3>
            <p className="text-sm text-text-secondary">Vote and see what others think</p>
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
                className="p-5 rounded-xl bg-bg-secondary/50 backdrop-blur-sm border border-color-border"
              >
                <h4 className="text-lg font-semibold text-text-primary mb-4">{poll.question}</h4>
                <div className="space-y-3">
                  {poll.options.map((option, index) => {
                    const percentage = poll.totalVotes > 0 ? (poll.votes[index] / poll.totalVotes) * 100 : 0;
                    return (
                      <motion.button
                        key={option}
                        onClick={() => handleVote(poll.id)}
                        disabled={hasVoted}
                        whileHover={hasVoted ? {} : { scale: 1.02 }}
                        whileTap={hasVoted ? {} : { scale: 0.98 }}
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
                              <CheckCircle className="w-5 h-5 text-accent-secondary" />
                            )}
                            <span className="font-semibold text-text-primary">{option}</span>
                          </div>
                          {hasVoted && (
                            <div className="flex items-center gap-3">
                              <span className="text-text-secondary">{poll.votes[index].toLocaleString()} votes</span>
                              <span className="text-lg font-bold text-accent-primary">{percentage.toFixed(1)}%</span>
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

      <div className="p-6 rounded-2xl bg-card-bg border border-color-border shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20">
            <Trophy className="w-6 h-6 text-accent-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-primary">Global Leaderboard</h3>
            <p className="text-sm text-text-secondary">Top prediction experts worldwide</p>
          </div>
        </div>

        <div className="space-y-3">
          {leaderboard.map((entry, index) => {
            let entryBgClass = '';
            if (entry.rank === 1) {
              entryBgClass = 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/50 shadow-lg shadow-yellow-500/20';
            } else if (entry.rank === 2) {
              entryBgClass = 'bg-gradient-to-r from-slate-400/20 to-slate-500/20 border-slate-400/50';
            } else if (entry.rank === 3) {
              entryBgClass = 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 border-orange-500/50';
            } else {
              entryBgClass = 'bg-bg-secondary/50 border-color-border hover:border-accent-primary/50';
            }
            return (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className={`p-4 rounded-xl backdrop-blur-sm border transition-all ${entryBgClass}`}
              >
              <div className="flex items-center gap-4">
                {(() => {
                  let rankClass = '';
                  if (entry.rank === 1) {
                    rankClass = 'bg-gradient-to-br from-accent-primary to-accent-secondary text-text-primary shadow-lg';
                  } else if (entry.rank === 2) {
                    rankClass = 'bg-gradient-to-br from-bg-secondary to-text-secondary text-text-primary';
                  } else if (entry.rank === 3) {
                    rankClass = 'bg-gradient-to-br from-warning to-error text-text-primary';
                  } else {
                    rankClass = 'bg-bg-secondary text-text-secondary';
                  }
                  return (
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${rankClass}`}>
                      {entry.rank}
                    </div>
                  );
                })()}

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg font-bold text-text-primary">{entry.username}</h4>
                    <span className="text-xl">{entry.country}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-text-secondary">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      {entry.correctPredictions} correct
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end mb-1">
                    <TrendingUp className="w-5 h-5 text-accent-secondary" />
                    <p className="text-2xl font-bold text-text-primary">{entry.points.toLocaleString()}</p>
                  </div>
                  <p className="text-xs text-text-secondary uppercase tracking-wider">Points</p>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 rounded-xl bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 border border-color-border"
        >
          <p className="text-center text-text-secondary">
            <span className="font-semibold text-text-primary">Make predictions</span> to earn points and climb the leaderboard!
          </p>
        </motion.div>
      </div>
    </div>
  );
};
