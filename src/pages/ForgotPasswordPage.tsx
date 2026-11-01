import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800">
        
        <button
          onClick={() => navigate('/login')}
          className="flex items-center space-x-1.5 text-xs font-semibold text-blue-700 dark:text-blue-400 mb-6 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </button>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">
          Reset Password
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-xs mb-6">
          Enter your registered login ID or phone number to receive a temporary password.
        </p>

        {submitted ? (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-sm text-emerald-900 dark:text-emerald-200">
              Reset Link Sent!
            </h3>
            <p className="text-xs text-emerald-700 dark:text-emerald-300">
              We have sent a temporary verification passcode to {phone || 'your phone'}.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="mt-2 w-full py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700"
            >
              Return to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                Login ID or Phone Number
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9840123456 or admin"
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#1e4ed8] hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all"
            >
              Send Password Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
