import { useEffect, useState } from 'react';
import { supabase, Registration } from '../lib/supabase';
import { LogOut, Users, BookOpen, TrendingUp, Download, BarChart3 } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

interface Stats {
  total: number;
  mostCommonMajor: string;
  beginnerPercentage: number;
  frontendGoals: number;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    mostCommonMajor: 'N/A',
    beginnerPercentage: 0,
    frontendGoals: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setRegistrations(data);
        calculateStats(data);
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: Registration[]) => {
    const total = data.length;

    const majors = data.map((r) => r.major);
    const majorCounts = majors.reduce((acc, major) => {
      acc[major] = (acc[major] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostCommonMajor =
      Object.keys(majorCounts).length > 0
        ? Object.entries(majorCounts).sort((a, b) => b[1] - a[1])[0][0]
        : 'N/A';

    const beginners = data.filter((r) => {
      const knowledge = r.programming_knowledge.toLowerCase();
      return knowledge.includes('beginner') || knowledge.includes('nothing') || knowledge.includes('zero');
    }).length;

    const beginnerPercentage = total > 0 ? Math.round((beginners / total) * 100) : 0;

    const frontendGoals = data.filter((r) => {
      const goals = r.programming_goals.toLowerCase();
      return goals.includes('front') || goals.includes('web design');
    }).length;

    setStats({
      total,
      mostCommonMajor,
      beginnerPercentage,
      frontendGoals,
    });
  };

  const exportToCSV = () => {
    const headers = [
      'Full Name',
      'Last Name',
      'Date of Birth',
      'Major',
      'Department',
      'Campus',
      'Programming Knowledge',
      'Programming Goals',
      'Registration Date',
    ];

    const rows = registrations.map((r) => [
      r.full_name,
      r.last_name,
      r.date_of_birth,
      r.major,
      r.department,
      r.campus,
      r.programming_knowledge,
      r.programming_goals,
      new Date(r.created_at).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `urex-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="flex">
        <aside className="w-64 min-h-screen bg-black border-r border-yellow-500/20 p-6">
          <div className="mb-8">
            <img
              src="/552102244_1511459556843066_700200828006065403_n-removebg-preview.png"
              alt="Urex Logo"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h2 className="text-xl font-bold text-center bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              UREX ADMIN
            </h2>
          </div>

          <nav className="space-y-2">
            <div className="px-4 py-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 font-semibold">
              Dashboard
            </div>
          </nav>

          <button
            onClick={onLogout}
            className="mt-8 w-full flex items-center justify-center gap-2 px-4 py-3 border border-red-500/30 rounded-lg text-red-400 font-semibold hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </aside>

        <main className="flex-1 p-8">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Registration Dashboard</h1>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg text-black font-bold hover:scale-105 transition-all"
            >
              <Download className="w-5 h-5" />
              Export CSV
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={<Users className="w-8 h-8" />}
              title="Total Registrations"
              value={stats.total.toString()}
              color="yellow"
            />
            <StatCard
              icon={<BookOpen className="w-8 h-8" />}
              title="Most Common Major"
              value={stats.mostCommonMajor}
              color="blue"
            />
            <StatCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Beginner Students"
              value={`${stats.beginnerPercentage}%`}
              color="green"
            />
            <StatCard
              icon={<BarChart3 className="w-8 h-8" />}
              title="Frontend Goals"
              value={stats.frontendGoals.toString()}
              color="purple"
            />
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black/50 border-b border-yellow-500/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-yellow-400 font-semibold">Name</th>
                    <th className="px-6 py-4 text-left text-yellow-400 font-semibold">Major</th>
                    <th className="px-6 py-4 text-left text-yellow-400 font-semibold">Campus</th>
                    <th className="px-6 py-4 text-left text-yellow-400 font-semibold">Knowledge</th>
                    <th className="px-6 py-4 text-left text-yellow-400 font-semibold">Goals</th>
                    <th className="px-6 py-4 text-left text-yellow-400 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((reg) => (
                    <tr
                      key={reg.id}
                      className="border-b border-yellow-500/10 hover:bg-yellow-500/5 transition-colors"
                    >
                      <td className="px-6 py-4 text-white">
                        {reg.full_name} {reg.last_name}
                      </td>
                      <td className="px-6 py-4 text-gray-300">{reg.major}</td>
                      <td className="px-6 py-4 text-gray-300">{reg.campus}</td>
                      <td className="px-6 py-4 text-gray-400 max-w-xs truncate" title={reg.programming_knowledge}>
                        {reg.programming_knowledge}
                      </td>
                      <td className="px-6 py-4 text-gray-400 max-w-xs truncate" title={reg.programming_goals}>
                        {reg.programming_goals}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {new Date(reg.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {registrations.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                No registrations yet. Check back later!
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color }: { icon: React.ReactNode; title: string; value: string; color: string }) {
  const colorClasses = {
    yellow: 'text-yellow-400 border-yellow-500/30',
    blue: 'text-blue-400 border-blue-500/30',
    green: 'text-green-400 border-green-500/30',
    purple: 'text-purple-400 border-purple-500/30',
  };

  return (
    <div className={`bg-gradient-to-br from-gray-900 to-black border ${colorClasses[color as keyof typeof colorClasses]} rounded-xl p-6`}>
      <div className={`mb-4 ${colorClasses[color as keyof typeof colorClasses].split(' ')[0]}`}>{icon}</div>
      <h3 className="text-gray-400 text-sm mb-2">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
