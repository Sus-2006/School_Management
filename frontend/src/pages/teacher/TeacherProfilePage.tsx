import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { useAuth } from '../../context/AuthContext';
import { User, LogOut, Award, BookOpen, Phone, Mail } from 'lucide-react';

export const TeacherProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 text-slate-800 dark:text-slate-100">
      <Header title="Faculty Profile" subtitle="Teacher Portal" />

      <main className="max-w-md mx-auto p-4 space-y-4">
        
        {/* Profile Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs text-center space-y-3">
          <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-2xl flex items-center justify-center mx-auto shadow-inner">
            PS
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Mrs. Priya Sharma
            </h2>
            <p className="text-xs font-semibold text-blue-600">
              Senior Mathematics Faculty
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Govt. Higher Secondary School • Emp ID: T-01
            </p>
          </div>
        </div>

        {/* Credentials */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3 text-xs">
          <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
            Academic Portfolio
          </h3>
          <div className="space-y-2.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Qualifications:</span>
              <span className="font-semibold">M.Sc., B.Ed. (First Class)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Teaching Experience:</span>
              <span className="font-semibold">11 Years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Class Teacher In-Charge:</span>
              <span className="font-bold text-blue-600">Class 8-A (20 Students)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Department:</span>
              <span className="font-semibold">Mathematics & Statistics</span>
            </div>
          </div>
        </div>

        {/* Contact details */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2.5 text-xs">
          <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
            <Phone className="w-4 h-4 text-blue-600" />
            <span>+91 98401 12233</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
            <Mail className="w-4 h-4 text-blue-600" />
            <span>priya.sharma@govschool.edu.in</span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="w-full py-3 px-4 rounded-2xl border border-red-200 dark:border-red-900/40 text-red-600 hover:bg-red-50 text-xs font-bold flex items-center justify-center space-x-2 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out of Teacher Account</span>
        </button>

      </main>

      <BottomNav />
    </div>
  );
};
