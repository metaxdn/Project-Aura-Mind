import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, BookOpen, ShieldAlert, ArrowRight, Activity, Smile, Heart, CheckCircle2, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LandingPage: React.FC = () => {
  const { setCurrentView, selectedMood, setSelectedMood } = useApp();

  const moodOptions = [
    { emoji: '🌿', label: 'Calm', color: 'bg-pine-tint border-pine text-pine' },
    { emoji: '☀️', label: 'Energetic', color: 'bg-amber/15 border-amber text-amber-800' },
    { emoji: '🌊', label: 'Focused', color: 'bg-blue-50 border-blue-300 text-blue-800' },
    { emoji: '☁️', label: 'Anxious', color: 'bg-coral/15 border-coral text-coral' },
  ];

  // Motion variants
  const heroTextVariants = {
    hidden: { opacity: 0, x: -35 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  const heroGraphicVariants = {
    hidden: { opacity: 0, scale: 0.88, y: 15 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 } },
  };

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const gridItemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="min-h-[calc(100vh-5rem)]">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Soft Background Accents */}
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-pine-tint/40 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-amber/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Text Column */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroTextVariants}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-pine bg-pine-tint px-3.5 py-1.5 rounded-full border border-pine/20 font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber" />
              <span>Evidence-Based Mental Health Analytics</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-pine-deep tracking-tight leading-[1.12]">
              Track your state. <br />
              <em className="italic font-normal text-pine underline decoration-amber/60 decoration-wavy decoration-2">
                Nurture your clarity.
              </em>
            </h1>

            <p className="text-lg text-ink-soft max-w-xl leading-relaxed">
              A soothing, intelligent mental health score predictor and reflection vault. Seamlessly analyze screen habits, lifestyle parameters, and daily moods to unlock actionable mental well-being insights.
            </p>

            {/* Quick Mood Picker in Hero */}
            <div className="p-4 bg-surface rounded-lg border border-line shadow-card max-w-lg">
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-ink-soft mb-2.5 flex items-center justify-between">
                <span>How are you feeling right now?</span>
                <Smile className="w-4 h-4 text-pine" />
              </p>
              <div className="grid grid-cols-4 gap-2">
                {moodOptions.map(m => {
                  const isSelected = selectedMood === m.label;
                  return (
                    <motion.button
                      key={m.label}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedMood(m.label)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-md border text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-pine text-surface border-pine shadow-sm'
                          : 'bg-paper hover:bg-paper-deep border-line text-ink'
                      }`}
                    >
                      <span className="text-xl mb-1">{m.emoji}</span>
                      <span>{m.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setCurrentView('onboarding')}
                className="px-7 py-3.5 bg-pine hover:bg-pine-deep text-surface font-semibold text-base rounded-md shadow-lift flex items-center gap-3 transition-all"
              >
                <span>Calculate Your Mental Score</span>
                <ArrowRight className="w-5 h-5 text-amber" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentView('journal')}
                className="px-6 py-3.5 bg-surface hover:bg-paper border border-line text-pine-deep font-semibold text-base rounded-md shadow-card flex items-center gap-2 transition-all"
              >
                <BookOpen className="w-5 h-5 text-pine" />
                <span>Open Reflection Vault</span>
              </motion.button>
            </div>

            <div className="flex items-center gap-6 pt-2 text-xs text-ink-soft font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sage" /> Machine Learning Backend Ready
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sage" /> 100% Private & Local
              </span>
            </div>

          </motion.div>

          {/* Right Hero Visual Expanding Component */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroGraphicVariants}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md bg-gradient-to-br from-pine-deep to-pine rounded-lg p-6 text-surface shadow-lift border border-line/20">
              
              {/* Inner Decorative Header */}
              <div className="flex items-center justify-between pb-4 border-b border-surface/15 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber" />
                  <div className="w-3 h-3 rounded-full bg-sage" />
                  <div className="w-3 h-3 rounded-full bg-coral" />
                </div>
                <span className="font-mono text-xs text-surface/70">AuraMind Analytics v1.0</span>
              </div>

              {/* Dynamic Score Ring Showcase */}
              <div className="text-center py-6">
                <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="10" />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="#E3B341"
                      strokeWidth="10"
                      strokeDasharray="264"
                      strokeDashoffset="60"
                      strokeLinecap="round"
                      initial={{ strokeDashoffset: 264 }}
                      animate={{ strokeDashoffset: 60 }}
                      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-mono font-bold text-4xl text-surface tracking-tight">7.8</span>
                    <span className="text-xs text-surface/70 font-mono">out of 10</span>
                  </div>
                </div>

                <div className="mt-4 px-4 py-2 bg-surface/10 rounded-full inline-flex items-center gap-2 text-xs text-surface/90 font-medium">
                  <TrendingUp className="w-3.5 h-3.5 text-sage" />
                  <span>Optimal Mental Resilience Zone</span>
                </div>
              </div>

              {/* Floating Mini Cards */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-6 p-3 bg-surface text-ink rounded-md shadow-card border border-line flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-sm bg-pine-tint text-pine">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-pine-deep">Sleep & Recovery</p>
                    <p className="text-[11px] text-ink-soft">7.5 hours • Restful</p>
                  </div>
                </div>
                <span className="font-mono text-sage font-bold">+12%</span>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* 3-Column Feature Grid Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-line/60">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-pine bg-pine-tint px-3 py-1 rounded-full font-semibold">
            Core Ecosystem
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-pine-deep mt-3">
            Designed for thoughtful self-awareness
          </h2>
          <p className="text-ink-soft text-base mt-2">
            Every component is crafted with soothing visual tokens to eliminate cognitive friction.
          </p>
        </div>

        {/* Cascading Entry Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={gridContainerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >

          {/* Feature 1 */}
          <motion.div
            variants={gridItemVariants}
            whileHover={{ y: -5 }}
            onClick={() => setCurrentView('onboarding')}
            className="group cursor-pointer bg-surface p-8 rounded-lg border border-line shadow-card hover:shadow-lift transition-all relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-md bg-pine-tint text-pine flex items-center justify-center mb-6 group-hover:bg-pine group-hover:text-surface transition-colors">
              <Brain className="w-6 h-6" />
            </div>
            <span className="font-mono text-xs text-pine font-semibold uppercase tracking-wider block mb-1">01 / ML Predictor</span>
            <h3 className="font-display text-2xl font-semibold text-pine-deep mb-3">Mental Health Score Analysis</h3>
            <p className="text-ink-soft text-sm leading-relaxed mb-6">
              Input age, academic workload, sleep patterns, and daily screen unlocks to run real-time ML score prediction.
            </p>
            <div className="flex items-center text-sm font-semibold text-pine group-hover:text-pine-deep gap-2">
              <span>Start Assessment</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            variants={gridItemVariants}
            whileHover={{ y: -5 }}
            onClick={() => setCurrentView('journal')}
            className="group cursor-pointer bg-surface p-8 rounded-lg border border-line shadow-card hover:shadow-lift transition-all relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-md bg-amber/20 text-amber-800 flex items-center justify-center mb-6 group-hover:bg-amber group-hover:text-surface transition-colors">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="font-mono text-xs text-amber-800 font-semibold uppercase tracking-wider block mb-1">02 / Journal Vault</span>
            <h3 className="font-display text-2xl font-semibold text-pine-deep mb-3">Daily Reflection & Prompting</h3>
            <p className="text-ink-soft text-sm leading-relaxed mb-6">
              Express thoughts freely in a 40/60 split canvas with reactive character counting and spring-animated emotion tags.
            </p>
            <div className="flex items-center text-sm font-semibold text-pine group-hover:text-pine-deep gap-2">
              <span>Open Reflection Vault</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            variants={gridItemVariants}
            whileHover={{ y: -5 }}
            onClick={() => setCurrentView('resources')}
            className="group cursor-pointer bg-surface p-8 rounded-lg border border-line shadow-card hover:shadow-lift transition-all relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-md bg-sage/20 text-sage flex items-center justify-center mb-6 group-hover:bg-sage group-hover:text-surface transition-colors">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <span className="font-mono text-xs text-sage font-semibold uppercase tracking-wider block mb-1">03 / Care Directory</span>
            <h3 className="font-display text-2xl font-semibold text-pine-deep mb-3">Support Hub & Professional Care</h3>
            <p className="text-ink-soft text-sm leading-relaxed mb-6">
              Access emergency helplines, self-care exercises, and book consultations directly with certified counselors.
            </p>
            <div className="flex items-center text-sm font-semibold text-pine group-hover:text-pine-deep gap-2">
              <span>Explore Resources</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

        </motion.div>

      </section>

      {/* Quote Banner */}
      <section className="py-12 bg-pine-tint/50 border-y border-line/60 my-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heart className="w-8 h-8 text-pine mx-auto mb-3 opacity-80" />
          <blockquote className="font-display italic text-2xl text-pine-deep leading-snug">
            “Mental health is not a destination, but a process. It's about how you drive, not where you're going.”
          </blockquote>
          <p className="font-mono text-xs uppercase tracking-wider text-ink-soft mt-3 font-semibold">— Well-being Principle</p>
        </div>
      </section>

    </div>
  );
};
