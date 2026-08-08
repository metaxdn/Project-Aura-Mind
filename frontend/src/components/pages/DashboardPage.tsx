import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Sparkles, TrendingUp, AlertTriangle, ShieldCheck, RefreshCw, ChevronDown, ChevronUp, Trash2, Moon, Smartphone, Zap } from 'lucide-react';
import { SidebarNav } from '../layout/SidebarNav';
import { useApp } from '../../context/AppContext';

export const DashboardPage: React.FC = () => {
  const {
    predictedScore,
    formData,
    journalEntries,
    deleteJournalEntry,
    setCurrentView,
    calculateScore,
    scoreLoading
  } = useApp();

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [expandedLogRow, setExpandedLogRow] = useState<string | null>(null);
  const [radialVal, setRadialVal] = useState<number>(0);

  const displayScore = predictedScore ?? 7.8;
  const scorePercentage = Math.round((displayScore / 10) * 100);

  // Radial SVG count-up animation on page mount
  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = scorePercentage / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= scorePercentage) {
        setRadialVal(scorePercentage);
        clearInterval(timer);
      } else {
        setRadialVal(Math.round(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [scorePercentage]);

  // Stroke Dash calculation for SVG circle
  const circumference = 2 * Math.PI * 48; // r = 48 -> 301.59
  const strokeDashoffset = circumference - (radialVal / 100) * circumference;

  // Analysis tier
  const getScoreTier = (score: number) => {
    if (score >= 8.0) return { title: 'Optimal Resilience Zone', color: 'text-sage', bg: 'bg-sage/15 border-sage/30', desc: 'Your sleep, digital balance, and physical habits support high emotional stability.' };
    if (score >= 6.0) return { title: 'Moderate Balance', color: 'text-pine', bg: 'bg-pine-tint border-pine/30', desc: 'Balanced lifestyle with occasional screen-time overload. Minor adjustments will boost recovery.' };
    return { title: 'High Stress Alert', color: 'text-coral', bg: 'bg-coral/15 border-coral/30', desc: 'High stress level and low sleep detected. Recommended to take a digital detox break.' };
  };

  const tier = getScoreTier(displayScore);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Persistent Navigation Rail */}
        <SidebarNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Dashboard Content Area */}
        <div className="flex-1 space-y-8 min-w-0">
          
          {/* Summary Hero: Radial SVG Progress Wheel & Analysis Block */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-pine-deep to-pine rounded-lg p-6 sm:p-8 text-surface shadow-lift relative overflow-hidden"
          >
            {/* Background glowing blur */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              
              {/* Circular SVG Radial Wheel */}
              <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="10" />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke="#E3B341"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transition={{ duration: 0.3 }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-mono font-bold text-4xl text-surface tracking-tight">
                    {displayScore.toFixed(1)}
                  </span>
                  <span className="font-mono text-xs text-amber font-semibold uppercase tracking-wider mt-0.5">
                    {radialVal}% Score
                  </span>
                </div>
              </div>

              {/* Text Analysis Block */}
              <div className="flex-1 text-center md:text-left space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold font-mono bg-surface/15 text-surface border border-surface/20">
                  <Sparkles className="w-3.5 h-3.5 text-amber" />
                  <span>Predicted Mental Health Index</span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-surface">
                  {tier.title}
                </h2>

                <p className="text-surface/85 text-sm max-w-xl leading-relaxed">
                  {tier.desc}
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono">
                  <span className="bg-surface/10 px-3 py-1.5 rounded-sm border border-surface/15 flex items-center gap-1.5">
                    <Moon className="w-3.5 h-3.5 text-amber" /> Sleep: {formData.sleep_hours_per_night}h/night
                  </span>
                  <span className="bg-surface/10 px-3 py-1.5 rounded-sm border border-surface/15 flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-sage" /> Usage: {formData.avg_daily_usage_hours}h/day
                  </span>
                  <button
                    onClick={calculateScore}
                    disabled={scoreLoading}
                    className="bg-surface text-pine-deep font-bold px-3 py-1.5 rounded-sm hover:bg-paper transition-colors flex items-center gap-1"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${scoreLoading ? 'animate-spin' : ''}`} /> Recalculate
                  </button>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Analytics Grid: 2-Column Responsive Visualization Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Chart Card 1: Sleep vs Screen Usage Balance */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-surface p-6 rounded-lg border border-line shadow-card space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-pine-deep">Digital Balance Index</h3>
                  <p className="text-xs text-ink-soft">Screen time vs rest equilibrium ratio</p>
                </div>
                <div className="p-2 rounded-sm bg-pine-tint text-pine">
                  <Activity className="w-5 h-5" />
                </div>
              </div>

              {/* Mock Visualization Bars */}
              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-ink-soft">Sleep Quality</span>
                    <span className="font-semibold text-pine">{formData.sleep_hours_per_night >= 7 ? 'Optimal (85%)' : 'Needs Improvement (55%)'}</span>
                  </div>
                  <div className="w-full h-3 bg-paper rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sage rounded-full"
                      style={{ width: `${Math.min(100, (formData.sleep_hours_per_night / 9) * 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-ink-soft">Screen Time Threshold</span>
                    <span className="font-semibold text-amber-800">{formData.avg_daily_usage_hours > 6 ? 'High Exposure' : 'Moderate'}</span>
                  </div>
                  <div className="w-full h-3 bg-paper rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber rounded-full"
                      style={{ width: `${Math.min(100, (formData.avg_daily_usage_hours / 12) * 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-ink-soft">Physical Activity Boost</span>
                    <span className="font-semibold text-pine">{formData.physical_activity_hours} hrs/day</span>
                  </div>
                  <div className="w-full h-3 bg-paper rounded-full overflow-hidden">
                    <div
                      className="h-full bg-pine rounded-full"
                      style={{ width: `${Math.min(100, (formData.physical_activity_hours / 3) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

            </motion.div>

            {/* Chart Card 2: Risk & Stress Factors Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-surface p-6 rounded-lg border border-line shadow-card space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-pine-deep">Stress Factor Breakdown</h3>
                  <p className="text-xs text-ink-soft">Core contributors to mental strain</p>
                </div>
                <div className="p-2 rounded-sm bg-amber/15 text-amber-800">
                  <Zap className="w-5 h-5" />
                </div>
              </div>

              {/* Stress indicators */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-paper rounded-md border border-line">
                  <span className="text-[11px] font-mono text-ink-soft block uppercase">Stress Level</span>
                  <span className={`font-display text-lg font-bold ${formData.stress_level === 'Very High' ? 'text-coral' : 'text-pine-deep'}`}>
                    {formData.stress_level}
                  </span>
                </div>

                <div className="p-3 bg-paper rounded-md border border-line">
                  <span className="text-[11px] font-mono text-ink-soft block uppercase">Daily Unlocks</span>
                  <span className="font-display text-lg font-bold text-pine-deep">
                    {formData.daily_unlocks} <span className="text-xs font-normal text-ink-soft">times</span>
                  </span>
                </div>

                <div className="p-3 bg-paper rounded-md border border-line">
                  <span className="text-[11px] font-mono text-ink-soft block uppercase">Top Platform</span>
                  <span className="font-display text-base font-semibold text-pine-deep">
                    {formData.most_used_platform}
                  </span>
                </div>

                <div className="p-3 bg-paper rounded-md border border-line">
                  <span className="text-[11px] font-mono text-ink-soft block uppercase">Study Workload</span>
                  <span className="font-display text-base font-semibold text-pine-deep">
                    {formData.study_hours} hrs
                  </span>
                </div>
              </div>

              <div className="p-3 bg-pine-tint/60 rounded-md border border-pine/20 text-xs text-pine flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Maintain 7+ hours sleep to offset daily study stress.</span>
              </div>
            </motion.div>

          </div>

          {/* Recent Logs History Table Component */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-surface rounded-lg border border-line p-6 shadow-card space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
              <div>
                <h3 className="font-display text-xl font-semibold text-pine-deep">Recent Reflections & Logs</h3>
                <p className="text-xs text-ink-soft">History of your daily journal entries</p>
              </div>

              <button
                onClick={() => setCurrentView('journal')}
                className="px-4 py-2 bg-pine hover:bg-pine-deep text-surface text-xs font-semibold rounded-sm shadow-sm transition-colors self-start sm:self-auto"
              >
                + New Journal Entry
              </button>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-xs font-mono uppercase text-ink-soft bg-paper/60">
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Mood</th>
                    <th className="py-3 px-4">Prompt</th>
                    <th className="py-3 px-4">Words</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {journalEntries.map(entry => {
                    const isExpanded = expandedLogRow === entry.id;
                    return (
                      <React.Fragment key={entry.id}>
                        <tr className="hover:bg-paper/40 transition-colors">
                          <td className="py-3.5 px-4 font-mono text-xs font-semibold text-pine-deep">
                            {entry.date} <span className="text-[11px] font-normal text-ink-soft block">{entry.time}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-pine-tint text-pine border border-pine/20">
                              {entry.mood}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-medium text-ink max-w-xs truncate">
                            {entry.prompt}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-xs text-ink-soft">
                            {entry.wordCount} words
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setExpandedLogRow(isExpanded ? null : entry.id)}
                                className="p-1.5 text-ink-soft hover:text-pine hover:bg-paper rounded-sm transition-colors"
                                title="View content"
                              >
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </button>
                              <button
                                onClick={() => deleteJournalEntry(entry.id)}
                                className="p-1.5 text-ink-soft hover:text-coral hover:bg-coral/10 rounded-sm transition-colors"
                                title="Delete log"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* Expanded Row Drawer */}
                        {isExpanded && (
                          <tr>
                            <td colSpan={5} className="bg-paper/70 p-4 border-b border-line">
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-2 text-xs"
                              >
                                <p className="font-mono text-pine font-semibold">Prompt: {entry.prompt}</p>
                                <p className="text-ink text-sm whitespace-pre-line leading-relaxed bg-surface p-3 rounded border border-line">
                                  {entry.content}
                                </p>
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                  {entry.tags.map(t => (
                                    <span key={t} className="px-2 py-0.5 bg-surface text-ink-soft border border-line rounded text-[10px] font-mono">
                                      #{t}
                                    </span>
                                  ))}
                                </div>
                              </motion.div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </motion.div>

        </div>

      </div>

    </div>
  );
};
