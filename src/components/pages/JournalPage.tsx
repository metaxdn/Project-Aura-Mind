import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, RefreshCw, Calendar as CalendarIcon, Sparkles, CheckCircle2, Tag, Trash2, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';

export const JournalPage: React.FC = () => {
  const { journalEntries, addJournalEntry, deleteJournalEntry } = useApp();

  const dynamicPrompts = [
    'What made you feel grounded and present today?',
    'How did your screen time or social media use affect your energy?',
    'Name three small moments of peace or gratitude from your day.',
    'What emotion was most present for you this afternoon, and why?',
    'What is one boundary or healthy habit you practiced today?',
    'What thought can you gently release before going to sleep tonight?'
  ];

  const emotionTags = [
    { label: 'Calm', color: 'peer-checked:bg-pine peer-checked:text-surface peer-checked:border-pine' },
    { label: 'Grateful', color: 'peer-checked:bg-amber peer-checked:text-pine-deep peer-checked:border-amber' },
    { label: 'Focused', color: 'peer-checked:bg-blue-600 peer-checked:text-surface peer-checked:border-blue-600' },
    { label: 'Anxious', color: 'peer-checked:bg-coral peer-checked:text-surface peer-checked:border-coral' },
    { label: 'Overwhelmed', color: 'peer-checked:bg-rose-700 peer-checked:text-surface peer-checked:border-rose-700' },
    { label: 'Exhausted', color: 'peer-checked:bg-slate-700 peer-checked:text-surface peer-checked:border-slate-700' },
    { label: 'Energetic', color: 'peer-checked:bg-sage peer-checked:text-surface peer-checked:border-sage' },
  ];

  const [currentPromptIndex, setCurrentPromptIndex] = useState<number>(0);
  const [journalContent, setJournalContent] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Mindfulness']);
  const [selectedMood, setSelectedMood] = useState<string>('Calm');

  const activePrompt = dynamicPrompts[currentPromptIndex];

  const handleNextPrompt = () => {
    setCurrentPromptIndex(prev => (prev + 1) % dynamicPrompts.length);
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    } else {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  const handleSave = () => {
    if (!journalContent.trim()) return;

    addJournalEntry({
      prompt: activePrompt,
      content: journalContent,
      mood: selectedMood,
      tags: selectedTags,
    });

    // Fire celebration confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });

    // Reset content
    setJournalContent('');
  };

  const charCount = journalContent.length;
  const wordCount = journalContent.trim().split(/\s+/).filter(w => w.length > 0).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="mb-8">
        <span className="font-mono text-xs uppercase tracking-widest text-pine bg-pine-tint px-3 py-1 rounded-full font-semibold inline-flex items-center gap-1.5 mb-2">
          <BookOpen className="w-3.5 h-3.5 text-pine" /> Reflection Vault
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-medium text-pine-deep">
          Daily Journal & Mindfulness Canvas
        </h1>
        <p className="text-ink-soft text-sm mt-1">
          A distraction-free writing sanctuary designed for self-expression and mental clarity.
        </p>
      </div>

      {/* 40/60 Split Page Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN (40% width on Desktop: lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Interactive Tracking Calendar Card */}
          <div className="bg-surface rounded-lg border border-line p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-pine" />
                <h3 className="font-display text-lg font-semibold text-pine-deep">August 2026 Calendar</h3>
              </div>
              <span className="font-mono text-xs text-pine bg-pine-tint px-2.5 py-1 rounded-full font-semibold">
                Streak: 5 Days 🔥
              </span>
            </div>

            {/* Grid of days */}
            <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                <span key={d} className="text-ink-soft py-1 font-semibold">{d}</span>
              ))}
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                const isToday = day === 8;
                const isLogged = [1, 3, 5, 7, 8].includes(day);
                return (
                  <button
                    key={day}
                    className={`py-2 rounded-sm transition-all text-xs font-semibold ${
                      isToday
                        ? 'bg-pine text-surface font-bold shadow-sm'
                        : isLogged
                        ? 'bg-pine-tint text-pine hover:bg-pine/20'
                        : 'text-ink-soft hover:bg-paper'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-ink-soft text-center font-mono pt-1">
              Active reflection logs highlighted in sage tint.
            </p>
          </div>

          {/* Past Entries Preview List */}
          <div className="bg-surface rounded-lg border border-line p-6 shadow-card space-y-4">
            <h3 className="font-display text-lg font-semibold text-pine-deep border-b border-line pb-3">
              Vault Logs ({journalEntries.length})
            </h3>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {journalEntries.map(entry => (
                <div
                  key={entry.id}
                  className="p-3.5 bg-paper/60 rounded-md border border-line hover:border-pine/40 transition-all space-y-1.5 group"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-semibold text-pine-deep">{entry.date}</span>
                    <span className="px-2 py-0.5 bg-pine-tint text-pine font-semibold rounded text-[10px]">
                      {entry.mood}
                    </span>
                  </div>
                  <p className="text-xs text-ink font-medium line-clamp-1 font-display italic">
                    "{entry.prompt}"
                  </p>
                  <p className="text-xs text-ink-soft line-clamp-2 leading-relaxed">
                    {entry.content}
                  </p>
                  <div className="flex items-center justify-between pt-1 text-[11px] text-ink-soft font-mono">
                    <span>{entry.wordCount} words</span>
                    <button
                      onClick={() => deleteJournalEntry(entry.id)}
                      className="text-ink-soft group-hover:text-coral transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (60% width on Desktop: lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-surface rounded-lg border border-line p-6 sm:p-8 shadow-card space-y-6">
            
            {/* Sliding Prompt Banner */}
            <div className="bg-gradient-to-r from-pine-tint to-paper p-4 rounded-md border border-pine/20 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-pine text-surface rounded-sm shrink-0">
                  <Sparkles className="w-4 h-4 text-amber" />
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-pine font-semibold block">
                    Daily Reflection Prompt
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentPromptIndex}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="font-display italic text-lg text-pine-deep mt-0.5"
                    >
                      "{activePrompt}"
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              <button
                onClick={handleNextPrompt}
                className="p-2 text-pine hover:bg-pine-tint rounded-sm transition-colors shrink-0"
                title="Refresh Prompt"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Writing Canvas Textarea */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-ink-soft">
                <span>Journal Canvas</span>
                <span className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-pine" /> {wordCount} words | {charCount} chars
                </span>
              </div>

              <textarea
                rows={10}
                value={journalContent}
                onChange={(e) => setJournalContent(e.target.value)}
                placeholder="Write your thoughts freely... What did you experience today?"
                className="w-full p-4 bg-paper/50 border border-line rounded-md text-ink text-base focus:outline-none focus:border-pine focus:ring-2 focus:ring-pine-tint transition-all resize-none leading-relaxed font-body"
              />
            </div>

            {/* Spring-Animated Emotion Badges */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-semibold text-ink-soft font-mono uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-pine" /> Toggle Emotion Pills
              </label>

              <div className="flex flex-wrap gap-2">
                {emotionTags.map(tag => {
                  const isSelected = selectedTags.includes(tag.label);
                  return (
                    <motion.button
                      key={tag.label}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleTag(tag.label)}
                      className={`px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-pine text-surface border-pine shadow-sm'
                          : 'bg-paper text-ink-soft border-line hover:border-pine/40'
                      }`}
                    >
                      #{tag.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Save Entry CTA */}
            <div className="pt-4 border-t border-line flex items-center justify-between">
              <div className="text-xs text-ink-soft font-mono">
                Auto-saved in memory
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
                disabled={!journalContent.trim()}
                className="px-6 py-3 bg-pine hover:bg-pine-deep text-surface text-sm font-semibold rounded-sm shadow-card flex items-center gap-2 transition-all disabled:opacity-50"
              >
                <span>Save to Vault</span>
                <CheckCircle2 className="w-4 h-4 text-amber" />
              </motion.button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
