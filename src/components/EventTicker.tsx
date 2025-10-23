import { motion } from 'framer-motion';
import { Zap, Target, AlertCircle, TrendingUp } from 'lucide-react';
import { MatchEvent } from '../types/tennis';

interface EventTickerProps {
  events: MatchEvent[];
}

export const EventTicker = ({ events }: EventTickerProps) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'ace':
        return <Zap className="w-4 h-4" />;
      case 'winner':
        return <Target className="w-4 h-4" />;
      case 'double_fault':
        return <AlertCircle className="w-4 h-4" />;
      case 'break_point':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'ace':
        return {
          background: `linear-gradient(to right, rgb(var(--color-success) / 0.2), rgb(var(--color-success) / 0.1))`,
          borderColor: `rgb(var(--color-success) / 0.3)`,
          color: `rgb(var(--color-success))`
        };
      case 'winner':
        return {
          background: `linear-gradient(to right, rgb(var(--color-accent-primary) / 0.2), rgb(var(--color-accent-primary) / 0.1))`,
          borderColor: `rgb(var(--color-accent-primary) / 0.3)`,
          color: `rgb(var(--color-accent-primary))`
        };
      case 'double_fault':
        return {
          background: `linear-gradient(to right, rgb(var(--color-error) / 0.2), rgb(var(--color-error) / 0.1))`,
          borderColor: `rgb(var(--color-error) / 0.3)`,
          color: `rgb(var(--color-error))`
        };
      case 'break_point':
        return {
          background: `linear-gradient(to right, rgb(var(--color-warning) / 0.2), rgb(var(--color-warning) / 0.1))`,
          borderColor: `rgb(var(--color-warning) / 0.3)`,
          color: `rgb(var(--color-warning))`
        };
      default:
        return {
          background: `linear-gradient(to right, rgb(var(--color-text-secondary) / 0.2), rgb(var(--color-text-secondary) / 0.1))`,
          borderColor: `rgb(var(--color-text-secondary) / 0.3)`,
          color: `rgb(var(--color-text-secondary))`
        };
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-card-bg border border-color-border shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-color-bg-secondary/10 to-transparent animate-pulse"></div>

      <div className="relative z-10 p-4">
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            className="p-2 rounded-lg bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Zap className="w-5 h-5 text-accent-primary" />
          </motion.div>
          <div>
            <h3 className="text-lg font-bold text-text-primary">Live Event Feed</h3>
            <p className="text-xs text-text-secondary">Real-time match updates</p>
          </div>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
          {events.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-text-secondary">Waiting for match events...</p>
            </div>
          ) : (
            events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 25,
                  delay: index * 0.05
                }}
                className={`p-4 rounded-xl bg-gradient-to-r from-bg-secondary/20 to-bg-secondary/10 backdrop-blur-sm border ${getEventColor(event.type)} transition-all hover:scale-[1.02]`}
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    className="mt-1"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {getEventIcon(event.type)}
                  </motion.div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-text-primary text-sm">{event.player}</span>
                      <span className="text-xs text-text-secondary font-mono">{formatTime(event.timestamp)}</span>
                    </div>
                    <p className="text-sm text-text-secondary">{event.description}</p>
                    <div className="mt-2 inline-block">
                      <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded ${getEventColor(event.type)} bg-opacity-50`}>
                        {event.type.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none"></div>
    </div>
  );
};
