import React from 'react';
import { LayoutDashboard, Activity, Heart, BookOpen, Calendar, HelpCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageView } from '../../types';

interface SidebarNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ activeTab, setActiveTab }) => {
  const { setCurrentView } = useApp();

  const sidebarLinks = [
    { id: 'overview', label: 'Score Analysis', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'analytics', label: 'Habit Analytics', icon: <Activity className="w-4 h-4" /> },
    { id: 'logs', label: 'Recent Logs', icon: <Calendar className="w-4 h-4" /> },
  ];

  const quickNav: { id: PageView; label: string; icon: React.ReactNode }[] = [
    { id: 'journal', label: 'Journal Vault', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'resources', label: 'Help & Hub', icon: <Heart className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-full md:w-64 bg-surface rounded-lg border border-line p-5 shadow-card flex flex-col justify-between shrink-0 h-fit">
      <div>
        <div className="mb-6 pb-4 border-b border-line">
          <span className="font-mono text-[11px] uppercase tracking-wider text-pine bg-pine-tint px-2.5 py-1 rounded-full font-semibold">
            Dashboard Rail
          </span>
          <h3 className="font-display text-lg font-semibold text-pine-deep mt-2">Personal Hub</h3>
        </div>

        <nav className="space-y-1.5">
          <p className="text-xs font-semibold text-ink-soft uppercase tracking-wider px-3 mb-2 font-mono">Analytics</p>
          {sidebarLinks.map(link => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-sm font-medium transition-all text-left ${
                  isActive
                    ? 'bg-pine text-surface font-semibold shadow-sm'
                    : 'text-ink-soft hover:text-ink hover:bg-paper'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-8 space-y-1.5">
          <p className="text-xs font-semibold text-ink-soft uppercase tracking-wider px-3 mb-2 font-mono">Quick Navigation</p>
          {quickNav.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-sm font-medium text-ink-soft hover:text-pine hover:bg-pine-tint/60 transition-all text-left"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-line">
        <div className="p-3 bg-paper rounded-md border border-line flex items-start gap-3">
          <HelpCircle className="w-4 h-4 text-pine shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-medium text-ink">Need guidance?</p>
            <p className="text-ink-soft text-[11px] mt-0.5">Explore our evidence-backed self-care toolkits.</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
