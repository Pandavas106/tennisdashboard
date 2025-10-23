import { motion } from 'framer-motion';
import { Player, MatchScore } from '../types/tennis';

interface PlayerScoreCardProps {
  player: Player;
  score: MatchScore;
  isServer: boolean;
  accentColor: 'primary' | 'secondary';
}

export const PlayerScoreCard = ({ player, score, isServer, accentColor }: PlayerScoreCardProps) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="relative p-6 rounded-2xl backdrop-blur-md theme-transition"
      style={{
        backgroundColor: isServer
          ? `rgb(var(--color-accent-${accentColor}) / 0.2)`
          : `rgb(var(--color-bg-secondary) / 0.5)`,
        borderWidth: isServer ? '2px' : '1px',
        borderColor: isServer
          ? `rgb(var(--color-accent-${accentColor}) / 0.5)`
          : `rgb(var(--color-border))`,
        boxShadow: isServer
          ? `0 10px 15px -3px rgb(var(--color-accent-${accentColor}) / 0.2)`
          : 'none'
      }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <img
            src={player.photo}
            alt={player.name}
            className="w-20 h-20 rounded-full object-cover border-4 theme-transition"
            style={{ borderColor: `rgb(var(--color-border))` }}
          />
          {isServer && (
            <motion.div
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `rgb(var(--color-accent-${accentColor}))` }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <span className="text-xs font-bold" style={{ color: `rgb(var(--color-bg-primary))` }}>
                S
              </span>
            </motion.div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-2xl font-bold tennis-text-primary">{player.name}</h3>
            <span className="text-3xl">{player.countryFlag}</span>
          </div>
          <p className="tennis-text-secondary text-sm">Rank #{player.ranking}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {score.sets.map((set: number, idx: number) => (
          <motion.div
            key={idx}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="w-12 h-12 rounded-xl flex items-center justify-center theme-transition"
            style={{
              backgroundColor: `rgb(var(--color-bg-secondary) / 0.5)`,
              borderColor: `rgb(var(--color-border))`,
              border: '1px solid'
            }}
          >
            <span className="text-2xl font-bold tennis-text-primary">{set}</span>
          </motion.div>
        ))}
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg"
          style={{
            background: `linear-gradient(135deg, rgb(var(--color-accent-${accentColor})), rgb(var(--color-accent-${accentColor === 'primary' ? 'secondary' : 'primary'})))`,
            boxShadow: `0 10px 15px -3px rgb(var(--color-accent-${accentColor}) / 0.3)`
          }}
        >
          <span className="text-3xl font-bold" style={{ color: `rgb(var(--color-bg-primary))` }}>
            {score.games}
          </span>
        </div>
        <motion.div
          key={score.points}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="ml-2 px-4 py-2 rounded-lg"
          style={{ backgroundColor: `rgb(var(--color-bg-secondary) / 0.8)` }}
        >
          <span
            className="text-2xl font-bold"
            style={{ color: `rgb(var(--color-accent-${accentColor}))` }}
          >
            {score.points}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};