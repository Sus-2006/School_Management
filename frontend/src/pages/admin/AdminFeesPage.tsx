import React, { useState } from 'react';
import { Header } from '../../components/common/Header';
import { schoolStore } from '../../data/mockData';
import { DollarSign, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const AdminFeesPage: React.FC = () => {
  const [reminderSent, setReminderSent] = useState(false);

  const students = schoolStore.getStudents();
  const busTransportStudents = students.filter((s) => s.transportRequired).length;

  // 140 students * standard fee
  const totalBilled = 140 * 6500;
  const totalCollected = 118 * 6500 + 22 * 4000;
  const totalBalance = totalBilled - totalCollected;

  const handleSendReminder = () => {
    schoolStore.addNotice({
      title: 'Fee Reminder - Term 2 Due Notice',
      date: new Date().toISOString().split('T')[0],
      category: 'Fee',
      priority: 'high',
      summary: 'Automated fee reminder broadcasted to all parents with pending dues.',
      fullContent: 'Parents are requested to clear the outstanding Term 2 balance by November 15, 2026. Online receipt generation is enabled in the parent app.',
      audience: 'parents',
      issuedBy: 'Accounts Office',
    });
    setReminderSent(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 text-slate-800 dark:text-slate-100">
      <Header title="Fee Management" subtitle="Admin Portal" showBack={true} />

      <main className="max-w-md mx-auto p-4 space-y-4">
        
        {/* KPI Banner */}
        <div className="p-4 rounded-3xl bg-blue-700 text-white shadow-sm space-y-3">
          <p className="text-xs text-blue-200 font-semibold uppercase tracking-wider">
            Term 2 Collection Overview
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-[11px] text-blue-200">Total Billed</span>
              <p className="text-xl font-black">₹{totalBilled.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-[11px] text-blue-200">Total Collected</span>
              <p className="text-xl font-black text-emerald-300">₹{totalCollected.toLocaleString()}</p>
            </div>
          </div>
          <div className="pt-2 border-t border-blue-600 flex items-center justify-between text-xs">
            <span>Outstanding Balance:</span>
            <span className="font-bold text-amber-300">₹{totalBalance.toLocaleString()}</span>
          </div>
        </div>

        {/* Quick Action: Send Reminder */}
        {reminderSent ? (
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-800 dark:text-emerald-300 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Reminder notice broadcasted to 140 registered parent mobile apps!</span>
          </div>
        ) : (
          <button
            onClick={handleSendReminder}
            className="w-full py-3 px-4 rounded-2xl bg-[#1e4ed8] hover:bg-blue-700 text-white font-semibold text-xs shadow-xs flex items-center justify-center space-x-2 transition"
          >
            <Send className="w-4 h-4" />
            <span>Broadcast Term 2 Fee Reminder to Parents</span>
          </button>
        )}

        {/* Breakdown by Class */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Fee Collection Status by Class
          </h3>
          <div className="space-y-2.5">
            {[
              { cls: 'Class 6-A', paid: 18, pending: 2, pct: 90 },
              { cls: 'Class 6-B', paid: 17, pending: 3, pct: 85 },
              { cls: 'Class 7-A', paid: 19, pending: 1, pct: 95 },
              { cls: 'Class 7-B', paid: 16, pending: 4, pct: 80 },
              { cls: 'Class 8-A', paid: 18, pending: 2, pct: 90 },
              { cls: 'Class 9-A', paid: 15, pending: 5, pct: 75 },
              { cls: 'Class 10-A', paid: 15, pending: 5, pct: 75 },
            ].map((item, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{item.cls}</span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {item.paid}/20 Paid ({item.pct}%)
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div style={{ width: `${item.pct}%` }} className="h-full rounded-full bg-emerald-600" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};
