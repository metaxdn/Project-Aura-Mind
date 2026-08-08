import React, { createContext, useContext, useState, useEffect } from 'react';
import { PageView, StudentData, JournalEntry } from '../types';
import { predictMentalHealthScore } from '../services/api';
import { db } from '../services/db';
import { useAuth } from './AuthContext';

interface ToastState {
  message: string;
  type?: 'success' | 'info' | 'alert';
}

interface AppContextType {
  currentView: PageView;
  setCurrentView: (view: PageView) => void;
  onboardingStep: number;
  setOnboardingStep: React.Dispatch<React.SetStateAction<number>>;
  formData: StudentData;
  updateFormField: <K extends keyof StudentData>(field: K, value: StudentData[K]) => void;
  resetFormData: () => void;
  
  // Score Analysis State
  predictedScore: number | null;
  scoreLoading: boolean;
  scoreError: string | null;
  calculateScore: () => Promise<void>;
  
  // Mood Tracker State
  selectedMood: string;
  setSelectedMood: (mood: string) => void;
  
  // Journaling State
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'date' | 'time' | 'wordCount'>) => void;
  deleteJournalEntry: (id: string) => void;
  
  // Toast Notification
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'info' | 'alert') => void;
  hideToast: () => void;
}

const defaultStudentData: StudentData = {
  age: 21,
  gender: 'Female',
  country: 'USA',
  academic_level: 'Undergraduate',
  most_used_platform: 'Instagram',
  purpose_of_use: 'Entertainment',
  avg_daily_usage_hours: 4.5,
  daily_unlocks: 55,
  study_hours: 5.0,
  physical_activity_hours: 1.5,
  sleep_hours_per_night: 7.5,
  stress_level: 'Medium',
};

const initialJournalEntries: JournalEntry[] = [
  {
    id: 'j-1',
    date: 'Aug 8, 2026',
    time: '09:30 AM',
    prompt: 'What made you feel grounded today?',
    content: 'Took a morning walk in the park without my phone. The fresh air and quiet rhythm of breathing really cleared the cognitive brain fog before classes.',
    mood: 'Calm',
    tags: ['Mindfulness', 'Nature', 'Morning Routine'],
    wordCount: 29
  },
  {
    id: 'j-2',
    date: 'Aug 7, 2026',
    time: '08:15 PM',
    prompt: 'How did your screen time affect your energy level?',
    content: 'Spent 5 hours scrolling social feeds after studying. Noticed a spike in anxiety around 6 PM. Decided to turn off notifications after 9 PM tonight.',
    mood: 'Anxious',
    tags: ['Digital Detox', 'Reflections'],
    wordCount: 30
  },
  {
    id: 'j-3',
    date: 'Aug 5, 2026',
    time: '07:45 PM',
    prompt: 'Name three small wins from your afternoon.',
    content: '1. Completed my group project slide deck ahead of schedule.\n2. Drank 2L of water throughout study sessions.\n3. Practiced 10 mins of deep box breathing.',
    mood: 'Grateful',
    tags: ['Gratitude', 'Productivity'],
    wordCount: 29
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();

  const [currentView, setCurrentView] = useState<PageView>('landing');
  const [onboardingStep, setOnboardingStep] = useState<number>(1);
  const [formData, setFormData] = useState<StudentData>(defaultStudentData);
  const [predictedScore, setPredictedScore] = useState<number | null>(7.8);
  const [scoreLoading, setScoreLoading] = useState<boolean>(false);
  const [scoreError, setScoreError] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string>('Calm');
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(initialJournalEntries);
  const [toast, setToast] = useState<ToastState | null>(null);

  // Sync user-specific journals from database when user logs in
  useEffect(() => {
    if (currentUser) {
      db.getUserJournals(currentUser.id).then(userJournals => {
        if (userJournals && userJournals.length > 0) {
          setJournalEntries(userJournals);
        }
      });
      db.getUserScores(currentUser.id).then(scores => {
        if (scores && scores.length > 0) {
          setPredictedScore(scores[0].score);
        }
      });
    }
  }, [currentUser]);

  const updateFormField = <K extends keyof StudentData>(field: K, value: StudentData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetFormData = () => {
    setFormData(defaultStudentData);
    setOnboardingStep(1);
    setPredictedScore(null);
    setScoreError(null);
  };

  const showToast = (message: string, type: 'success' | 'info' | 'alert' = 'success') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  const calculateScore = async () => {
    setScoreLoading(true);
    setScoreError(null);
    try {
      const response = await predictMentalHealthScore(formData);
      const score = response.predicted_mental_health_score;
      setPredictedScore(score);

      // Save to database
      const userId = currentUser ? currentUser.id : 'guest';
      await db.saveScoreRecord({
        id: `s-${Date.now()}`,
        userId,
        score,
        date: new Date().toISOString(),
        formData
      });

      showToast('Mental Health Score computed & saved to database!', 'success');
      setCurrentView('dashboard');
    } catch (err) {
      console.error('Prediction calculation failed:', err);
      setScoreError('Could not process score prediction. Please check inputs.');
      showToast('Error calculating score. Please try again.', 'alert');
    } finally {
      setScoreLoading(false);
    }
  };

  const addJournalEntry = async (entryData: Omit<JournalEntry, 'id' | 'date' | 'time' | 'wordCount'>) => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const words = entryData.content.trim().split(/\s+/).filter(w => w.length > 0).length;
    const userId = currentUser ? currentUser.id : 'guest';

    const newEntry: JournalEntry = {
      id: `j-${Date.now()}`,
      userId,
      date: dateStr,
      time: timeStr,
      wordCount: words,
      ...entryData,
    };

    setJournalEntries(prev => [newEntry, ...prev]);

    // Save to Database
    await db.saveJournalEntry(newEntry);

    showToast('Reflection logged & saved in your Vault database!', 'success');
  };

  const deleteJournalEntry = (id: string) => {
    setJournalEntries(prev => prev.filter(e => e.id !== id));
    showToast('Entry removed.', 'info');
  };

  return (
    <AppContext.Provider value={{
      currentView,
      setCurrentView,
      onboardingStep,
      setOnboardingStep,
      formData,
      updateFormField,
      resetFormData,
      predictedScore,
      scoreLoading,
      scoreError,
      calculateScore,
      selectedMood,
      setSelectedMood,
      journalEntries,
      addJournalEntry,
      deleteJournalEntry,
      toast,
      showToast,
      hideToast,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
