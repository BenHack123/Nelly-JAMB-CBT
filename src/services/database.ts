import { User, ExamAttempt } from '../types';

// localStorage-based database that mimics Firebase Firestore
// Fully functional without any external setup required

const USERS_KEY = 'jamb_cbt_users';
const ATTEMPTS_KEY = 'jamb_cbt_attempts';
const CURRENT_USER_KEY = 'jamb_cbt_current_user';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
}

// Simple hash function for password storage
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'jamb_cbt_salt_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function getUsers(): (User & { passwordHash: string })[] {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: (User & { passwordHash: string })[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getAttempts(): ExamAttempt[] {
  try {
    const data = localStorage.getItem(ATTEMPTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveAttempts(attempts: ExamAttempt[]) {
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
}

// Initialize admin account if not exists
async function initAdmin() {
  const users = getUsers();
  const adminExists = users.some(u => u.email === 'admin@jambcbt.com');
  if (!adminExists) {
    const hash = await hashPassword('admin123');
    users.push({
      id: 'admin-001',
      email: 'admin@jambcbt.com',
      displayName: 'Administrator',
      dateRegistered: new Date().toISOString(),
      isAdmin: true,
      passwordHash: hash,
    });
    saveUsers(users);
  }
}

initAdmin();

// Auth functions
export async function signUp(email: string, password: string, displayName?: string): Promise<User> {
  const users = getUsers();
  
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('An account with this email already exists.');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Please enter a valid email address.');
  }

  const hash = await hashPassword(password);
  const user: User & { passwordHash: string } = {
    id: generateId(),
    email: email.toLowerCase().trim(),
    displayName: displayName || email.split('@')[0],
    dateRegistered: new Date().toISOString(),
    isAdmin: false,
    passwordHash: hash,
  };

  users.push(user);
  saveUsers(users);

  const { passwordHash: _, ...userData } = user;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
  return userData;
}

export async function login(email: string, password: string): Promise<User> {
  const users = getUsers();
  const hash = await hashPassword(password);
  
  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase().trim() && u.passwordHash === hash
  );

  if (!user) {
    throw new Error('Invalid email or password.');
  }

  const { passwordHash: _, ...userData } = user;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
  return userData;
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getCurrentUser(): User | null {
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

// Database functions
export function saveExamAttempt(attempt: Omit<ExamAttempt, 'id'>): ExamAttempt {
  const attempts = getAttempts();
  const newAttempt: ExamAttempt = {
    ...attempt,
    id: generateId(),
  };
  attempts.push(newAttempt);
  saveAttempts(attempts);
  return newAttempt;
}

export function getUserAttempts(userId: string): ExamAttempt[] {
  return getAttempts().filter(a => a.userId === userId).sort(
    (a, b) => new Date(b.dateTaken).getTime() - new Date(a.dateTaken).getTime()
  );
}

export function getAllAttempts(): ExamAttempt[] {
  return getAttempts().sort(
    (a, b) => new Date(b.dateTaken).getTime() - new Date(a.dateTaken).getTime()
  );
}

export function getAllUsers(): User[] {
  return getUsers().map(({ passwordHash: _, ...u }) => u);
}

export function getUserById(userId: string): User | null {
  const users = getUsers();
  const user = users.find(u => u.id === userId);
  if (!user) return null;
  const { passwordHash: _, ...userData } = user;
  return userData;
}

export function getAttemptById(attemptId: string): ExamAttempt | null {
  const attempts = getAttempts();
  return attempts.find(a => a.id === attemptId) || null;
}
