import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { LiveMatchView } from './components/LiveMatchView';
import { PlayerAnalysis } from './components/PlayerAnalysis';
import { HistoricalData } from './components/HistoricalData';
import { FanEngagement } from './components/FanEngagement';
import { EventTicker } from './components/EventTicker';
import { ThemeToggle } from './components/ThemeToggle';
import { ThemeProvider } from './context/ThemeContext';
import { Match } from './types/tennis';
import { getMatch, subscribeToMatchUpdates } from './services/matchService';

function AppContent() {
  const [match, setMatch] = useState<Match>(getMatch());

  useEffect(() => {
    const unsubscribe = subscribeToMatchUpdates((updatedMatch) => {
      setMatch(updatedMatch);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-200" 
         style={{ 
           background: `linear-gradient(to bottom right, rgb(var(--color-bg-primary)), rgb(var(--color-bg-secondary)))` 
         }}>
      <div className="absolute inset-0" 
           style={{ 
             background: `radial-gradient(ellipse at top, rgb(var(--color-accent-primary) / 0.1), transparent, transparent)` 
           }}></div>

      <div className="relative z-10">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="border-b backdrop-blur-lg"
          style={{ 
            borderColor: `rgb(var(--color-border))`,
            background: `rgb(var(--color-bg-secondary) / 0.5)`
          }}
        >
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  className="p-3 rounded-2xl shadow-lg"
                  style={{
                    background: `linear-gradient(to bottom right, rgb(var(--color-accent-primary)), rgb(var(--color-accent-secondary)))`,
                    boxShadow: `0 0 20px rgb(var(--color-accent-primary) / 0.3)`
                  }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Activity className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(to right, rgb(var(--color-accent-primary)), rgb(var(--color-accent-secondary)))`
                      }}>
                    Tennis Analytics Pro
                  </h1>
                  <p style={{ color: `rgb(var(--color-text-secondary))` }} className="text-sm">
                    Real-Time Match Intelligence
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <ThemeToggle />
                <div className="text-right">
                  <p style={{ color: `rgb(var(--color-text-secondary))` }} className="text-sm">
                    Active Viewers
                  </p>
                  <p style={{ color: `rgb(var(--color-text-primary))` }} className="text-2xl font-bold">
                    24,891
                  </p>
                </div>
                <motion.div
                  className="w-3 h-3 rounded-full"
                  style={{ background: `rgb(var(--color-accent-primary))` }}
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
              {(() => {
                const LiveMatchViewAny = LiveMatchView as any;
                return <LiveMatchViewAny match={match} />;
              })()}
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
            <p style={{ color: `rgb(var(--color-text-secondary))` }} className="text-sm">
              Powered by real-time analytics and AI-driven insights
            </p>
          </motion.footer>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
