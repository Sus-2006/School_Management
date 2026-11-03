import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { useAuth } from '../../context/AuthContext';
import { schoolStore } from '../../data/mockData';
import { User, LogOut, Phone, ShieldAlert, Award } from 'lucide-react';

export const StudentProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const student = schoolStore.getStudents()[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 text-slate-800 dark:text-slate-100">
      <Header title="Student Identity" subtitle="Me" />

      <main className="max-w-md mx-auto p-4 space-y-4">
        
        {/* ID Card Display */}
        <div className="p-6 rounded-3xl bg-blue-700 text-white shadow-md text-center space-y-3 relative overflow-hidden">
          <div className="w-20 h-20 rounded-full bg-white text-blue-800 font-bold text-2xl flex items-center justify-center mx-auto shadow-md">
            AS
          </div>
          <div>
            <h2 className="text-xl font-bold">{student.name}</h2>
            <p className="text-xs text-blue-200 mt-0.5">
              {student.className} • Roll No: {student.rollNo}
            </p>
            <p className="text-[11px] text-blue-100 mt-1 font-mono">
              Admission No: {student.admissionNo}
            </p>
          </div>
        </div>

        {/* Identity & Health Details */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2.5 text-xs">
          <h3 className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">
            Student Records
          </h3>
          <div className="flex justify-between">
            <span className="text-slate-500">Date of Birth:</span>
            <span className="font-semibold">{student.dob}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Gender & Blood Group:</span>
            <span className="font-semibold">{student.gender} • {student.bloodGroup}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Parent / Guardian:</span>
            <span className="font-semibold">{student.guardianName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Emergency Contact:</span>
            <span className="font-semibold text-blue-600">{student.guardianPhone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">School Bus:</span>
            <span className="font-semibold">{student.busNo} ({student.stopName})</span>
          </div>
        </div>

        {/* School Helpline */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2 text-xs">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-blue-600" />
            <span>School Emergency Helpdesk</span>
          </h3>
          <p className="text-slate-500 text-[11px]">
            Toll-free school safety and student helpline available during working hours.
          </p>
          <a
            href="tel:18004251234"
            className="flex items-center space-x-2 text-blue-600 font-bold hover:underline"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>1800-425-1234 (Helpline)</span>
          </a>
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="w-full py-3 px-4 rounded-2xl border border-red-200 dark:border-red-900/40 text-red-600 hover:bg-red-50 text-xs font-bold flex items-center justify-center space-x-2 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out of Student Account</span>
        </button>

      </main>

      <BottomNav />
    </div>
  );
};
