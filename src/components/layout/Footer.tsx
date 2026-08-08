import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <footer className="border-t border-line/80 bg-paper py-12 mt-16 text-ink-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-pine flex items-center justify-center text-surface">
              <Sparkles className="w-4 h-4 text-amber" />
            </div>
            <div>
              <span className="font-display font-medium text-lg text-pine-deep block leading-tight">
                Aura<em className="italic text-pine font-normal">Mind</em>
              </span>
              <p className="text-xs text-ink-soft">Mental Health & Wellness Score Predictor</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <button onClick={() => setCurrentView('landing')} className="hover:text-pine transition-colors">Home</button>
            <button onClick={() => setCurrentView('onboarding')} className="hover:text-pine transition-colors">Predict Score</button>
            <button onClick={() => setCurrentView('dashboard')} className="hover:text-pine transition-colors">Dashboard</button>
            <button onClick={() => setCurrentView('journal')} className="hover:text-pine transition-colors">Journal Vault</button>
            <button onClick={() => setCurrentView('resources')} className="hover:text-pine transition-colors font-medium text-pine">Help Hub</button>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-line/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-soft">
          <p>© 2026 AuraMind. Crafted with care for mental well-being & mindful living.</p>
          <p className="flex items-center gap-1 text-[11px]">
            <span>Designed for calmness</span>
            <Heart className="w-3 h-3 text-coral fill-coral/20 inline" />
            <span>& high performance</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
