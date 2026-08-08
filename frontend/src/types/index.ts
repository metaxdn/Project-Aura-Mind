export type PageView = 'landing' | 'onboarding' | 'dashboard' | 'journal' | 'resources';

export type StressLevel = 'Low' | 'Medium' | 'High' | 'Very High';
export type Gender = 'Male' | 'Female';
export type AcademicLevel = 'Undergraduate' | 'Graduate' | 'High School';
export type SocialPlatform = 
  | 'Facebook' | 'LinkedIn' | 'Instagram' | 'Snapchat' | 'Twitter' 
  | 'YouTube' | 'TikTok' | 'LINE' | 'KakaoTalk' | 'VKontakte' | 'WhatsApp' | 'WeChat';
export type PurposeOfUse = 'Networking' | 'Education' | 'Entertainment' | 'News';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  createdAt: string;
  isVerified: boolean;
  city?: string;
}

export type AuthViewMode = 'login' | 'signup' | 'otp';

export interface StudentData {
  age: number;
  gender: Gender;
  country: string;
  academic_level: AcademicLevel;
  most_used_platform: SocialPlatform;
  purpose_of_use: PurposeOfUse;
  avg_daily_usage_hours: number;
  daily_unlocks: number;
  study_hours: number;
  physical_activity_hours: number;
  sleep_hours_per_night: number;
  stress_level: StressLevel;
}

export interface PredictionResponse {
  predicted_mental_health_score: number;
}

export interface MoodOption {
  id: string;
  emoji: string;
  label: string;
  color: string;
  activeColor: string;
}

export interface JournalEntry {
  id: string;
  userId?: string;
  date: string;
  time: string;
  prompt: string;
  content: string;
  mood: string;
  tags: string[];
  wordCount: number;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'Toolkit' | 'Meditation' | 'Exercise' | 'Guide';
  duration: string;
  description: string;
  iconName: string;
  badge: string;
  contentDetails: string;
}

export interface ProfessionalProfile {
  id: string;
  name: string;
  role: string;
  experience: string;
  rating: number;
  reviewsCount: number;
  specialties: string[];
  avatarUrl: string;
  availability: string;
  bio: string;
}
