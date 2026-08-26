import React from 'react';
import { motion } from 'framer-motion';
import { ProgressRing } from './progress-ring';
import { useCFADashboardStats, useCFADeadlineCountdown } from './hooks';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, 
  AreaChart, Area, Cell 
} from 'recharts';
import { StatCard } from '@/components/shared/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  BookOpen, Clock, Award, CheckCircle2, RefreshCw, Sparkles, 
  ArrowRight, Target, TrendingUp, Zap 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]?.payload;
    return (
      <div className="bg-[#0e131f]/95 border border-blue-500/30 p-3 rounded-xl shadow-2xl backdrop-blur-md">
        <p className="text-xs font-bold text-white mb-1">{data?.fullName || label}</p>
        <p className="text-xs font-semibold text-blue-400">
          Completion: {data?.userProgress}% ({data?.completed}/{data?.total} topics)
        </p>
        <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
          Hours: {data?.actualHours}h / {data?.plannedHours}h
        </p>
      </div>
    );
  }
  return null;
};

export default function CFAPage() {
  const { data: stats, isLoading: isStatsLoading } = useCFADashboardStats();
  const { data: countdown } = useCFADeadlineCountdown();
  const navigate = useNavigate();

  const daysRemaining = countdown?.days || 158;
  const weeksRemaining = Number(countdown?.weeks || 22.5);
  
  const totalTopics = stats?.totalTopics || 324;
  const completedTopics = stats?.totalCompleted || 0;
  const remainingTopics = Math.max(0, totalTopics - completedTopics);
  const requiredTopicsPerWeek = (remainingTopics / (weeksRemaining || 1)).toFixed(1);
  const requiredHoursPerWeek = (Math.max(0, 300 - (stats?.overallHoursLogged || 0)) / (weeksRemaining || 1)).toFixed(1);

  const overallProgress = stats && stats.totalTopics > 0 ? (stats.totalCompleted / stats.totalTopics) * 100 : 0;

  const handleModuleClick = (modFullName: string) => {
    navigate(`/cfa/topics?module=${encodeURIComponent(modFullName)}`);
  };

  // Module Progress dataset (No exam weight)
  const moduleProgressData = stats?.modules.map(m => ({
    name: m.short,
    fullName: m.fullName,
    userProgress: m.percentage,
    completed: m.completed,
    total: m.total,
    plannedHours: m.plannedHours,
    actualHours: m.actualHours,
    color: m.color,
  })) || [];

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto text-foreground font-sans">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-blue-950/40 via-red-950/20 to-transparent p-6 rounded-3xl border border-blue-500/20 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <div className="space-y-1 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" /> CFA Level I 2027
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            CFA Command Center
          </h1>
        </div>

        {/* Countdown & Pace Card */}
        <motion.div 
          className="bg-[#0b0f19]/90 border border-blue-500/30 p-5 rounded-2xl shadow-xl backdrop-blur-xl flex items-center gap-4 shrink-0 z-10"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-600/30">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] text-blue-400 font-bold uppercase tracking-wider">Target: 31 Jan 2027</div>
            <div className="text-2xl md:text-3xl font-black text-white">{daysRemaining} <span className="text-sm font-medium text-zinc-400">days left</span></div>
            <div className="text-xs text-zinc-400 mt-0.5 font-medium">
              Pace: <strong className="text-blue-400">~{requiredHoursPerWeek} hrs/wk</strong> ({requiredTopicsPerWeek} topics/wk)
            </div>
          </div>
        </motion.div>
      </div>

      {/* 4 Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        <StatCard 
          title="Overall CFA Progress" 
          value={overallProgress} 
          format="percent"
          color="text-blue-400"
          gradient="from-blue-600/25 via-blue-600/5 to-transparent"
          changeLabel={`${completedTopics} of ${totalTopics} topics completed`} 
          icon={Award} 
        />
        <StatCard 
          title="Total Study Hours" 
          value={stats?.overallHoursLogged || 0} 
          format="hours"
          color="text-indigo-400"
          gradient="from-indigo-600/25 via-indigo-600/5 to-transparent"
          changeLabel="Target: 300+ Core Study Hours" 
          icon={Clock} 
        />
        <StatCard 
          title="Curriculum Mastered" 
          value={stats?.masteredTotal || 0} 
          format="number"
          suffix={` / ${totalTopics}`}
          color="text-emerald-400"
          gradient="from-emerald-600/25 via-emerald-600/5 to-transparent"
          changeLabel={`${stats?.firstPassTotal || 0} First Pass Done`} 
          icon={CheckCircle2} 
        />
        <StatCard 
          title="Revision Coverage" 
          value={stats?.revisedTotal || 0} 
          format="number"
          suffix=" Topics"
          color="text-rose-400"
          gradient="from-rose-600/25 via-rose-600/5 to-transparent"
          changeLabel="Revised Once or Twice" 
          icon={RefreshCw} 
        />
      </div>

      {/* 10 Module Progress Grid */}
      <Card className="bg-[#0b0f19]/80 border-blue-500/20 backdrop-blur-xl rounded-3xl shadow-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <CardTitle className="text-xl font-black text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            CFA Curriculum Modules
          </CardTitle>
          <Button 
            onClick={() => navigate('/cfa/topics')}
            size="sm" 
            className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs gap-1.5 shadow-md shadow-blue-600/30"
          >
            All Topics <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-items-stretch">
          {stats?.modules.map((m) => {
            let ringColor = '#ef4444'; // Red
            if (m.percentage >= 75) ringColor = '#10b981'; // Green
            else if (m.percentage >= 25) ringColor = '#f59e0b'; // Amber
            else if (m.percentage > 0) ringColor = '#3b82f6'; // Blue

            return (
              <motion.div 
                key={m.fullName} 
                whileHover={{ y: -4, scale: 1.03 }} 
                whileTap={{ scale: 0.97 }}
                onClick={() => handleModuleClick(m.fullName)}
                className="flex flex-col items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all cursor-pointer group text-center shadow-lg relative overflow-hidden"
              >
                <div className="w-full flex items-center justify-between mb-2 text-[10px] font-bold">
                  <span className="text-blue-400 font-mono">{m.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/5">
                    {m.short}
                  </span>
                </div>

                <div className="my-1">
                  <ProgressRing progress={m.percentage} size={84} strokeWidth={7} color={ringColor} label={m.short} />
                </div>

                <div className="w-full mt-2 pt-2 border-t border-white/5">
                  <div className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors truncate" title={m.fullName}>
                    {m.fullName}
                  </div>
                  <div className="text-[11px] text-zinc-400 font-medium mt-0.5">
                    {m.completed}/{m.total} topics • {m.actualHours}h
                  </div>
                </div>

                <div className="text-[10px] text-blue-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity mt-1.5 flex items-center gap-1">
                  Open Module →
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Analysis Charts Grid - Stacked Vertically */}
      <div className="flex flex-col gap-6">
        {/* Module Completion % BarChart */}
        <Card className="w-full bg-[#0b0f19]/80 border-blue-500/20 backdrop-blur-xl rounded-3xl shadow-2xl p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-400" />
              Module Completion %
            </CardTitle>
          </CardHeader>
          <div className="h-[340px] pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moduleProgressData} layout="vertical" margin={{ top: 5, right: 30, left: 35, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.4} horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `${v}%`} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar dataKey="userProgress" name="Completion %" radius={[0, 6, 6, 0]}>
                  {moduleProgressData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.userProgress >= 75 ? '#10b981' : entry.userProgress >= 25 ? '#3b82f6' : '#ef4444'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Study Hours Trajectory */}
        <Card className="w-full bg-[#0b0f19]/80 border-blue-500/20 backdrop-blur-xl rounded-3xl shadow-2xl p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Study Hours Trajectory
            </CardTitle>
          </CardHeader>
          <div className="h-[340px] pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats?.trajectory || []}>
                <defs>
                  <linearGradient id="targetHoursGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="actualHoursGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.45}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.4} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}h`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#090d18', borderColor: '#1e293b', borderRadius: '16px', color: '#fff', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.8)' }} 
                  formatter={(val: any) => [`${val} hrs`, '']}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Area type="monotone" dataKey="targetHours" name="Target (hrs)" stroke="#3b82f6" strokeWidth={2} strokeDasharray="4 4" fill="url(#targetHoursGrad)" />
                <Area type="monotone" dataKey="actualHours" name="Actual (hrs)" stroke="#ef4444" strokeWidth={2.5} fill="url(#actualHoursGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link 
          to="/cfa/topics" 
          className="p-6 rounded-3xl bg-gradient-to-br from-blue-900/30 via-[#0b0f19] to-[#05060a] border border-blue-500/30 hover:border-blue-500/60 shadow-xl transition-all group flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 inline-block">
              <BookOpen className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
              CFA Topics & LOS Tracker
            </h3>
          </div>
          <ArrowRight className="w-6 h-6 text-blue-400 group-hover:translate-x-1.5 transition-transform shrink-0 ml-4" />
        </Link>

        <Link 
          to="/cfa/revision" 
          className="p-6 rounded-3xl bg-gradient-to-br from-red-900/30 via-[#0b0f19] to-[#05060a] border border-red-500/30 hover:border-red-500/60 shadow-xl transition-all group flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 inline-block">
              <RefreshCw className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-white group-hover:text-red-300 transition-colors">
              February 2027 Revision Plan
            </h3>
          </div>
          <ArrowRight className="w-6 h-6 text-red-400 group-hover:translate-x-1.5 transition-transform shrink-0 ml-4" />
        </Link>
      </div>
    </div>
  );
}
