import { useState, useEffect } from 'react'; // Added hooks
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase'; // Import your Firestore config
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'; // Added Firestore tools
import { BookOpen, Clock, Trophy, BarChart3, PlayCircle, History, Sun, Moon, LogOut, Shield, Loader2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { ExamAttempt } from '../types'; // Import the type you just showed me

interface Props {
  onNavigate: (page: string) => void;
}

export default function DashboardPage({ onNavigate }: Props) {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  
  const [attempts, setAttempts] = useState<ExamAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserResults() {
      if (!user) return;
      try {
        setLoading(true);
        const q = query(
          collection(db, 'results'),
          where('userId', '==', user.id),
          orderBy('dateTaken', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedAttempts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ExamAttempt[];
        
        setAttempts(fetchedAttempts);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserResults();
  }, [user]);

  if (!user) return null;

  // Calculate dynamic stats from the fetched 'attempts' state
  const bestScore = attempts.length > 0 ? Math.max(...attempts.map(a => a.score)) : 0;
  const avgScore = attempts.length > 0 ? Math.round(attempts.reduce((s, a) => s + a.score, 0) / attempts.length) : 0;

  const handleLogout = () => {
    logout();
    onNavigate('login');
  };

  // Show a clean loader while fetching from Firestore
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Loader2 className="animate-spin text-green-600 w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">JAMB CBT</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">UTME Practice 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
              title="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {user.isAdmin && (
              <button
                onClick={() => onNavigate('admin')}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
                title="Admin Dashboard"
              >
                <Shield size={20} />
              </button>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition-colors text-sm font-medium"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user.displayName || user.email.split('@')[0]}! 👋
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Ready to practice for your UTME?</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{attempts.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Attempts</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <Trophy className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{bestScore}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Best Score</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{avgScore}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Avg Score</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">120</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Min / Exam</p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => onNavigate('exam')}
            className="group bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-6 sm:p-8 text-left text-white shadow-lg shadow-green-600/20 hover:shadow-xl hover:shadow-green-600/30 transition-all hover:-translate-y-1"
          >
            <PlayCircle className="w-12 h-12 mb-4 opacity-90 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Start Exam</h3>
            <p className="text-green-100 text-sm sm:text-base">
              180 questions • 4 subjects • 120 minutes
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['English (60)', 'Physics (40)', 'Biology (40)', 'Chemistry (40)'].map(s => (
                <span key={s} className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">{s}</span>
              ))}
            </div>
          </button>

          <button
            onClick={() => onNavigate('results')}
            className="group bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 text-left border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <History className="w-12 h-12 mb-4 text-blue-600 dark:text-blue-400 opacity-90 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">My Results</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              View your past exam attempts and performance
            </p>
            {attempts.length > 0 && (
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                {attempts.length} attempt{attempts.length !== 1 ? 's' : ''} recorded
              </div>
            )}
          </button>
        </div>

        {/* Admin Panel Card */}
        {user.isAdmin && (
          <div className="mb-8">
            <button
              onClick={() => onNavigate('admin')}
              className="w-full group bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 text-left text-white shadow-lg shadow-purple-600/20 hover:shadow-xl hover:shadow-purple-600/30 transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <Shield className="w-12 h-12 opacity-90 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="text-xl font-bold mb-1">🛡️ Admin Dashboard</h3>
                  <p className="text-purple-200 text-sm">
                    View all registered users, their attempts, scores, and detailed results
                  </p>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Recent Results */}
        {attempts.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Recent Results</h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {attempts.slice(0, 5).map(attempt => (
                <button
                  key={attempt.id}
                  onClick={() => onNavigate(`result-detail:${attempt.id}`)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Score: {attempt.score}/{attempt.totalQuestions}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(attempt.dateTaken).toLocaleDateString('en-NG', {
                        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      (attempt.score / attempt.totalQuestions) >= 0.7 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      (attempt.score / attempt.totalQuestions) >= 0.5 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {Math.round((attempt.score / attempt.totalQuestions) * 100)}%
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Exam Info */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800/30">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">📋 Exam Information</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-300">
            <div className="space-y-2">
              <p>• <strong>Use of English:</strong> 60 questions</p>
              <p>• <strong>Physics:</strong> 40 questions</p>
            </div>
            <div className="space-y-2">
              <p>• <strong>Biology:</strong> 40 questions</p>
              <p>• <strong>Chemistry:</strong> 40 questions</p>
            </div>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-400 mt-3">
            Total: <strong>180 questions</strong> | Duration: <strong>120 minutes</strong> | Auto-submit on timeout
          </p>
        </div>
      </main>
    </div>
  );
}
