import React from 'react';
import { Header } from '../../components/common/Header';
import { schoolStore, MOCK_CLASSES } from '../../data/mockData';
import { BarChart3, Users, Bus, DollarSign } from 'lucide-react';

export const AdminReportsPage: React.FC = () => {
  const students = schoolStore.getStudents();
  const buses = schoolStore.getBuses();

  const totalAssignedBus = students.filter((s) => s.transportRequired).length;
  const busCoveragePct = Math.round((totalAssignedBus / students.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 text-slate-800 dark:text-slate-100">
      <Header title="School Analytics" subtitle="Admin Reports" showBack={true} />

      <main className="max-w-md mx-auto p-4 space-y-4">
        
        {/* Attendance Report Card */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Class-wise Attendance Analysis
              </h3>
              <p className="text-[11px] text-slate-400">Total Enrolled: 140 Students</p>
            </div>
          </div>

          <div className="space-y-2 pt-1 text-xs">
            {MOCK_CLASSES.map((cls) => (
              <div key={cls.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <span className="font-semibold text-slate-800 dark:text-slate-200">{cls.fullName}</span>
                <span className="text-emerald-600 font-bold">19/20 Present (95%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transport Report Card */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Transport Fleet Allocation Report
              </h3>
              <p className="text-[11px] text-slate-400">{busCoveragePct}% of students using school bus</p>
            </div>
          </div>

          <div className="space-y-2 pt-1 text-xs">
            {buses.map((b) => (
              <div key={b.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>{b.busNo} ({b.registrationNo})</span>
                  <span>{b.assignedStudentsCount}/{b.capacity} Seats</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    style={{ width: `${(b.assignedStudentsCount / b.capacity) * 100}%` }}
                    className="h-full bg-blue-600 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};
