import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import ExamPage from './pages/ExamPage';
import ResultsPage from './pages/ResultsPage';
import ResultDetailPage from './pages/ResultDetailPage';
import AdminPage from './pages/AdminPage';

function AppRouter() {
  const { user, loading } = useAuth();
  const [page, setPage] = useState('login');
  const [pageParam, setPageParam] = useState('');

  useEffect(() => {
    if (!loading) {
      if (user) {
        if (page === 'login' || page === 'signup') {
          setPage('dashboard');
        }
      } else {
        setPage('login');
      }
    }
  }, [user, loading]);

  const navigate = (target: string) => {
    if (target.includes(':')) {
      const [p, param] = target.split(':');
      setPage(p);
      setPageParam(param);
    } else {
      setPage(target);
      setPageParam('');
    }
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (page === 'signup') return <SignUpPage onNavigate={navigate} />;
    return <LoginPage onNavigate={navigate} />;
  }

  switch (page) {
    case 'dashboard': return <DashboardPage onNavigate={navigate} />;
    case 'exam': return <ExamPage onNavigate={navigate} />;
    case 'results': return <ResultsPage onNavigate={navigate} />;
    case 'result-detail': return <ResultDetailPage attemptId={pageParam} onNavigate={navigate} />;
    case 'admin': return <AdminPage onNavigate={navigate} />;
    default: return <DashboardPage onNavigate={navigate} />;
  }
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}
