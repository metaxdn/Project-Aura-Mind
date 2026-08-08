import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, AuthViewMode } from '../types';
import { db } from '../services/db';

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  authModalOpen: boolean;
  authViewMode: AuthViewMode;
  setAuthModalOpen: (open: boolean) => void;
  setAuthViewMode: (mode: AuthViewMode) => void;
  openAuthModal: (mode?: AuthViewMode) => void;
  closeAuthModal: () => void;
  
  // OTP State
  otpIdentifier: string;
  otpTimer: number;
  generatedOTP: string;
  sendOTP: (identifier: string) => Promise<boolean>;
  verifyOTP: (code: string) => Promise<boolean>;
  resendOTP: () => void;
  
  // Email/Password Methods
  loginWithEmail: (email: string, pass: string) => Promise<boolean>;
  signupWithEmail: (name: string, email: string, pass: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  
  authLoading: boolean;
  authError: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authViewMode, setAuthViewMode] = useState<AuthViewMode>('login');
  
  const [otpIdentifier, setOtpIdentifier] = useState<string>('');
  const [otpTimer, setOtpTimer] = useState<number>(0);
  const [generatedOTP, setGeneratedOTP] = useState<string>('849201');
  
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Restore session from DB on mount
  useEffect(() => {
    const activeId = db.getActiveUserId();
    if (activeId) {
      db.getUser(activeId).then(user => {
        if (user) {
          setCurrentUser(user);
        }
      });
    }
  }, []);

  // OTP Countdown timer tick
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpTimer]);

  const openAuthModal = (mode: AuthViewMode = 'login') => {
    setAuthViewMode(mode);
    setAuthError(null);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
    setAuthError(null);
  };

  const sendOTP = async (identifier: string): Promise<boolean> => {
    setAuthLoading(true);
    setAuthError(null);
    setOtpIdentifier(identifier);

    // Simulate OTP generation (6 digits e.g. 849201 or random)
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(code);
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, 600));

    setOtpTimer(60);
    setAuthViewMode('otp');
    setAuthLoading(false);
    return true;
  };

  const resendOTP = () => {
    if (otpIdentifier) {
      sendOTP(otpIdentifier);
    }
  };

  const verifyOTP = async (inputCode: string): Promise<boolean> => {
    setAuthLoading(true);
    setAuthError(null);

    await new Promise(r => setTimeout(r, 500));

    if (inputCode === generatedOTP || inputCode === '123456' || inputCode.length === 6) {
      const isEmail = otpIdentifier.includes('@');
      const newUser: UserProfile = {
        id: `u-${Date.now()}`,
        name: isEmail ? otpIdentifier.split('@')[0] : 'Mindful User',
        email: isEmail ? otpIdentifier : `${otpIdentifier.replace(/[^0-9]/g, '')}@auramind.org`,
        phone: !isEmail ? otpIdentifier : undefined,
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${otpIdentifier}`,
        createdAt: new Date().toISOString(),
        isVerified: true,
      };

      await db.saveUser(newUser);
      setCurrentUser(newUser);
      setAuthLoading(false);
      closeAuthModal();
      return true;
    } else {
      setAuthError('Invalid 6-digit OTP code. Please try 123456 or check your code.');
      setAuthLoading(false);
      return false;
    }
  };

  const loginWithEmail = async (email: string): Promise<boolean> => {
    setAuthLoading(true);
    setAuthError(null);
    await new Promise(r => setTimeout(r, 600));

    const user: UserProfile = {
      id: `u-${Date.now()}`,
      name: email.split('@')[0],
      email: email,
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
      createdAt: new Date().toISOString(),
      isVerified: true,
    };

    await db.saveUser(user);
    setCurrentUser(user);
    setAuthLoading(false);
    closeAuthModal();
    return true;
  };

  const signupWithEmail = async (name: string, email: string, _pass: string, phone?: string): Promise<boolean> => {
    setAuthLoading(true);
    setAuthError(null);
    await new Promise(r => setTimeout(r, 600));

    const user: UserProfile = {
      id: `u-${Date.now()}`,
      name: name,
      email: email,
      phone: phone,
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
      createdAt: new Date().toISOString(),
      isVerified: true,
    };

    await db.saveUser(user);
    setCurrentUser(user);
    setAuthLoading(false);
    closeAuthModal();
    return true;
  };

  const logout = () => {
    db.clearActiveUser();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated: !!currentUser,
      authModalOpen,
      authViewMode,
      setAuthModalOpen,
      setAuthViewMode,
      openAuthModal,
      closeAuthModal,
      otpIdentifier,
      otpTimer,
      generatedOTP,
      sendOTP,
      verifyOTP,
      resendOTP,
      loginWithEmail,
      signupWithEmail,
      logout,
      authLoading,
      authError,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
