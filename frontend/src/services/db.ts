import { UserProfile, JournalEntry, StudentData } from '../types';

const DB_NAME = 'AuraMindDatabase';
const DB_VERSION = 1;

export interface SavedScoreRecord {
  id: string;
  userId: string;
  score: number;
  date: string;
  formData: StudentData;
}

class DatabaseService {
  private dbPromise: Promise<IDBDatabase> | null = null;

  constructor() {
    this.initDB();
  }

  private initDB(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        console.warn('IndexedDB not supported, using LocalStorage fallback.');
        resolve({} as IDBDatabase);
        return;
      }

      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains('users')) {
          db.createObjectStore('users', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('scores')) {
          db.createObjectStore('scores', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('journals')) {
          db.createObjectStore('journals', { keyPath: 'id' });
        }
      };

      request.onsuccess = (event: Event) => {
        resolve((event.target as IDBOpenDBRequest).result);
      };

      request.onerror = (event: Event) => {
        console.error('IndexedDB open error:', (event.target as IDBOpenDBRequest).error);
        reject((event.target as IDBOpenDBRequest).error);
      };
    });

    return this.dbPromise;
  }

  // --- USER METHODS ---
  async saveUser(user: UserProfile): Promise<void> {
    try {
      const db = await this.initDB();
      if (db.objectStoreNames) {
        const tx = db.transaction('users', 'readwrite');
        tx.objectStore('users').put(user);
      }
    } catch (e) {
      console.warn('Fallback saving user to LocalStorage:', e);
    }
    localStorage.setItem(`auramind_user_${user.id}`, JSON.stringify(user));
    localStorage.setItem('auramind_active_user_id', user.id);
  }

  async getUser(userId: string): Promise<UserProfile | null> {
    try {
      const saved = localStorage.getItem(`auramind_user_${userId}`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  getActiveUserId(): string | null {
    return localStorage.getItem('auramind_active_user_id');
  }

  clearActiveUser(): void {
    localStorage.removeItem('auramind_active_user_id');
  }

  // --- SCORES METHODS ---
  async saveScoreRecord(record: SavedScoreRecord): Promise<void> {
    try {
      const db = await this.initDB();
      if (db.objectStoreNames) {
        const tx = db.transaction('scores', 'readwrite');
        tx.objectStore('scores').put(record);
      }
    } catch (e) {
      console.warn('LocalStorage score fallback:', e);
    }
    const key = `auramind_scores_${record.userId}`;
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    localStorage.setItem(key, JSON.stringify([record, ...existing]));
  }

  async getUserScores(userId: string): Promise<SavedScoreRecord[]> {
    const key = `auramind_scores_${userId}`;
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  }

  // --- JOURNALS METHODS ---
  async saveJournalEntry(entry: JournalEntry): Promise<void> {
    const userId = entry.userId || 'guest';
    const key = `auramind_journals_${userId}`;
    const raw = localStorage.getItem(key);
    const existing: JournalEntry[] = raw ? JSON.parse(raw) : [];
    localStorage.setItem(key, JSON.stringify([entry, ...existing]));
  }

  async getUserJournals(userId: string): Promise<JournalEntry[]> {
    const key = `auramind_journals_${userId}`;
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  }
}

export const db = new DatabaseService();
