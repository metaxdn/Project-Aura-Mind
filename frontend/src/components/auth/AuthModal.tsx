import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Phone, Mail, Lock, User, KeyRound, ArrowRight, Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    closeAuthModal,
    authViewMode,
    setAuthViewMode,
    sendOTP,
    verifyOTP,
    resendOTP,
    otpIdentifier,
    otpTimer,
    generatedOTP,
    loginWithEmail,
    signupWithEmail,
    authLoading,
    authError,
  } = useAuth();

  // Inputs
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [otpInput, setOtpInput] = useState<string[]>(['', '', '', '', '', '']);

  // Refs for 6-digit OTP boxes
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  if (!authModalOpen) return null;

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otpInput];
    newOtp[index] = value;
    setOtpInput(newOtp);

    // Auto-focus next input box
    if (value && index < 5) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpInput[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = otpInput.join('');
    verifyOTP(fullCode);
  };

  const handleSendOtpClick = (e: React.FormEvent) => {
    e.preventDefault();
    const identifier = email || phone || 'user@auramind.org';
    sendOTP(identifier);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginWithEmail(email || 'demo@auramind.org', password || 'password');
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signupWithEmail(name || 'Mindful User', email || 'user@auramind.org', password, phone);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-ink/65 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="bg-surface max-w-md w-full rounded-lg border border-line p-6 sm:p-8 shadow-lift relative my-8"
        >
          {/* Close button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 text-ink-soft hover:text-ink p-1.5 rounded-full hover:bg-paper transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Brand Banner */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-md bg-pine text-surface mx-auto flex items-center justify-center mb-3 shadow-card">
              <Sparkles className="w-6 h-6 text-amber" />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-pine bg-pine-tint px-3 py-1 rounded-full font-semibold inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sage" /> 100% Free & Private Access
            </span>
            <h2 className="font-display text-2xl font-semibold text-pine-deep mt-2">
              {authViewMode === 'login' && 'Welcome Back to AuraMind'}
              {authViewMode === 'signup' && 'Create Free Account'}
              {authViewMode === 'otp' && 'Enter 6-Digit Verification Code'}
            </h2>
          </div>

          {/* Error Message */}
          {authError && (
            <div className="mb-4 p-3 bg-coral/15 border border-coral/30 rounded-sm text-xs font-semibold text-coral text-center">
              {authError}
            </div>
          )}

          {/* VIEW MODE: OTP Verification */}
          {authViewMode === 'otp' && (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="text-center space-y-1">
                <p className="text-xs text-ink-soft">
                  We sent a 6-digit verification code to <strong className="text-pine-deep font-mono">{otpIdentifier}</strong>
                </p>
                <p className="text-[11px] font-mono text-sage bg-pine-tint py-1 px-2 rounded inline-block">
                  Demo Code: <strong>{generatedOTP}</strong> (or enter 123456)
                </p>
              </div>

              {/* 6 Individual Auto-focus Input Boxes */}
              <div className="flex justify-center gap-2">
                {otpInput.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={otpRefs[idx]}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-11 h-13 text-center font-mono font-bold text-xl bg-paper border border-line rounded-md text-pine-deep focus:outline-none focus:border-pine focus:ring-2 focus:ring-pine-tint transition-all"
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={authLoading}
                className="w-full py-3 bg-pine hover:bg-pine-deep text-surface text-sm font-semibold rounded-sm shadow-card flex items-center justify-center gap-2 transition-all disabled:opacity-75"
              >
                {authLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <span>Verify & Continue</span>
                    <CheckCircle2 className="w-4 h-4 text-amber" />
                  </>
                )}
              </motion.button>

              <div className="flex items-center justify-between text-xs font-mono text-ink-soft pt-2">
                <span>
                  {otpTimer > 0 ? `Resend code in ${otpTimer}s` : 'Code expired'}
                </span>
                <button
                  type="button"
                  onClick={resendOTP}
                  disabled={otpTimer > 0 || authLoading}
                  className="text-pine hover:underline font-semibold disabled:opacity-50"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}

          {/* VIEW MODE: Login */}
          {authViewMode === 'login' && (
            <div className="space-y-5">
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold font-mono uppercase text-ink-soft mb-1">
                    Email Address or Phone
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-ink-soft absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com or +91 9876543210"
                      className="w-full pl-10 pr-4 py-2.5 bg-paper border border-line rounded-sm text-sm text-ink focus:outline-none focus:border-pine focus:ring-2 focus:ring-pine-tint transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold font-mono uppercase text-ink-soft mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-ink-soft absolute left-3 top-3.5" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 bg-paper border border-line rounded-sm text-sm text-ink focus:outline-none focus:border-pine focus:ring-2 focus:ring-pine-tint transition-all"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3 bg-pine hover:bg-pine-deep text-surface text-sm font-semibold rounded-sm shadow-card flex items-center justify-center gap-2 transition-all disabled:opacity-75"
                >
                  {authLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-amber" />
                  ) : (
                    <>
                      <span>Sign In with Password</span>
                      <ArrowRight className="w-4 h-4 text-amber" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-line"></div>
                <span className="flex-shrink mx-3 font-mono text-[11px] uppercase text-ink-soft">OR</span>
                <div className="flex-grow border-t border-line"></div>
              </div>

              {/* OTP Quick Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSendOtpClick}
                disabled={authLoading}
                className="w-full py-2.5 bg-pine-tint hover:bg-pine/20 text-pine text-xs font-semibold rounded-sm border border-pine/30 flex items-center justify-center gap-2 transition-all"
              >
                <KeyRound className="w-4 h-4" />
                <span>Login using 6-Digit OTP</span>
              </motion.button>

              {/* Footer Switch */}
              <p className="text-center text-xs text-ink-soft pt-2">
                Don't have an account?{' '}
                <button
                  onClick={() => setAuthViewMode('signup')}
                  className="text-pine font-semibold hover:underline"
                >
                  Create Free Account
                </button>
              </p>
            </div>
          )}

          {/* VIEW MODE: Signup */}
          {authViewMode === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold font-mono uppercase text-ink-soft mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-ink-soft absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Aditya Sharma"
                    className="w-full pl-10 pr-4 py-2.5 bg-paper border border-line rounded-sm text-sm text-ink focus:outline-none focus:border-pine focus:ring-2 focus:ring-pine-tint transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold font-mono uppercase text-ink-soft mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-ink-soft absolute left-3 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aditya@domain.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-paper border border-line rounded-sm text-sm text-ink focus:outline-none focus:border-pine focus:ring-2 focus:ring-pine-tint transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold font-mono uppercase text-ink-soft mb-1">
                  Phone Number (Optional for OTP)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-ink-soft absolute left-3 top-3.5" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 bg-paper border border-line rounded-sm text-sm text-ink focus:outline-none focus:border-pine focus:ring-2 focus:ring-pine-tint transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold font-mono uppercase text-ink-soft mb-1">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-ink-soft absolute left-3 top-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-paper border border-line rounded-sm text-sm text-ink focus:outline-none focus:border-pine focus:ring-2 focus:ring-pine-tint transition-all"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={authLoading}
                className="w-full py-3 bg-pine hover:bg-pine-deep text-surface text-sm font-semibold rounded-sm shadow-card flex items-center justify-center gap-2 transition-all disabled:opacity-75"
              >
                {authLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-amber" />
                ) : (
                  <>
                    <span>Register Free Account</span>
                    <ArrowRight className="w-4 h-4 text-amber" />
                  </>
                )}
              </motion.button>

              <p className="text-center text-xs text-ink-soft pt-2">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setAuthViewMode('login')}
                  className="text-pine font-semibold hover:underline"
                >
                  Sign In
                </button>
              </p>
            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
