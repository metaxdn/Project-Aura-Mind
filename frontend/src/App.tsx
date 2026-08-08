import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/layout/Toast';
import { AuthModal } from './components/auth/AuthModal';
import { LandingPage } from './components/pages/LandingPage';
import { OnboardingPage } from './components/pages/OnboardingPage';
import { DashboardPage } from './components/pages/DashboardPage';
import { JournalPage } from './components/pages/JournalPage';
import { ResourcesPage } from './components/pages/ResourcesPage';

const PageContent: React.FC = () => {
  const { currentView } = useApp();

  const pageVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  };

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'onboarding':
        return <OnboardingPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'journal':
        return <JournalPage />;
      case 'resources':
        return <ResourcesPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between noise-bg relative">
      <Navbar />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <Toast />
      <AuthModal />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <PageContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
