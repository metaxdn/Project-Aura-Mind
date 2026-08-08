import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle, Smartphone, User, HeartPulse, HelpCircle, Loader2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Gender, AcademicLevel, SocialPlatform, PurposeOfUse, StressLevel } from '../../types';

export const OnboardingPage: React.FC = () => {
  const {
    onboardingStep,
    setOnboardingStep,
    formData,
    updateFormField,
    calculateScore,
    scoreLoading,
    selectedMood,
    setSelectedMood,
  } = useApp();

  const countries = ['USA', 'India', 'Canada', 'Australia', 'UK', 'Germany', 'Mexico', 'Turkey', 'France', 'Other'];
  const platforms: SocialPlatform[] = ['Instagram', 'LinkedIn', 'Facebook', 'YouTube', 'TikTok', 'Snapchat', 'Twitter', 'WhatsApp', 'WeChat'];
  const purposes: PurposeOfUse[] = ['Entertainment', 'Education', 'Networking', 'News'];
  const stressLevels: StressLevel[] = ['Low', 'Medium', 'High', 'Very High'];

  const moodEmojis = [
    { label: 'Peaceful', emoji: '🌿', bg: 'bg-emerald-50 border-emerald-300 text-emerald-800' },
    { label: 'Calm', emoji: '🧘', bg: 'bg-pine-tint border-pine text-pine' },
    { label: 'Focused', emoji: '🎯', bg: 'bg-blue-50 border-blue-300 text-blue-800' },
    { label: 'Tired', emoji: '☁️', bg: 'bg-amber/15 border-amber text-amber-900' },
    { label: 'Overwhelmed', emoji: '⚡', bg: 'bg-coral/15 border-coral text-coral' },
  ];

  const handleNext = () => {
    if (onboardingStep < 3) {
      setOnboardingStep(prev => prev + 1);
    } else {
      calculateScore();
    }
  };

  const handleBack = () => {
    if (onboardingStep > 1) {
      setOnboardingStep(prev => prev - 1);
    }
  };

  // Step percentage width
  const progressPercent = onboardingStep === 1 ? 33 : onboardingStep === 2 ? 66 : 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Header & Animated Progress Bar */}
      <div className="mb-8 text-center max-w-xl mx-auto">
        <span className="font-mono text-xs uppercase tracking-widest text-pine bg-pine-tint px-3 py-1 rounded-full font-semibold inline-flex items-center gap-1.5 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber" /> Assessment Wizard
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-medium text-pine-deep">
          {onboardingStep === 1 && 'Profile & Demographics'}
          {onboardingStep === 2 && 'Digital Habits & Screen Usage'}
          {onboardingStep === 3 && 'Lifestyle & Stress Factors'}
        </h1>
        <p className="text-ink-soft text-sm mt-1.5">
          Step {onboardingStep} of 3 — Calibrating your personal health metrics
        </p>

        {/* Smooth Animated Progress Bar */}
        <div className="w-full h-2.5 bg-line rounded-full overflow-hidden mt-6 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-pine to-sage rounded-full"
            initial={{ width: '33%' }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      {/* Main Centered Card Container */}
      <div className="bg-surface rounded-lg border border-line p-6 sm:p-10 shadow-card relative overflow-hidden">
        
        <AnimatePresence mode="wait">
          {/* STEP 1: Profile & Demographics */}
          {onboardingStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 border-b border-line pb-3 mb-6">
                <User className="w-5 h-5 text-pine" />
                <h2 className="font-display text-xl font-semibold text-pine-deep">Basic Information</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Age Input */}
                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-2 font-mono uppercase tracking-wider">
                    Age (Years)
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={100}
                    value={formData.age}
                    onChange={(e) => updateFormField('age', Number(e.target.value))}
                    className="w-full px-4 py-3 bg-paper border border-line rounded-sm text-ink focus:outline-none focus:border-pine focus:ring-2 focus:ring-pine-tint transition-all"
                  />
                  <p className="text-[11px] text-ink-soft mt-1">Accepts age 10 to 100</p>
                </div>

                {/* Gender Select */}
                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-2 font-mono uppercase tracking-wider">
                    Gender Identity
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['Female', 'Male'] as Gender[]).map(g => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => updateFormField('gender', g)}
                        className={`py-3 px-4 rounded-sm border text-sm font-semibold transition-all ${
                          formData.gender === g
                            ? 'bg-pine text-surface border-pine shadow-sm'
                            : 'bg-paper text-ink border-line hover:border-pine/50'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Country Selection */}
                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-2 font-mono uppercase tracking-wider">
                    Country of Residence
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => updateFormField('country', e.target.value)}
                    className="w-full px-4 py-3 bg-paper border border-line rounded-sm text-ink focus:outline-none focus:border-pine focus:ring-2 focus:ring-pine-tint transition-all appearance-none cursor-pointer"
                  >
                    {countries.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Academic Level */}
                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-2 font-mono uppercase tracking-wider">
                    Academic Level
                  </label>
                  <select
                    value={formData.academic_level}
                    onChange={(e) => updateFormField('academic_level', e.target.value as AcademicLevel)}
                    className="w-full px-4 py-3 bg-paper border border-line rounded-sm text-ink focus:outline-none focus:border-pine focus:ring-2 focus:ring-pine-tint transition-all appearance-none cursor-pointer"
                  >
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Graduate">Graduate</option>
                    <option value="High School">High School</option>
                  </select>
                </div>

              </div>

              {/* Interactive Mood Row */}
              <div className="pt-4 border-t border-line">
                <label className="block text-xs font-semibold text-ink-soft mb-3 font-mono uppercase tracking-wider">
                  Select your current emotional state
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {moodEmojis.map(m => {
                    const isSelected = selectedMood === m.label;
                    return (
                      <motion.button
                        key={m.label}
                        type="button"
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedMood(m.label)}
                        className={`flex flex-col items-center p-3 rounded-md border transition-all ${
                          isSelected
                            ? `${m.bg} shadow-md ring-2 ring-pine/30 scale-105`
                            : 'bg-paper border-line text-ink-soft hover:bg-paper-deep'
                        }`}
                      >
                        <span className="text-2xl mb-1">{m.emoji}</span>
                        <span className="text-xs font-semibold">{m.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

            </motion.div>
          )}

          {/* STEP 2: Digital Habits & Screen Usage */}
          {onboardingStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 border-b border-line pb-3 mb-6">
                <Smartphone className="w-5 h-5 text-pine" />
                <h2 className="font-display text-xl font-semibold text-pine-deep">Screen & Social Media Usage</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Most Used Platform */}
                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-2 font-mono uppercase tracking-wider">
                    Primary Social Platform
                  </label>
                  <select
                    value={formData.most_used_platform}
                    onChange={(e) => updateFormField('most_used_platform', e.target.value as SocialPlatform)}
                    className="w-full px-4 py-3 bg-paper border border-line rounded-sm text-ink focus:outline-none focus:border-pine focus:ring-2 focus:ring-pine-tint transition-all appearance-none cursor-pointer"
                  >
                    {platforms.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                {/* Purpose of Use */}
                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-2 font-mono uppercase tracking-wider">
                    Main Purpose of Use
                  </label>
                  <select
                    value={formData.purpose_of_use}
                    onChange={(e) => updateFormField('purpose_of_use', e.target.value as PurposeOfUse)}
                    className="w-full px-4 py-3 bg-paper border border-line rounded-sm text-ink focus:outline-none focus:border-pine focus:ring-2 focus:ring-pine-tint transition-all appearance-none cursor-pointer"
                  >
                    {purposes.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                {/* Avg Daily Usage Hours */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-ink-soft font-mono uppercase tracking-wider">
                      Daily Screen Usage
                    </label>
                    <span className="font-mono text-sm font-bold text-pine">{formData.avg_daily_usage_hours} hrs/day</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={16}
                    step={0.5}
                    value={formData.avg_daily_usage_hours}
                    onChange={(e) => updateFormField('avg_daily_usage_hours', Number(e.target.value))}
                    className="w-full accent-pine cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-ink-soft mt-1">
                    <span>0h (Minimal)</span>
                    <span>8h</span>
                    <span>16h (Heavy)</span>
                  </div>
                </div>

                {/* Daily Phone Unlocks */}
                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-2 font-mono uppercase tracking-wider">
                    Estimated Daily Phone Unlocks
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={300}
                    value={formData.daily_unlocks}
                    onChange={(e) => updateFormField('daily_unlocks', Number(e.target.value))}
                    className="w-full px-4 py-3 bg-paper border border-line rounded-sm text-ink focus:outline-none focus:border-pine focus:ring-2 focus:ring-pine-tint transition-all"
                  />
                  <p className="text-[11px] text-ink-soft mt-1">Average user unlocks 50-80 times daily</p>
                </div>

              </div>
            </motion.div>
          )}

          {/* STEP 3: Lifestyle & Stress Factors */}
          {onboardingStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 border-b border-line pb-3 mb-6">
                <HeartPulse className="w-5 h-5 text-pine" />
                <h2 className="font-display text-xl font-semibold text-pine-deep">Sleep & Stress Level</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Study Hours */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-ink-soft font-mono uppercase tracking-wider">
                      Study / Work Hours
                    </label>
                    <span className="font-mono text-sm font-bold text-pine">{formData.study_hours} hrs/day</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={14}
                    step={0.5}
                    value={formData.study_hours}
                    onChange={(e) => updateFormField('study_hours', Number(e.target.value))}
                    className="w-full accent-pine cursor-pointer"
                  />
                </div>

                {/* Sleep Hours per night */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-ink-soft font-mono uppercase tracking-wider">
                      Sleep Per Night
                    </label>
                    <span className="font-mono text-sm font-bold text-pine">{formData.sleep_hours_per_night} hrs</span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={12}
                    step={0.5}
                    value={formData.sleep_hours_per_night}
                    onChange={(e) => updateFormField('sleep_hours_per_night', Number(e.target.value))}
                    className="w-full accent-pine cursor-pointer"
                  />
                </div>

                {/* Physical Activity */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-ink-soft font-mono uppercase tracking-wider">
                      Physical Activity / Sports
                    </label>
                    <span className="font-mono text-sm font-bold text-pine">{formData.physical_activity_hours} hrs/day</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={6}
                    step={0.5}
                    value={formData.physical_activity_hours}
                    onChange={(e) => updateFormField('physical_activity_hours', Number(e.target.value))}
                    className="w-full accent-pine cursor-pointer"
                  />
                </div>

                {/* Stress Level Segmented Control */}
                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-2 font-mono uppercase tracking-wider">
                    Perceived Stress Level
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {stressLevels.map(s => {
                      const isActive = formData.stress_level === s;
                      let activeStyle = 'bg-pine border-pine text-surface';
                      if (s === 'Very High') activeStyle = 'bg-coral border-coral text-surface';
                      if (s === 'High') activeStyle = 'bg-amber-600 border-amber-600 text-surface';

                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => updateFormField('stress_level', s)}
                          className={`py-2.5 px-1 rounded-sm border text-xs font-semibold text-center transition-all ${
                            isActive ? activeStyle : 'bg-paper text-ink-soft border-line hover:border-pine/50'
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* API Integration note */}
              <div className="mt-6 p-4 bg-pine-tint/60 rounded-md border border-pine/20 flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-pine shrink-0 mt-0.5" />
                <div className="text-xs text-pine-deep">
                  <p className="font-semibold">FastAPI Model Integration Ready</p>
                  <p className="mt-0.5 text-ink-soft">
                    Submitting this form queries <code className="bg-surface px-1.5 py-0.5 rounded text-pine">http://localhost:8000/predict</code> with your exact Pydantic schema parameters.
                  </p>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Wizard Action Buttons */}
        <div className="flex items-center justify-between pt-8 mt-8 border-t border-line">
          
          <button
            type="button"
            onClick={handleBack}
            disabled={onboardingStep === 1 || scoreLoading}
            className={`px-5 py-2.5 rounded-sm text-sm font-semibold flex items-center gap-2 transition-all ${
              onboardingStep === 1
                ? 'opacity-0 pointer-events-none'
                : 'bg-paper hover:bg-paper-deep text-ink-soft hover:text-ink border border-line'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={handleNext}
            disabled={scoreLoading}
            className="px-7 py-3 bg-pine hover:bg-pine-deep text-surface text-sm font-semibold rounded-sm shadow-card flex items-center gap-2 transition-all disabled:opacity-75"
          >
            {scoreLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-amber" />
                <span>Predicting Score...</span>
              </>
            ) : onboardingStep === 3 ? (
              <>
                <span>Calculate Mental Health Score</span>
                <CheckCircle className="w-4 h-4 text-amber" />
              </>
            ) : (
              <>
                <span>Next Step</span>
                <ArrowRight className="w-4 h-4 text-amber" />
              </>
            )}
          </motion.button>

        </div>

      </div>

    </div>
  );
};
