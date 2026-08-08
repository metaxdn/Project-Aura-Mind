import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useApp();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  if (!toast) return null;

  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-sage shrink-0" />,
    alert: <AlertCircle className="w-5 h-5 text-coral shrink-0" />,
    info: <Info className="w-5 h-5 text-pine shrink-0" />,
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-surface border border-line px-4 py-3.5 rounded-md shadow-lift max-w-md"
      >
        {iconMap[toast.type || 'success']}
        <p className="text-sm font-medium text-ink pr-2">{toast.message}</p>
        <button
          onClick={hideToast}
          className="text-ink-soft hover:text-ink p-1 rounded-full hover:bg-paper transition-colors"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
