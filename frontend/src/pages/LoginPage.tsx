import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const { login, loginWithOtp } = useAuth();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<UserRole>('parent');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpPhone, setOtpPhone] = useState('9840123458');
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState('');

  const roleOptions: { role: UserRole; label: string; sampleId: string; samplePass: string }[] = [
    { role: 'admin', label: 'Admin', sampleId: 'admin@test.school', samplePass: 'Admin@12345' },
    { role: 'teacher', label: 'Teacher', sampleId: 'teacher', samplePass: 'teacher123' },
    { role: 'parent', label: 'Parent', sampleId: 'parent', samplePass: 'parent123' },
    { role: 'student', label: 'Student', sampleId: 'student', samplePass: 'student123' },
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    const matched = roleOptions.find((r) => r.role === role);
    if (matched) {
      setLoginId(matched.sampleId);
      setPassword(matched.samplePass);
    }
    setError('');
  };

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    setError('');

    const success = await login(selectedRole, loginId, password);

    if (success) {
      navigate(`/${selectedRole}`);
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleOtpLogin = () => {
    loginWithOtp(selectedRole, otpPhone);
    setShowOtpModal(false);
    navigate(`/${selectedRole}`);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800">
        
        {/* Logo - Matching Image 1 "SA" blue rounded icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#1e4ed8] flex items-center justify-center text-white font-bold text-2xl tracking-wider shadow-md mb-6">
          SA
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">
          [School Name]
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
          Sign in to continue
        </p>

        {/* "I am a" Role Selector Tabs */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
            I am a
          </label>
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            {roleOptions.map((item) => {
              const isSelected = selectedRole === item.role;
              return (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => handleRoleSelect(item.role)}
                  className={`py-2 px-1 text-xs font-semibold rounded-xl transition-all duration-150 ${
                    isSelected
                      ? 'bg-[#1e4ed8] text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-red-50 text-red-700 text-xs font-medium border border-red-100">
            {error}
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
              Login ID or phone number
            </label>
            <input
              type="text"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              placeholder="Enter ID or phone"
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
            />
          </div>

          {/* Forgot password link */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-xs font-semibold text-[#1e4ed8] dark:text-blue-400 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Primary Login Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-[#1e4ed8] hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-sm shadow-md transition-all duration-150"
          >
            Login
          </button>

          {/* Login with OTP Button */}
          <button
            type="button"
            onClick={() => setShowOtpModal(true)}
            className="w-full py-3.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-[#1e4ed8] dark:text-blue-400 font-semibold text-sm shadow-xs transition-all duration-150"
          >
            Login with OTP
          </button>
        </form>

        {/* Quick Demo Helper Hint */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-[11px] text-slate-400">
            Demo credentials auto-filled for <span className="font-semibold text-slate-600 dark:text-slate-300 capitalize">{selectedRole}</span>. Click Login to enter.
          </p>
        </div>
      </div>

      {/* OTP Login Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Instant OTP Login
            </h3>
            <p className="text-xs text-slate-500">
              A 4-digit verification code will be sent to your registered phone number.
            </p>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={otpPhone}
                onChange={(e) => setOtpPhone(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                OTP Code (Demo: 1234)
              </label>
              <input
                type="text"
                placeholder="1234"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full px-4 py-2.5 text-center text-lg tracking-widest font-bold rounded-xl border border-slate-200 dark:border-slate-700"
              />
            </div>
            <div className="flex space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowOtpModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleOtpLogin}
                className="flex-1 py-2.5 rounded-xl bg-[#1e4ed8] text-white text-xs font-semibold hover:bg-blue-700"
              >
                Verify & Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
