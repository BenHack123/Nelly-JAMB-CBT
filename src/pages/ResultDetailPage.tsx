import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebase'; // Import your DB config
import { allQuestions } from '../data/questions';
import { ArrowLeft, CheckCircle, XCircle, ChevronDown, ChevronUp, Trophy, Target, Clock, BarChart3, Loader2 } from 'lucide-react';
import { SubjectName, ExamAttempt } from '../types';

interface Props {
  attemptId: string;
  onNavigate: (page: string) => void;
}

const SUBJECTS: SubjectName[] = ['English', 'Physics', 'Biology', 'Chemistry'];

export default function ResultDetailPage({ attemptId, onNavigate }: Props) {
  // 1. Change to state to handle the async Firebase data
  const [attempt, setAttempt] = useState<ExamAttempt | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [filterType, setFilterType] = useState<'all' | 'correct' | 'wrong' | 'unanswered'>('all');

  // 2. Fetch data from Firebase on mount
  useEffect(() => {
    async function fetchResult() {
      try {
        setLoading(true);
        // Clean the ID in case it has the 'result-detail:' prefix from navigation
        const cleanId = attemptId.includes(':') ? attemptId.split(':')[1] : attemptId;
        
        const docRef = doc(db, 'results', cleanId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setAttempt(docSnap.data() as ExamAttempt);
        }
      } catch (error) {
        console.error("Error fetching result:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchResult();
  }, [attemptId]);

  // 3. Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-green-600 animate-spin mb-4" />
        <p className="text-gray-500 dark:text-gray-400">Fetching your results from the cloud...</p>
      </div>
    );
  }

  // 4. Not Found State
  if (!attempt) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">Result not found.</p>
          <button onClick={() => onNavigate('dashboard')} className="px-4 py-2 bg-green-600 text-white rounded-xl">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ... (The rest of your filtering and JSX logic remains the same)

  const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
  const timeTakenMin = Math.round(attempt.timeTaken / 60);

  const questions = allQuestions;

  const filteredQuestions = questions.filter(q => {
    if (filterSubject !== 'all' && q.subject !== filterSubject) return false;
    const userAnswer = attempt.answers[q.id];
    if (filterType === 'correct' && userAnswer !== q.correctAnswer) return false;
    if (filterType === 'wrong' && (!userAnswer || userAnswer === q.correctAnswer)) return false;
    if (filterType === 'unanswered' && userAnswer) return false;
    return true;
  });

  const toggleExplanation = (id: string) => {
    setShowExplanations(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => onNavigate('results')}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Exam Result</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(attempt.dateTaken).toLocaleDateString('en-NG', {
                day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Score Summary */}
        <div className={`rounded-2xl p-6 sm:p-8 mb-6 text-white ${
          percentage >= 70 ? 'bg-gradient-to-br from-green-500 to-green-700' :
          percentage >= 50 ? 'bg-gradient-to-br from-yellow-500 to-orange-600' :
          'bg-gradient-to-br from-red-500 to-red-700'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm opacity-80 mb-1">Total Score</p>
              <p className="text-4xl sm:text-5xl font-bold">{attempt.score}/{attempt.totalQuestions}</p>
            </div>
            <div className="text-right">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white/30 flex items-center justify-center">
                <span className="text-2xl sm:text-3xl font-bold">{percentage}%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="bg-white/20 rounded-xl p-3 text-center">
              <Trophy className="w-5 h-5 mx-auto mb-1 opacity-80" />
              <p className="font-bold">{attempt.score}</p>
              <p className="text-xs opacity-80">Correct</p>
            </div>
            <div className="bg-white/20 rounded-xl p-3 text-center">
              <Target className="w-5 h-5 mx-auto mb-1 opacity-80" />
              <p className="font-bold">{attempt.totalQuestions - attempt.score}</p>
              <p className="text-xs opacity-80">Wrong</p>
            </div>
            <div className="bg-white/20 rounded-xl p-3 text-center">
              <Clock className="w-5 h-5 mx-auto mb-1 opacity-80" />
              <p className="font-bold">{timeTakenMin}m</p>
              <p className="text-xs opacity-80">Time Taken</p>
            </div>
          </div>
        </div>

        {/* Subject Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BarChart3 size={18} />
            Subject Breakdown
          </h3>
          <div className="space-y-4">
            {SUBJECTS.map(subject => {
              const data = attempt.subjectBreakdown[subject];
              const pct = Math.round((data.correct / data.total) * 100);
              return (
                <div key={subject}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{subject}</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{data.correct}/{data.total} ({pct}%)</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        pct >= 70 ? 'bg-green-500' : pct >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <select
            value={filterSubject}
            onChange={e => setFilterSubject(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-green-500 outline-none"
          >
            <option value="all">All Subjects</option>
            {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value as any)}
            className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-green-500 outline-none"
          >
            <option value="all">All Questions</option>
            <option value="correct">✅ Correct Only</option>
            <option value="wrong">❌ Wrong Only</option>
            <option value="unanswered">⬜ Unanswered</option>
          </select>
          <span className="text-sm text-gray-500 dark:text-gray-400 self-center ml-auto">
            Showing {filteredQuestions.length} questions
          </span>
        </div>

        {/* Questions Review */}
        <div className="space-y-4">
          {filteredQuestions.map((q) => {
            const userAnswer = attempt.answers[q.id];
            const isCorrect = userAnswer === q.correctAnswer;
            const isUnanswered = !userAnswer;
            return (
              <div key={q.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                      isUnanswered ? 'bg-gray-100 dark:bg-gray-700' :
                      isCorrect ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                    }`}>
                      {isUnanswered ? (
                        <span className="text-gray-400 text-sm">—</span>
                      ) : isCorrect ? (
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                      )}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full">{q.subject}</span>
                        <span className="text-xs text-gray-400">Q{allQuestions.indexOf(q) + 1}</span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-900 dark:text-white font-medium">{q.text}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-11">
                    {(['A', 'B', 'C', 'D'] as const).map(opt => {
                      const isUserChoice = userAnswer === opt;
                      const isCorrectOpt = q.correctAnswer === opt;
                      let style = 'bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600';
                      if (isCorrectOpt) style = 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700';
                      if (isUserChoice && !isCorrect) style = 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700';
                      return (
                        <div key={opt} className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm ${style}`}>
                          <span className="font-bold">{opt}.</span>
                          <span className="flex-1">{q.options[opt]}</span>
                          {isCorrectOpt && <CheckCircle size={14} className="text-green-600 dark:text-green-400 flex-shrink-0" />}
                          {isUserChoice && !isCorrect && <XCircle size={14} className="text-red-600 dark:text-red-400 flex-shrink-0" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={() => toggleExplanation(q.id)}
                  className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span>💡 Explanation</span>
                  {showExplanations[q.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {showExplanations[q.id] && (
                  <div className="px-5 py-4 bg-blue-50 dark:bg-blue-900/20 text-sm text-blue-800 dark:text-blue-300 border-t border-blue-100 dark:border-blue-800/30">
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => onNavigate('exam')}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors"
          >
            Retake Exam
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}
