import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { allQuestions } from '../data/questions';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { Question, ExamAttempt, SubjectName } from '../types';
import { Clock, ChevronLeft, ChevronRight, AlertTriangle, Flag, CheckCircle, BookOpen } from 'lucide-react';

interface Props {
  onNavigate: (page: string) => void;
}

const EXAM_DURATION = 120 * 60; // 120 minutes in seconds
const SUBJECTS: SubjectName[] = ['English', 'Physics', 'Biology', 'Chemistry'];

export default function ExamPage({ onNavigate }: Props) {
  const { user } = useAuth();
  const [started, setStarted] = useState(false);
  const [questions] = useState<Question[]>(allQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);
  const [submitted, setSubmitted] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [tabWarnings, setTabWarnings] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const [, setActiveSubject] = useState<SubjectName>('English');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer
  useEffect(() => {
    if (started && !submitted && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setTimeout(() => handleSubmit(true), 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, submitted]);

  // Anti-cheat: detect tab switching
  useEffect(() => {
    if (!started || submitted) return;
    const handleVisibility = () => {
      if (document.hidden) {
        setTabWarnings(prev => {
          const next = prev + 1;
          if (next >= 3) {
            alert('⚠️ WARNING: You have switched tabs 3 times. Further tab switches may lead to automatic submission.');
          }
          return next;
        });
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [started, submitted]);

  const submittingRef = useRef(false); 
  if (submittingRef.current) return;
submittingRef.current = true;

  // Replace your existing handleSubmit with this:
const handleSubmit = useCallback(async (autoSubmit = false) => {
  // 1. Prevent multiple clicks/submissions
  if (submitted || submittingRef.current) return;
  submittingRef.current = true;

  if (timerRef.current) clearInterval(timerRef.current);

  if (!user) {
    alert("User session not found. Please log in again.");
    return;
  }

  try {
    // 2. Calculate scores (Your existing logic is good here)
    let totalCorrect = 0;
    const breakdown: ExamAttempt['subjectBreakdown'] = {
      English: { correct: 0, total: 0 },
      Physics: { correct: 0, total: 0 },
      Biology: { correct: 0, total: 0 },
      Chemistry: { correct: 0, total: 0 },
    };

    questions.forEach(q => {
      breakdown[q.subject].total++;
      if (answers[q.id] === q.correctAnswer) {
        totalCorrect++;
        breakdown[q.subject].correct++;
      }
    });

    // 3. Save to Firebase
    const docRef = await addDoc(collection(db, "results"), {
      userId: user.id,
      userEmail: user.email,
      score: totalCorrect,
      totalQuestions: questions.length,
      subjectBreakdown: breakdown,
      answers,
      dateTaken: new Date().toISOString(),
      timeTaken: EXAM_DURATION - timeLeft,
    });

    setSubmitted(true);

    if (autoSubmit) {
      alert('⏰ Time is up! Your exam has been automatically submitted.');
    }

    // 4. Navigate to the dynamic result page
    onNavigate(`result-detail:${docRef.id}`);
    
  } catch (error) {
    console.error("Error submitting exam:", error);
    alert("Failed to save results. Please check your internet connection.");
  } finally {
    submittingRef.current = false;
  }
}, [submitted, user, questions, answers, timeLeft, onNavigate]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progressPercent = (answeredCount / questions.length) * 100;

  const getSubjectRange = (subject: SubjectName): { start: number; end: number } => {
    let start = 0;
    for (const s of SUBJECTS) {
      const count = questions.filter(q => q.subject === s).length;
      if (s === subject) return { start, end: start + count - 1 };
      start += count;
    }
    return { start: 0, end: 0 };
  };

  const getSubjectQuestions = (subject: SubjectName) => {
    const { start, end } = getSubjectRange(subject);
    return { start, end, questions: questions.slice(start, end + 1) };
  };

  const selectAnswer = (option: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: option }));
  };

  const toggleFlag = () => {
    setFlagged(prev => {
      const next = new Set(prev);
      if (next.has(currentQuestion.id)) next.delete(currentQuestion.id);
      else next.add(currentQuestion.id);
      return next;
    });
  };

  // Pre-exam screen
  if (!started) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">JAMB UTME 2026</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Computer Based Test</p>
          </div>

          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-6">
            <p className="font-semibold text-gray-900 dark:text-white">📋 Instructions:</p>
            <ul className="space-y-2 ml-4">
              <li>• Total questions: <strong>180</strong></li>
              <li>• Duration: <strong>2 hours (120 minutes)</strong></li>
              <li>• Subjects: English (60), Physics (40), Biology (40), Chemistry (40)</li>
              <li>• Select one option (A–D) per question</li>
              <li>• You can navigate between questions freely</li>
              <li>• Flag questions to review later</li>
              <li>• Exam auto-submits when time runs out</li>
              <li>• Avoid switching tabs (anti-cheat warning)</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={() => setStarted(true)}
              className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg shadow-green-600/30 transition-all"
            >
              Start Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isUrgent = timeLeft <= 300; // last 5 minutes

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Top Bar */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 sm:px-6 py-2 flex items-center justify-between flex-shrink-0 z-20">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold text-gray-900 dark:text-white">JAMB UTME 2026</h1>
          </div>
        </div>

        {/* Timer */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-lg font-bold ${
          isUrgent ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 animate-pulse' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
        }`}>
          <Clock size={18} />
          {formatTime(timeLeft)}
        </div>

        <div className="flex items-center gap-2">
          {tabWarnings > 0 && (
            <div className="hidden sm:flex items-center gap-1 text-yellow-600 text-xs">
              <AlertTriangle size={14} />
              {tabWarnings} warning{tabWarnings !== 1 ? 's' : ''}
            </div>
          )}
          <button
            onClick={() => setShowNav(!showNav)}
            className="sm:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4h14v2H3V4zm0 5h14v2H3V9zm0 5h14v2H3v-2z"/></svg>
          </button>
          <button
            onClick={() => setShowConfirmSubmit(true)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Submit
          </button>
        </div>
      </header>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 flex-shrink-0">
        <div
          className="h-full bg-green-500 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Subject Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 overflow-x-auto">
        <div className="flex min-w-max">
          {SUBJECTS.map(subject => {
            const { start, end } = getSubjectRange(subject);
            const isActive = currentIndex >= start && currentIndex <= end;
            const subjectAnswered = questions.slice(start, end + 1).filter(q => answers[q.id]).length;
            const subjectTotal = end - start + 1;
            return (
              <button
                key={subject}
                onClick={() => {
                  setActiveSubject(subject);
                  setCurrentIndex(start);
                }}
                className={`px-4 sm:px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-green-600 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/10'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {subject}
                <span className="ml-2 text-xs opacity-70">({subjectAnswered}/{subjectTotal})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Question Navigation - Sidebar (desktop) / Overlay (mobile) */}
        <div className={`${showNav ? 'fixed inset-0 z-30 bg-black/50 sm:relative sm:bg-transparent sm:inset-auto sm:z-auto' : 'hidden sm:block'}`}>
          <div className={`${showNav ? 'absolute right-0 top-0 h-full w-72' : 'w-64'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full overflow-hidden`}>
            {showNav && (
              <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center sm:hidden">
                <span className="font-semibold text-gray-900 dark:text-white">Questions</span>
                <button onClick={() => setShowNav(false)} className="text-gray-500">✕</button>
              </div>
            )}
            
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                <span>Answered: {answeredCount}/{questions.length}</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <div className="flex gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-green-500" /> Answered
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-red-400" /> Unanswered
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-yellow-400" /> Flagged
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3">
              {SUBJECTS.map(subject => {
                const { start, questions: subjectQs } = getSubjectQuestions(subject);
                return (
                  <div key={subject} className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">{subject}</p>
                    <div className="grid grid-cols-8 gap-1">
                      {subjectQs.map((q, i) => {
                        const globalIdx = start + i;
                        const isAnswered = !!answers[q.id];
                        const isFlagged = flagged.has(q.id);
                        const isCurrent = currentIndex === globalIdx;
                        return (
                          <button
                            key={q.id}
                            onClick={() => { setCurrentIndex(globalIdx); setShowNav(false); }}
                            className={`w-full aspect-square rounded text-xs font-medium transition-all ${
                              isCurrent ? 'ring-2 ring-blue-500 ring-offset-1 dark:ring-offset-gray-800' : ''
                            } ${
                              isFlagged ? 'bg-yellow-400 text-yellow-900' :
                              isAnswered ? 'bg-green-500 text-white' : 'bg-red-400 text-white'
                            } hover:opacity-80`}
                          >
                            {globalIdx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {showNav && <div className="sm:hidden" onClick={() => setShowNav(false)} />}
        </div>

        {/* Question Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-3xl mx-auto">
              {/* Question Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full">
                    {currentQuestion.subject}
                  </span>
                </div>
                <button
                  onClick={toggleFlag}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    flagged.has(currentQuestion.id)
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  <Flag size={14} />
                  {flagged.has(currentQuestion.id) ? 'Flagged' : 'Flag'}
                </button>
              </div>

              {/* Question */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-5 sm:p-6 mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Question {currentIndex + 1} of {questions.length}</p>
                <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-white leading-relaxed">
                  {currentQuestion.text}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {(['A', 'B', 'C', 'D'] as const).map(option => {
                  const isSelected = answers[currentQuestion.id] === option;
                  return (
                    <button
                      key={option}
                      onClick={() => selectAnswer(option)}
                      className={`w-full flex items-center gap-4 p-4 sm:p-5 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-md shadow-green-500/10'
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm'
                      }`}
                    >
                      <span className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                        isSelected
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}>
                        {option}
                      </span>
                      <span className={`text-sm sm:text-base ${
                        isSelected ? 'text-green-800 dark:text-green-300 font-medium' : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {currentQuestion.options[option]}
                      </span>
                      {isSelected && <CheckCircle className="ml-auto text-green-500 flex-shrink-0" size={20} />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 sm:px-6 py-3 flex items-center justify-between flex-shrink-0">
            <button
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
            >
              <ChevronLeft size={18} />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {currentIndex + 1} / {questions.length}
            </span>

            <button
              onClick={() => setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))}
              disabled={currentIndex === questions.length - 1}
              className="flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-md w-full">
            <div className="text-center mb-4">
              <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Submit Exam?</h3>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-6 text-sm">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-300">Answered</span>
                <span className="font-semibold text-green-600">{answeredCount}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-300">Unanswered</span>
                <span className="font-semibold text-red-500">{questions.length - answeredCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Flagged</span>
                <span className="font-semibold text-yellow-500">{flagged.size}</span>
              </div>
            </div>
            {questions.length - answeredCount > 0 && (
              <p className="text-sm text-red-500 text-center mb-4">
                ⚠️ You have {questions.length - answeredCount} unanswered question{questions.length - answeredCount !== 1 ? 's' : ''}!
              </p>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Continue Exam
              </button>
              <button
                onClick={() => handleSubmit(false)}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors"
              >
                Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
