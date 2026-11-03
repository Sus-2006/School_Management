import React from 'react';
import { Menu, Sun, Moon, CheckCircle2, AlertCircle, ShieldCheck, User, Globe } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useWardArrival } from '../../context/WardArrivalContext';
import { useLanguage } from '../../context/LanguageContext';
import type { Language } from '../../i18n/translations';
import type { StudentProfile } from '../../types';

interface HeaderProps {
  onToggleSidebar: () => void;
  student: StudentProfile | null;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, student }) => {
  const { theme, toggleTheme } = useTheme();
  const { arrivalStatus, toggleArrivalState } = useWardArrival();
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-[var(--bg-card)]/90 border-b border-[var(--border-color)] px-4 lg:px-6 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu & Portal Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-main)] transition-colors lg:hidden focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]"
            aria-label="Open Navigation Drawer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-sky-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-[var(--text-primary)]">
                  {t('portalTitle')}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {t('studentPortal')}
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] hidden sm:block">
                {t('schoolName')}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Arrival Pill, Language Dropdown, Theme Toggle, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ward Arrival Quick Chip */}
          {arrivalStatus && (
            <button
              onClick={toggleArrivalState}
              title="Click to simulate Ward Arrival status toggle"
              className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                arrivalStatus.isArrived
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 hover:bg-amber-500/20'
              }`}
            >
              {arrivalStatus.isArrived ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5" />
              )}
              <span>
                {arrivalStatus.isArrived
                  ? `${t('arrivedAt')} (${arrivalStatus.arrivalTime})`
                  : t('wardNotArrivedMsg')}
              </span>
            </button>
          )}

          {/* Language Selector Dropdown */}
          <div className="relative flex items-center bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl px-2 py-1 gap-1">
            <Globe className="w-4 h-4 text-sky-500 shrink-0" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-xs font-semibold text-[var(--text-primary)] focus:outline-none cursor-pointer pr-1"
              aria-label="Select Language"
            >
              <option value="en" className="bg-[var(--bg-card)] text-[var(--text-primary)]">English</option>
              <option value="hi" className="bg-[var(--bg-card)] text-[var(--text-primary)]">हिंदी</option>
              <option value="ta" className="bg-[var(--bg-card)] text-[var(--text-primary)]">தமிழ்</option>
            </select>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-main)] border border-transparent hover:border-[var(--border-color)] transition-all"
            aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700" />
            )}
          </button>

          {/* Student Profile Quick View */}
          <div className="flex items-center gap-2 pl-2 border-l border-[var(--border-color)]">
            <div className="w-8 h-8 rounded-full bg-[var(--bg-main)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)]">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-semibold text-[var(--text-primary)] leading-tight">
                {student?.name || 'Student'}
              </div>
              <div className="text-[10px] text-[var(--text-muted)]">
                {student?.className} ({student?.section})
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
