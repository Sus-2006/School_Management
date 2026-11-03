import React, { useState } from 'react';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { useAuth } from '../../context/AuthContext';
import { MOCK_FEES } from '../../data/mockData';
import { DollarSign, CheckCircle2, Download, CreditCard } from 'lucide-react';

export const ParentFeesPage: React.FC = () => {
  const { activeChild } = useAuth();
  const [fees, setFees] = useState(MOCK_FEES);
  const [showPayModal, setShowPayModal] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);

  const handlePayNow = () => {
    setFees((prev) =>
      prev.map((f) => (f.term === 'Term 2' ? { ...f, paid: 6500, balance: 0, status: 'Paid' as const } : f))
    );
    setShowPayModal(false);
    setPaySuccess(true);
  };

  const totalOutstanding = fees.reduce((acc, f) => acc + f.balance, 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 text-slate-800 dark:text-slate-100">
      <Header title="School Fees" subtitle="Parent Portal" />

      <main className="max-w-md mx-auto p-4 space-y-4">
        
        {/* Total Outstanding Card */}
        <div className="p-5 rounded-3xl bg-blue-700 text-white shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-200">
              Outstanding Dues
            </span>
            <span className="text-[10px] bg-blue-600 px-2.5 py-0.5 rounded-full font-bold">
              Academic Year 2026-27
            </span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-black tracking-tight">
                ₹{totalOutstanding.toLocaleString()}
              </p>
              <p className="text-[11px] text-blue-100 mt-0.5">
                {totalOutstanding > 0 ? 'Due by November 15, 2026' : 'All term fees cleared!'}
              </p>
            </div>

            {totalOutstanding > 0 && (
              <button
                onClick={() => setShowPayModal(true)}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs shadow-md active:scale-95 transition"
              >
                Pay Now
              </button>
            )}
          </div>
        </div>

        {paySuccess && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Payment of ₹2,500 successful! Receipt #RCT-2026-089 generated.</span>
          </div>
        )}

        {/* Fee Invoices Breakdown */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Term Invoices & Receipts
          </h3>

          {fees.map((fee) => (
            <div
              key={fee.id}
              className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {fee.term} Fee Invoice
                  </h4>
                  <p className="text-xs text-slate-500">Due: {fee.dueDate}</p>
                </div>
                <span
                  className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${
                    fee.status === 'Paid'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {fee.status}
                </span>
              </div>

              <div className="space-y-1.5 text-xs bg-slate-50 dark:bg-slate-800/40 p-3 rounded-2xl">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tuition Fee:</span>
                  <span className="font-medium">₹{fee.tuitionFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">School Bus Transport:</span>
                  <span className="font-medium">₹{fee.transportFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Activity & Lab Fee:</span>
                  <span className="font-medium">₹{fee.otherFee}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-slate-700 font-bold">
                  <span>Total Amount:</span>
                  <span>₹{fee.total}</span>
                </div>
                <div className="flex justify-between font-semibold text-emerald-600">
                  <span>Paid:</span>
                  <span>₹{fee.paid}</span>
                </div>
                {fee.balance > 0 && (
                  <div className="flex justify-between font-bold text-red-600">
                    <span>Balance Due:</span>
                    <span>₹{fee.balance}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-1 text-xs">
                {fee.status === 'Paid' ? (
                  <button
                    onClick={() => alert(`Downloading Fee Receipt for ${fee.term} (#RCT-2026-089)`)}
                    className="flex items-center space-x-1 font-semibold text-blue-600 hover:underline"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Receipt (PDF)</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setShowPayModal(true)}
                    className="w-full py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-xs"
                  >
                    Pay Balance (₹{fee.balance})
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Payment Gateway Modal Simulator */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  Online Fee Payment
                </h3>
                <p className="text-xs text-slate-500">Government School Fee Portal</p>
              </div>
              <button
                onClick={() => setShowPayModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-xs space-y-1">
              <div className="flex justify-between">
                <span>Student:</span>
                <span className="font-bold">{activeChild?.name || 'Aarav Sundaram'}</span>
              </div>
              <div className="flex justify-between">
                <span>Invoice:</span>
                <span className="font-bold">Term 2 Balance</span>
              </div>
              <div className="flex justify-between text-sm font-black text-blue-900 dark:text-blue-200 pt-1 border-t border-blue-200 dark:border-blue-800">
                <span>Amount Payable:</span>
                <span>₹2,500</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <label className="block font-semibold text-slate-600">Payment Method</label>
              <div className="p-2.5 rounded-xl border border-blue-600 bg-blue-50/30 flex items-center justify-between font-semibold">
                <span className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-600" /> UPI / Net Banking / Debit Card
                </span>
                <span className="w-3 h-3 rounded-full bg-blue-600" />
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowPayModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePayNow}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md"
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};
