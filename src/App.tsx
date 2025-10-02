import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { LiveMatchView } from './components/LiveMatchView';
import { PlayerAnalysis } from './components/PlayerAnalysis';
import { HistoricalData } from './components/HistoricalData';
import { FanEngagement } from './components/FanEngagement';
import { EventTicker } from './components/EventTicker';
import { Match } from './types/tennis';
import { getMatch, subscribeToMatchUpdates } from './services/matchService';

function App() {
  const [match, setMatch] = useState<Match>(getMatch());

  useEffect(() => {
    const unsubscribe = subscribeToMatchUpdates((updatedMatch) => {
      setMatch(updatedMatch);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent"></div>

      <div className="relative z-10">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="border-b border-slate-800/50 backdrop-blur-lg bg-slate-900/50"
        >
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Activity className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                    Tennis Analytics Pro
                  </h1>
                  <p className="text-sm text-slate-400">Real-Time Match Intelligence</p>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-slate-400">Active Viewers</p>
                  <p className="text-2xl font-bold text-white">24,891</p>
                </div>
                <motion.div
                  className="w-3 h-3 rounded-full bg-emerald-400"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>
          </div>
        </motion.header>

        <main className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="xl:col-span-3"
            >
              <LiveMatchView match={match} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="xl:col-span-2"
            >
              <PlayerAnalysis match={match} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="xl:col-span-1"
            >
              <EventTicker events={match.events} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="xl:col-span-2"
            >
              <HistoricalData />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="xl:col-span-1"
            >
              <FanEngagement />
            </motion.div>
          </div>

          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center pb-8"
          >
            <p className="text-slate-500 text-sm">
              Powered by real-time analytics and AI-driven insights
            </p>
          </motion.footer>
        </main>
      </div>
    </div>
  );
}

export default App;
