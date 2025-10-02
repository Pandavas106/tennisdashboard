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

  const COLORS = ['#10b981', '#ef4444'];

  const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      className={`p-4 rounded-xl bg-gradient-to-br ${color} backdrop-blur-sm border border-slate-700/50 shadow-lg`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-slate-800/50">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className="text-sm font-medium text-slate-300">{label}</span>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
    </motion.div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <img
              src={player1.photo}
              alt={player1.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500"
            />
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                {player1.name} {player1.countryFlag}
              </h3>
              <p className="text-sm text-slate-400">Real-Time Statistics</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <StatCard icon={Zap} label="Aces" value={stats1.aces} color="from-emerald-500/20 to-emerald-600/20" />
            <StatCard icon={Target} label="Winners" value={stats1.winners} color="from-blue-500/20 to-blue-600/20" />
            <StatCard icon={Activity} label="Double Faults" value={stats1.doubleFaults} color="from-orange-500/20 to-orange-600/20" />
            <StatCard icon={TrendingUp} label="Unforced Errors" value={stats1.unforcedErrors} color="from-red-500/20 to-red-600/20" />
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-300">First Serve %</span>
                <span className="text-lg font-bold text-emerald-400">{stats1.firstServePercentage}%</span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${stats1.firstServePercentage}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-300">Break Points Won</span>
                <span className="text-lg font-bold text-blue-400">
                  {stats1.breakPointsWon}/{stats1.breakPointsWon + stats1.breakPointsMissed}
                </span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats1.breakPointsWon / (stats1.breakPointsWon + stats1.breakPointsMissed)) * 100}%` }}
                  transition={{ duration: 1, delay: 0.4 }}
                />
              </div>
            </div>

            <div className="pt-4">
              <h4 className="text-sm font-semibold text-slate-400 mb-3">First Serve Accuracy</h4>
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
                    {serve1Data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <img
              src={player2.photo}
              alt={player2.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
            />
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                {player2.name} {player2.countryFlag}
              </h3>
              <p className="text-sm text-slate-400">Real-Time Statistics</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <StatCard icon={Zap} label="Aces" value={stats2.aces} color="from-emerald-500/20 to-emerald-600/20" />
            <StatCard icon={Target} label="Winners" value={stats2.winners} color="from-blue-500/20 to-blue-600/20" />
            <StatCard icon={Activity} label="Double Faults" value={stats2.doubleFaults} color="from-orange-500/20 to-orange-600/20" />
            <StatCard icon={TrendingUp} label="Unforced Errors" value={stats2.unforcedErrors} color="from-red-500/20 to-red-600/20" />
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-300">First Serve %</span>
                <span className="text-lg font-bold text-emerald-400">{stats2.firstServePercentage}%</span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${stats2.firstServePercentage}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-300">Break Points Won</span>
                <span className="text-lg font-bold text-blue-400">
                  {stats2.breakPointsWon}/{stats2.breakPointsWon + stats2.breakPointsMissed}
                </span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats2.breakPointsWon / (stats2.breakPointsWon + stats2.breakPointsMissed)) * 100}%` }}
                  transition={{ duration: 1, delay: 0.4 }}
                />
              </div>
            </div>

            <div className="pt-4">
              <h4 className="text-sm font-semibold text-slate-400 mb-3">First Serve Accuracy</h4>
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
                    {serve2Data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-6">Head-to-Head Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={compareData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="stat" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              labelStyle={{ color: '#f1f5f9' }}
            />
            <Bar dataKey="player1" fill="#10b981" radius={[8, 8, 0, 0]} name={player1.name} />
            <Bar dataKey="player2" fill="#3b82f6" radius={[8, 8, 0, 0]} name={player2.name} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
