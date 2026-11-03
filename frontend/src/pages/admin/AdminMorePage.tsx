import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { useAuth } from '../../context/AuthContext';
import { DollarSign, Bell, BarChart3, School, Settings, LogOut, ChevronRight } from 'lucide-react';

export const AdminMorePage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { title: 'Fee Management', desc: 'Track fee invoices, collections & send reminders', path: '/admin/fees', icon: DollarSign, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50' },
    { title: 'Notice Board', desc: 'Publish announcements to students, parents & staff', path: '/admin/notices', icon: Bell, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/50' },
    { title: 'School Reports & Analytics', desc: 'Attendance trends, transport capacity, exam analysis', path: '/admin/reports', icon: BarChart3, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/50' },
    { title: 'Class & Subject Configurations', desc: '7 Classes • 140 Enrolled students • 10 Teachers', path: '/admin/staff', icon: School, color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/50' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 text-slate-800 dark:text-slate-100">
      <Header title="Administration Menu" subtitle="Admin Portal" />

      <main className="max-w-md mx-auto p-4 space-y-4">
        
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => navigate(item.path)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 active:bg-slate-100 transition"
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`p-2.5 rounded-2xl ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </button>
            );
          })}
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            System Session
          </h3>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full py-3 px-4 rounded-xl border border-red-200 dark:border-red-900/40 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-semibold flex items-center justify-center space-x-2 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out of Admin Portal</span>
          </button>
        </div>

      </main>

      <BottomNav />
    </div>
  );
};
