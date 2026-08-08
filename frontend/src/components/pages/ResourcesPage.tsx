import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, PhoneCall, Heart, Award, Star, Clock, CheckCircle2, Play, X, UserCheck, Sparkles, Volume2, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProfessionalProfile, ResourceItem } from '../../types';

export const ResourcesPage: React.FC = () => {
  const { showToast } = useApp();

  const [activeResourceModal, setActiveResourceModal] = useState<ResourceItem | null>(null);
  const [bookingTherapist, setBookingTherapist] = useState<ProfessionalProfile | null>(null);
  const [breathCount, setBreathCount] = useState<number>(4);
  const [isBreathing, setIsBreathing] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [bookingDate, setBookingDate] = useState<string>('2026-08-10');
  const [bookingTime, setBookingTime] = useState<string>('10:00 AM');

  // Indian Emergency & Mental Health Helplines
  const crisisNumbers = [
    { label: 'Tele-MANAS (Govt of India)', phone: '14416 / 1800-891-4416', desc: 'Free 24/7 National Mental Health Helpline' },
    { label: 'Vandrevala Foundation', phone: '+91 9999 666 555', desc: '24/7 Crisis Intervention Helpline India' },
    { label: 'KIRAN Helpline (Govt. of India)', phone: '1800-599-0019', desc: '24/7 Mental Health Rehabilitation' },
    { label: 'AASRA Crisis Line', phone: '+91 98204 66726', desc: 'Suicide Prevention & Emotional Support India' }
  ];

  // Resource Toolkits (3-column grid)
  const resources: ResourceItem[] = [
    {
      id: 'r-1',
      title: '5-Minute Box Breathing Protocol',
      category: 'Meditation',
      duration: '5 Mins',
      iconName: 'Wind',
      badge: 'Interactive',
      description: 'Tactical breathing technique used by elite performers to calm the nervous system in 4 quick cycles.',
      contentDetails: 'Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold empty for 4 seconds. Repeat 4 times.'
    },
    {
      id: 'r-2',
      title: 'Digital Screen Detox Checklist',
      category: 'Toolkit',
      duration: '10 Mins',
      iconName: 'Smartphone',
      badge: 'PDF Guide',
      description: 'Step-by-step audit to reduce daily unlocks, disable dopamine triggers, and set bedtime boundaries.',
      contentDetails: 'Turn display to grayscale after 8 PM, keep phone outside sleeping room, remove social icons from home screen.'
    },
    {
      id: 'r-3',
      title: 'Progressive Muscle Relaxation',
      category: 'Exercise',
      duration: '12 Mins',
      iconName: 'Activity',
      badge: 'Audio Guide',
      description: 'Systematically tense and release muscle groups from toes to crown to discharge physical stress.',
      contentDetails: 'Tense feet for 5 seconds, release completely. Tense calves for 5 seconds, release. Work up through shoulders and neck.'
    }
  ];

  // Professional Directory (Kolkata & India Specialists)
  const professionals: ProfessionalProfile[] = [
    {
      id: 'p-1',
      name: 'Dr. Anirban Dutta, MD',
      role: 'Senior Consultant Psychiatrist & Behavioral Specialist',
      experience: '14+ Years Experience • Kolkata',
      rating: 4.9,
      reviewsCount: 184,
      specialties: ['Anxiety & Panic', 'Digital Burnout', 'Academic Stress'],
      avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
      availability: 'Available Tomorrow at 11:00 AM (Salt Lake & Park Street / Online)',
      bio: 'Leading Kolkata-based psychiatrist specializing in student mental wellness, academic stress, cognitive resilience, and digital burnout.'
    },
    {
      id: 'p-2',
      name: 'Dr. Rima Mukherjee, DPM, MD',
      role: 'Consultant Clinical Psychologist & Psychotherapist',
      experience: '16+ Years Experience • Kolkata',
      rating: 4.9,
      reviewsCount: 230,
      specialties: ['Youth Counseling', 'Mindfulness Therapy', 'Sleep Disorders'],
      avatarUrl: 'https://images.unsplash.com/photo-1594824813571-24a69c100d37?w=150&auto=format&fit=crop&q=80',
      availability: 'Available Thursday at 03:00 PM (Alipore & Newtown / Tele-health)',
      bio: 'Renowned clinical psychologist in Kolkata focusing on Cognitive Behavioral Therapy (CBT), emotional self-regulation, and adolescent well-being.'
    },
    {
      id: 'p-3',
      name: 'Dr. Sourav Das, MD',
      role: 'Neuropsychiatrist & Mind Resilience Coach',
      experience: '11+ Years Experience • Kolkata',
      rating: 4.8,
      reviewsCount: 142,
      specialties: ['Performance Anxiety', 'Holistic Care', 'Academic Focus'],
      avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
      availability: 'Available Friday at 04:30 PM (Bellevue Clinic / OPD)',
      bio: 'Consultant neuropsychiatrist in Kolkata committed to evidence-based mental health care, circadian rhythm restoration, and stress relief.'
    }
  ];

  const handleBookConsultation = () => {
    setBookingSuccess(true);
    showToast(`Consultation requested with ${bookingTherapist?.name}!`, 'success');
    setTimeout(() => {
      setBookingTherapist(null);
      setBookingSuccess(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-pine bg-pine-tint px-3 py-1 rounded-full font-semibold inline-flex items-center gap-1.5 mb-2">
          <Heart className="w-3.5 h-3.5 text-coral" /> Support Hub & Expert Care
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-medium text-pine-deep">
          Resource Library & Professional Directory
        </h1>
        <p className="text-ink-soft text-sm mt-1">
          Immediate crisis assistance, evidence-backed self-care toolkits, and verified mental health experts.
        </p>
      </div>

      {/* Emergency Pulsing Banner Alert Container */}
      <motion.div
        animate={{ opacity: [0.88, 1, 0.88] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="bg-coral/10 border-2 border-coral/30 rounded-lg p-6 shadow-card relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex items-start gap-4">
            <div className="p-3 bg-coral text-surface rounded-full shrink-0 shadow-sm">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-coral font-bold bg-coral/20 px-2 py-0.5 rounded">
                  24/7 Immediate Support
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-coral"></span>
                </span>
              </div>
              <h2 className="font-display text-xl font-bold text-pine-deep mt-1">
                In Distress or Need Immediate Help?
              </h2>
              <p className="text-ink-soft text-xs max-w-xl mt-0.5">
                You are not alone. Reach out to verified crisis professionals anytime. Services are free, confidential, and available 24/7.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {crisisNumbers.map(c => (
              <a
                key={c.phone}
                href={`tel:${c.phone}`}
                className="flex items-center gap-2 px-4 py-2.5 bg-surface hover:bg-coral hover:text-surface text-coral font-mono text-xs font-bold rounded-sm border border-coral/40 shadow-sm transition-all shrink-0"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{c.label}: <strong>{c.phone}</strong></span>
              </a>
            ))}
          </div>

        </div>
      </motion.div>

      {/* 3-Column Resource Grid */}
      <section className="space-y-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-pine font-semibold">Self-Care Toolkits</span>
          <h2 className="font-display text-2xl font-semibold text-pine-deep">Evidence-Based Exercises</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map(item => (
            <motion.div
              key={item.id}
              whileHover={{ y: -6 }}
              className="bg-surface p-6 rounded-lg border border-line shadow-card hover:shadow-lift transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-pine-tint text-pine text-xs font-mono font-semibold rounded-full border border-pine/20">
                    {item.category}
                  </span>
                  <span className="text-xs font-mono text-ink-soft flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {item.duration}
                  </span>
                </div>

                <h3 className="font-display text-xl font-semibold text-pine-deep">{item.title}</h3>
                <p className="text-xs text-ink-soft leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-6 mt-4 border-t border-line flex items-center justify-between">
                <span className="text-[11px] font-mono text-sage font-semibold">{item.badge}</span>
                <button
                  onClick={() => setActiveResourceModal(item)}
                  className="px-4 py-2 bg-pine hover:bg-pine-deep text-surface text-xs font-semibold rounded-sm shadow-sm flex items-center gap-1.5 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 text-amber fill-amber" /> Launch Exercise
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Expert Directory: Vertical Stack */}
      <section className="space-y-6 pt-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-pine font-semibold">Verified Professionals</span>
          <h2 className="font-display text-2xl font-semibold text-pine-deep">Consultant Directory</h2>
        </div>

        <div className="space-y-4">
          {professionals.map(prof => (
            <motion.div
              key={prof.id}
              whileHover={{ scale: 1.01 }}
              className="bg-surface p-6 rounded-lg border border-line shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all"
            >
              <div className="flex items-start gap-4">
                <img
                  src={prof.avatarUrl}
                  alt={prof.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-pine/20 shrink-0"
                />

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-xl font-semibold text-pine-deep">{prof.name}</h3>
                    <span className="flex items-center gap-1 text-xs font-mono font-bold text-amber-800 bg-amber/15 px-2 py-0.5 rounded">
                      <Star className="w-3.5 h-3.5 fill-amber text-amber" /> {prof.rating} ({prof.reviewsCount})
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-pine font-mono">{prof.role} • {prof.experience}</p>
                  <p className="text-xs text-ink-soft max-w-xl pt-1 leading-relaxed">{prof.bio}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {prof.specialties.map(spec => (
                      <span key={spec} className="px-2 py-0.5 bg-paper text-ink-soft border border-line rounded text-[10px] font-mono">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-line">
                <span className="text-[11px] font-mono text-sage font-semibold flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" /> {prof.availability}
                </span>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setBookingTherapist(prof)}
                  className="w-full md:w-auto px-5 py-2.5 bg-pine hover:bg-pine-deep text-surface text-xs font-semibold rounded-sm shadow-card flex items-center justify-center gap-2 transition-all"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber" /> Book Consultation
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Resource Modal Box Breathing */}
      <AnimatePresence>
        {activeResourceModal && (
          <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface max-w-lg w-full rounded-lg border border-line p-6 shadow-lift relative space-y-6"
            >
              <button
                onClick={() => { setActiveResourceModal(null); setIsBreathing(false); }}
                className="absolute top-4 right-4 text-ink-soft hover:text-ink p-1 rounded-full hover:bg-paper"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="font-mono text-xs uppercase text-pine font-semibold">{activeResourceModal.category}</span>
                <h3 className="font-display text-2xl font-semibold text-pine-deep">{activeResourceModal.title}</h3>
              </div>

              {/* Interactive Breathing Circle Widget */}
              <div className="text-center py-8 bg-paper rounded-md border border-line space-y-4">
                <motion.div
                  animate={isBreathing ? { scale: [1, 1.35, 1.35, 1] } : { scale: 1 }}
                  transition={isBreathing ? { duration: 16, repeat: Infinity, ease: 'easeInOut' } : {}}
                  className="w-32 h-32 mx-auto rounded-full bg-gradient-to-tr from-pine to-sage flex items-center justify-center text-surface shadow-glow"
                >
                  <span className="font-display text-lg font-semibold">
                    {isBreathing ? 'Breathe' : 'Ready'}
                  </span>
                </motion.div>

                <p className="text-xs text-ink-soft max-w-xs mx-auto">
                  {activeResourceModal.contentDetails}
                </p>

                <button
                  onClick={() => setIsBreathing(!isBreathing)}
                  className="px-6 py-2.5 bg-pine text-surface text-xs font-semibold rounded-sm shadow-sm"
                >
                  {isBreathing ? 'Pause Session' : 'Start 5-Min Timer'}
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => { setActiveResourceModal(null); setIsBreathing(false); }}
                  className="px-4 py-2 bg-paper text-ink-soft text-xs font-semibold rounded-sm border border-line"
                >
                  Close Exercise
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Therapist Booking Modal */}
      <AnimatePresence>
        {bookingTherapist && (
          <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface max-w-md w-full rounded-lg border border-line p-6 shadow-lift relative space-y-6"
            >
              <button
                onClick={() => setBookingTherapist(null)}
                className="absolute top-4 right-4 text-ink-soft hover:text-ink p-1 rounded-full hover:bg-paper"
              >
                <X className="w-5 h-5" />
              </button>

              {bookingSuccess ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-sage/20 text-sage mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-pine-deep">Appointment Confirmed!</h3>
                  <p className="text-xs text-ink-soft max-w-xs mx-auto">
                    Your confidential session with {bookingTherapist.name} is scheduled for {bookingDate} at {bookingTime}.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-1 border-b border-line pb-3">
                    <span className="font-mono text-xs uppercase text-pine font-semibold">Book Consultation</span>
                    <h3 className="font-display text-xl font-semibold text-pine-deep">{bookingTherapist.name}</h3>
                    <p className="text-xs text-ink-soft">{bookingTherapist.role}</p>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block font-mono uppercase text-ink-soft font-semibold mb-1">Select Date</label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full p-2.5 bg-paper border border-line rounded-sm text-ink"
                      />
                    </div>

                    <div>
                      <label className="block font-mono uppercase text-ink-soft font-semibold mb-1">Select Time Slot</label>
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full p-2.5 bg-paper border border-line rounded-sm text-ink"
                      >
                        <option value="10:00 AM">10:00 AM EST</option>
                        <option value="01:30 PM">01:30 PM EST</option>
                        <option value="04:00 PM">04:00 PM EST</option>
                      </select>
                    </div>

                    <div className="p-3 bg-pine-tint/60 rounded border border-pine/20 text-[11px] text-pine font-mono">
                      Confidential Tele-health Link will be sent to your email.
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => setBookingTherapist(null)}
                      className="px-4 py-2 bg-paper text-ink-soft text-xs font-semibold rounded-sm border border-line"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleBookConsultation}
                      className="px-5 py-2 bg-pine text-surface text-xs font-semibold rounded-sm shadow-sm"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
