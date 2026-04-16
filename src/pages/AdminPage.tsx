import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { ArrowLeft, Users, BarChart3, Trophy, Calendar, ChevronDown, ChevronUp, Search, SortAsc, SortDesc, Eye, Loader2 } from 'lucide-react';
import { User as UserProfile, ExamAttempt } from '../types';

interface Props {
  onNavigate: (page: string) => void;
}

type SortField = 'name' | 'date' | 'attempts' | 'bestScore';
type SortDir = 'asc' | 'desc';

export default function AdminPage({ onNavigate }: Props) {
  const { user } = useAuth();
  
  // State for data
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);
  const [allAttempts, setAllAttempts] = useState<ExamAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  // State for UI filters
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState('');
  const [activeTab, setActiveTab] = useState<'users' | 'attempts'>('users');

  useEffect(() => {
    async function fetchAdminData() {
      if (!user?.isAdmin) return;
      try {
        setLoading(true);
        // Fetch non-admin users
        const usersSnap = await getDocs(query(collection(db, 'users'), where('isAdmin', '==', false)));
        const fetchedUsers = usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as UserProfile[];
        
        // Fetch all attempts
        const attemptsSnap = await getDocs(query(collection(db, 'results'), orderBy('dateTaken', 'desc')));
        const fetchedAttempts = attemptsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ExamAttempt[];

        setAllUsers(fetchedUsers);
        setAllAttempts(fetchedAttempts);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAdminData();
  }, [user]);

  // Helper: Calculate stats for a specific user
  const getUserStats = (userId: string) => {
    const userAttempts = allAttempts.filter(a => a.userId === userId);
    const bestScore = userAttempts.length > 0 ? Math.max(...userAttempts.map(a => a.score)) : 0;
    const avgScore = userAttempts.length > 0 ? Math.round(userAttempts.reduce((s, a) => s + a.score, 0) / userAttempts.length) : 0;
    return { attempts: userAttempts.length, bestScore, avgScore, userAttempts };
  };

  // Memoized Filter & Sort
  const filteredUsers = useMemo(() => {
    let users = allUsers.filter(u => {
      const matchesSearch = (u.displayName?.toLowerCase() || '').includes(search.toLowerCase()) || 
                            u.email.toLowerCase().includes(search.toLowerCase());
      const matchesDate = !dateFilter || u.dateRegistered?.startsWith(dateFilter);
      return matchesSearch && matchesDate;
    });

    users.sort((a, b) => {
      const statsA = getUserStats(a.id);
      const statsB = getUserStats(b.id);
      let cmp = 0;
      switch (sortField) {
        case 'name': cmp = (a.displayName || a.email).localeCompare(b.displayName || b.email); break;
        case 'date': cmp = new Date(a.dateRegistered).getTime() - new Date(b.dateRegistered).getTime(); break;
        case 'attempts': cmp = statsA.attempts - statsB.attempts; break;
        case 'bestScore': cmp = statsA.bestScore - statsB.bestScore; break;
      }
      return sortDir === 'desc' ? -cmp : cmp;
    });

    return users;
  }, [allUsers, search, dateFilter, sortField, sortDir, allAttempts]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('desc'); }
  };

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-500 text-lg font-semibold mb-2">🚫 Access Denied</p>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Admin privileges required.</p>
          <button onClick={() => onNavigate('dashboard')} className="px-6 py-2 bg-green-600 text-white rounded-xl font-medium">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Loader2 className="animate-spin text-green-600 w-10 h-10" />
      </div>
    );
  }

  // Derived Global Stats
  const totalAttempts = allAttempts.length;
  const uniqueTestTakers = new Set(allAttempts.map(a => a.userId)).size;
  const overallAvg = totalAttempts > 0 ? Math.round(allAttempts.reduce((s, a) => s + a.score, 0) / totalAttempts) : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => onNavigate('dashboard')} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Manage users & view results</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<Users className="text-blue-500" />} val={allUsers.length} label="Registered" />
          <StatCard icon={<BarChart3 className="text-green-500" />} val={totalAttempts} label="Attempts" />
          <StatCard icon={<Trophy className="text-yellow-500" />} val={`${overallAvg}%`} label="Avg Score" />
          <StatCard icon={<Calendar className="text-purple-500" />} val={uniqueTestTakers} label="Test Takers" />
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-6">
          <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')} label={`Users (${allUsers.length})`} icon={<Users size={16}/>} />
          <TabButton active={activeTab === 'attempts'} onClick={() => setActiveTab('attempts')} label={`Attempts (${totalAttempts})`} icon={<BarChart3 size={16}/>} />
        </div>

        {activeTab === 'users' ? (
          <>
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search name or email..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
              />
            </div>
            <div className="w-full md:w-48">
              <input
                type="date"
                value={dateFilter}
                onChange={e => setDateFilter(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
              />
            </div>
              <div className="flex gap-1">
                {[{ field: 'date', label: 'Date' }, { field: 'bestScore', label: 'Score' }, { field: 'attempts', label: 'Attempts' }].map((s) => (
                  <button
                    key={s.field}
                    onClick={() => toggleSort(s.field as SortField)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1 ${sortField === s.field ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}
                  >
                    {s.label} {sortField === s.field && (sortDir === 'desc' ? <SortDesc size={12} /> : <SortAsc size={12} />)}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
              {filteredUsers.map(u => {
                const stats = getUserStats(u.id);
                const isExpanded = expandedUser === u.id;
                return (
                  <div key={u.id} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <button onClick={() => setExpandedUser(isExpanded ? null : u.id)} className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-700 font-bold">
                        {(u.displayName || u.email)[0].toUpperCase()}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-gray-900 dark:text-white truncate">{u.displayName || 'Anonymous'}</p>
                        <p className="text-xs text-gray-500 truncate">{u.email}</p>
                      </div>
                      <div className="hidden sm:grid grid-cols-3 gap-4 text-center text-sm mr-4">
                        <div><p className="font-bold">{stats.attempts}</p><p className="text-[10px] text-gray-400">Hits</p></div>
                        <div><p className="font-bold text-green-600">{stats.bestScore}%</p><p className="text-[10px] text-gray-400">Best</p></div>
                        <div><p className="font-bold text-blue-600">{stats.avgScore}%</p><p className="text-[10px] text-gray-400">Avg</p></div>
                      </div>
                      {isExpanded ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 bg-gray-50 dark:bg-gray-900/40">
                         <div className="space-y-2 pt-2">
                           {stats.userAttempts.map(att => (
                             <div key={att.id} className="bg-white dark:bg-gray-800 p-3 rounded-lg flex justify-between items-center border border-gray-100 dark:border-gray-700">
                                <div>
                                  <p className="text-sm font-bold">{att.score}/{att.totalQuestions} ({Math.round((att.score/att.totalQuestions)*100)}%)</p>
                                  <p className="text-[10px] text-gray-400">{new Date(att.dateTaken).toLocaleDateString()}</p>
                                </div>
                                <button onClick={() => onNavigate(`result-detail:${att.id}`)} className="p-2 text-gray-400 hover:text-green-600"><Eye size={16}/></button>
                             </div>
                           ))}
                         </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
             {allAttempts.map(att => (
               <div key={att.id} className="p-4 border-b border-gray-50 dark:border-gray-700 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{att.userEmail}</p>
                    <p className="text-xs text-gray-500">{Math.round((att.score/att.totalQuestions)*100)}% • {new Date(att.dateTaken).toLocaleString()}</p>
                  </div>
                  <button onClick={() => onNavigate(`result-detail:${att.id}`)} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs">View</button>
               </div>
             ))}
          </div>
        )}
      </main>
    </div>
  );
}

// Sub-components for cleaner code
function StatCard({ icon, val, label }: { icon: React.ReactNode, val: any, label: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
      <div className="mb-2">{icon}</div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{val}</p>
      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{label}</p>
    </div>
  );
}

function TabButton({ active, onClick, label, icon }: { active: boolean, onClick: () => void, label: string, icon: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${
        active ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
      }`}
    >
      {icon} {label}
    </button>
  );
}