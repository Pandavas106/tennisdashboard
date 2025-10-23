import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Match } from '../types/tennis';
import { Target, Zap, TrendingUp, Activity } from 'lucide-react';

interface PlayerAnalysisProps {
  match: Match;
}

export const PlayerAnalysis = ({ match }: PlayerAnalysisProps) => {
  const { player1, player2, stats1, stats2 } = match;

  const compareData = [
    { stat: 'Aces', player1: stats1.aces, player2: stats2.aces },
    { stat: 'Winners', player1: stats1.winners, player2: stats2.winners },
    { stat: 'Errors', player1: stats1.unforcedErrors, player2: stats2.unforcedErrors },
    { stat: 'BP Won', player1: stats1.breakPointsWon, player2: stats2.breakPointsWon }
  ];

  const serve1Data = [
    { name: '1st Serve', value: stats1.firstServePercentage },
    { name: 'Miss', value: 100 - stats1.firstServePercentage }
  ];

  const serve2Data = [
    { name: '1st Serve', value: stats2.firstServePercentage },
    { name: 'Miss', value: 100 - stats2.firstServePercentage }
  ];

  const StatCard = ({ icon: Icon, label, value, statType }: { 
    icon: any, 
    label: string, 
    value: number, 
    statType: 'success' | 'primary' | 'warning' | 'error' 
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      className="p-4 rounded-xl backdrop-blur-sm shadow-lg theme-transition"
      style={{
        background: `linear-gradient(135deg, rgb(var(--color-${statType}) / 0.1), rgb(var(--color-${statType}) / 0.05))`,
        borderColor: `rgb(var(--color-${statType}) / 0.2)`,
        border: '1px solid'
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg theme-transition" 
             style={{ backgroundColor: `rgb(var(--color-bg-secondary) / 0.5)` }}>
          <Icon className="w-5 h-5" style={{ color: `rgb(var(--color-${statType}))` }} />
        </div>
        <span className="text-sm font-medium tennis-text-secondary">{label}</span>
      </div>
      <p className="text-3xl font-bold" style={{ color: `rgb(var(--color-${statType}))` }}>{value}</p>
    </motion.div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="tennis-card p-6 rounded-2xl shadow-xl theme-transition">
          <div className="flex items-center gap-3 mb-6">
            <img
              src={player1.photo}
              alt={player1.name}
              className="w-16 h-16 rounded-full object-cover border-2 theme-transition"
              style={{ borderColor: `rgb(var(--color-accent-primary))` }}
            />
            <div>
              <h3 className="text-xl font-bold tennis-text-primary flex items-center gap-2">
                {player1.name} {player1.countryFlag}
              </h3>
              <p className="text-sm tennis-text-secondary">Real-Time Statistics</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <StatCard icon={Zap} label="Aces" value={stats1.aces} statType="success" />
            <StatCard icon={Target} label="Winners" value={stats1.winners} statType="primary" />
            <StatCard icon={Activity} label="Double Faults" value={stats1.doubleFaults} statType="warning" />
            <StatCard icon={TrendingUp} label="Unforced Errors" value={stats1.unforcedErrors} statType="error" />
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium tennis-text-secondary">First Serve %</span>
                <span className="text-lg font-bold" style={{ color: `rgb(var(--color-success))` }}>
                  {stats1.firstServePercentage}%
                </span>
              </div>
              <div className="h-3 rounded-full overflow-hidden theme-transition" 
                   style={{ backgroundColor: `rgb(var(--color-bg-secondary))` }}>
                <motion.div
                  className="h-full"
                  style={{ background: 'var(--gradient-primary)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${stats1.firstServePercentage}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium tennis-text-secondary">Break Points Won</span>
                <span className="text-lg font-bold" style={{ color: `rgb(var(--color-accent-primary))` }}>
                  {stats1.breakPointsWon}/{stats1.breakPointsWon + stats1.breakPointsMissed}
                </span>
              </div>
              <div className="h-3 rounded-full overflow-hidden theme-transition"
                   style={{ backgroundColor: `rgb(var(--color-bg-secondary))` }}>
                <motion.div
                  className="h-full"
                  style={{ background: 'var(--gradient-primary)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats1.breakPointsWon / (stats1.breakPointsWon + stats1.breakPointsMissed)) * 100}%` }}
                  transition={{ duration: 1, delay: 0.4 }}
                />
              </div>
            </div>

            <div className="pt-4">
              <h4 className="text-sm font-semibold tennis-text-secondary mb-3">First Serve Accuracy</h4>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={serve1Data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {serve1Data.map((_, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 0 ? `rgb(var(--color-success))` : `rgb(var(--color-error))`} 
                      />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ 
                    backgroundColor: `rgb(var(--color-bg-secondary))`,
                    borderColor: `rgb(var(--color-border))`,
                    color: `rgb(var(--color-text-primary))`
                  }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="tennis-card p-6 rounded-2xl shadow-xl theme-transition">
          <div className="flex items-center gap-3 mb-6">
            <img
              src={player2.photo}
              alt={player2.name}
              className="w-16 h-16 rounded-full object-cover border-2 theme-transition"
              style={{ borderColor: `rgb(var(--color-accent-secondary))` }}
            />
            <div>
              <h3 className="text-xl font-bold tennis-text-primary flex items-center gap-2">
                {player2.name} {player2.countryFlag}
              </h3>
              <p className="text-sm tennis-text-secondary">Real-Time Statistics</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <StatCard icon={Zap} label="Aces" value={stats2.aces} statType="success" />
            <StatCard icon={Target} label="Winners" value={stats2.winners} statType="primary" />
            <StatCard icon={Activity} label="Double Faults" value={stats2.doubleFaults} statType="warning" />
            <StatCard icon={TrendingUp} label="Unforced Errors" value={stats2.unforcedErrors} statType="error" />
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium tennis-text-secondary">First Serve %</span>
                <span className="text-lg font-bold" style={{ color: `rgb(var(--color-success))` }}>
                  {stats2.firstServePercentage}%
                </span>
              </div>
              <div className="h-3 rounded-full overflow-hidden theme-transition"
                   style={{ backgroundColor: `rgb(var(--color-bg-secondary))` }}>
                <motion.div
                  className="h-full"
                  style={{ background: 'var(--gradient-primary)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${stats2.firstServePercentage}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium tennis-text-secondary">Break Points Won</span>
                <span className="text-lg font-bold" style={{ color: `rgb(var(--color-accent-primary))` }}>
                  {stats2.breakPointsWon}/{stats2.breakPointsWon + stats2.breakPointsMissed}
                </span>
              </div>
              <div className="h-3 rounded-full overflow-hidden theme-transition"
                   style={{ backgroundColor: `rgb(var(--color-bg-secondary))` }}>
                <motion.div
                  className="h-full"
                  style={{ background: 'var(--gradient-primary)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats2.breakPointsWon / (stats2.breakPointsWon + stats2.breakPointsMissed)) * 100}%` }}
                  transition={{ duration: 1, delay: 0.4 }}
                />
              </div>
            </div>

            <div className="pt-4">
              <h4 className="text-sm font-semibold tennis-text-secondary mb-3">First Serve Accuracy</h4>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={serve2Data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {serve2Data.map((_, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 0 ? `rgb(var(--color-success))` : `rgb(var(--color-error))`} 
                      />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ 
                    backgroundColor: `rgb(var(--color-bg-secondary))`,
                    borderColor: `rgb(var(--color-border))`,
                    color: `rgb(var(--color-text-primary))`
                  }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 tennis-card p-6 rounded-2xl shadow-xl theme-transition">
        <h3 className="text-xl font-bold tennis-text-primary mb-6">Head-to-Head Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={compareData}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={`rgb(var(--color-border))`} 
            />
            <XAxis 
              dataKey="stat" 
              stroke={`rgb(var(--color-text-secondary))`}
            />
            <YAxis 
              stroke={`rgb(var(--color-text-secondary))`}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: `rgb(var(--color-bg-secondary))`,
                borderColor: `rgb(var(--color-border))`,
                color: `rgb(var(--color-text-primary))`,
                borderRadius: '8px'
              }}
              labelStyle={{ color: `rgb(var(--color-text-primary))` }}
            />
            <Bar 
              dataKey="player1" 
              fill={`rgb(var(--color-accent-primary))`}
              radius={[8, 8, 0, 0]} 
              name={player1.name} 
            />
            <Bar 
              dataKey="player2" 
              fill={`rgb(var(--color-accent-secondary))`}
              radius={[8, 8, 0, 0]} 
              name={player2.name} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
