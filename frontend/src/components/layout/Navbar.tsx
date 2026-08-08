import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Activity, BookOpen, ShieldAlert, Home, ArrowRight, UserCheck, LogOut, KeyRound, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { PageView } from '../../types';

export const Navbar: React.FC = () => {
  const { currentView, setCurrentView } = useApp();
  const { currentUser, isAuthenticated, openAuthModal, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const navItems: { id: PageView; label: string; icon: React.ReactNode }[] = [
    { id: 'landing', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'onboarding', label: 'Predict Score', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <Activity className="w-4 h-4" /> },
    { id: 'journal', label: 'Journal Vault', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'resources', label: 'Help Hub', icon: <ShieldAlert className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-paper/85 border-b border-line/70 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <button
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-md bg-pine flex items-center justify-center text-surface shadow-sm group-hover:bg-pine-deep transition-all transform group-hover:scale-105">
            <Sparkles className="w-5 h-5 text-amber" />
          </div>
          <div>
            <span className="font-display font-medium text-2xl tracking-tight text-pine-deep block leading-tight">
              Aura<em className="italic text-pine font-normal">Mind</em>
            </span>
            <span className="font-mono text-[10px] tracking-widest text-ink-soft uppercase block">
              Mental Health & Wellness
            </span>
          </div>
        </button>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center gap-1 bg-paper-deep/60 p-1.5 rounded-md border border-line">
          {navItems.map(item => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`relative px-4 py-2 rounded-sm text-sm font-medium transition-colors flex items-center gap-2 ${
                  isActive ? 'text-pine-deep font-semibold' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-surface rounded-sm shadow-sm border border-line/60"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* User Auth Section */}
        <div className="flex items-center gap-3 relative">
          
          {isAuthenticated && currentUser ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-surface border border-line shadow-sm hover:border-pine/40 transition-all"
              >
                <img
                  src={currentUser.avatarUrl || 'https://api.dicebear.com/7.x/bottts/svg?seed=user'}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full bg-pine-tint object-cover"
                />
                <span className="text-xs font-semibold text-pine-deep font-mono max-w-[100px] truncate hidden sm:inline">
                  {currentUser.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-ink-soft" />
              </button>

              {/* User Dropdown Menu */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 bg-surface rounded-md border border-line shadow-lift p-2 z-50 space-y-1 text-xs"
                  >
                    <div className="p-2.5 border-b border-line">
                      <p className="font-semibold text-pine-deep truncate font-display text-sm">{currentUser.name}</p>
                      <p className="text-ink-soft truncate font-mono text-[11px]">{currentUser.email}</p>
                      <span className="mt-1 px-2 py-0.5 bg-sage/15 text-sage font-mono font-semibold text-[10px] rounded inline-flex items-center gap-1">
                        <UserCheck className="w-3 h-3" /> Free Verified Account
                      </span>
                    </div>

                    <button
                      onClick={() => { setCurrentView('dashboard'); setDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 text-ink-soft hover:text-pine hover:bg-paper rounded transition-colors flex items-center gap-2"
                    >
                      <Activity className="w-3.5 h-3.5" />
                      <span>My Assessments & Stats</span>
                    </button>

                    <button
                      onClick={() => { setCurrentView('journal'); setDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 text-ink-soft hover:text-pine hover:bg-paper rounded transition-colors flex items-center gap-2"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Reflection Vault</span>
                    </button>

                    <div className="pt-1 border-t border-line">
                      <button
                        onClick={() => { logout(); setDropdownOpen(false); }}
                        className="w-full text-left px-3 py-2 text-coral hover:bg-coral/10 rounded transition-colors flex items-center gap-2 font-semibold"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => openAuthModal('login')}
              className="px-4 py-2 bg-pine-tint hover:bg-pine/20 text-pine border border-pine/30 text-xs font-semibold rounded-sm shadow-sm flex items-center gap-2 transition-all"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Sign In / OTP Login</span>
            </motion.button>
          )}

          {/* Action CTA Button */}
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setCurrentView(currentView === 'landing' ? 'onboarding' : 'dashboard')}
            className="px-4 py-2.5 bg-pine hover:bg-pine-deep text-surface text-xs sm:text-sm font-semibold rounded-sm shadow-card flex items-center gap-2 transition-all"
          >
            <span>{currentView === 'landing' ? 'Get Started' : 'Stats'}</span>
            <ArrowRight className="w-4 h-4 text-amber" />
          </motion.button>

        </div>

      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden flex items-center justify-around border-t border-line bg-surface/90 py-2 px-2">
        {navItems.map(item => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex flex-col items-center gap-1 text-xs py-1 px-2 rounded-sm ${
                isActive ? 'text-pine font-bold bg-pine-tint' : 'text-ink-soft'
              }`}
            >
              {item.icon}
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
