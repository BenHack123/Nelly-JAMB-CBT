import { useAuth } from '../contexts/AuthContext';
import { getUserAttempts } from '../services/database';
import { ArrowLeft, Trophy, Calendar, Clock, ChevronRight } from 'lucide-react';

interface Props {
  onNavigate: (page: string) => void;
}

export default function ResultsPage({ onNavigate }: Props) {
  const { user } = useAuth();
  if (!user) return null;

  const attempts = getUserAttempts(user.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">My Results</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{attempts.length} attempt{attempts.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {attempts.length === 0 ? (
          <div className="text-center py-20">
            <Trophy className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">No results yet</h3>
            <p className="text-gray-400 dark:text-gray-500 mb-6">Take your first exam to see results here.</p>
            <button
              onClick={() => onNavigate('exam')}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl"
            >
              Start Exam
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {attempts.map((attempt, idx) => {
              const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
              const timeTakenMin = Math.round(attempt.timeTaken / 60);
              return (
                <button
                  key={attempt.id}
                  onClick={() => onNavigate(`result-detail:${attempt.id}`)}
                  className="w-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 hover:shadow-md transition-all text-left"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                          Attempt #{attempts.length - idx}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          percentage >= 70 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          percentage >= 50 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {percentage}%
                        </span>
                      </div>

                      <p className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {attempt.score} / {attempt.totalQuestions}
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                        {Object.entries(attempt.subjectBreakdown).map(([subject, data]) => (
                          <div key={subject} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg px-3 py-2">
                            <p className="text-xs text-gray-500 dark:text-gray-400">{subject}</p>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">{data.correct}/{data.total}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(attempt.dateTaken).toLocaleDateString('en-NG', {
                            day: 'numeric', month: 'short', year: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {timeTakenMin} min
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="text-gray-400 dark:text-gray-500 flex-shrink-0 ml-4" size={20} />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
