import React from 'react';
import { CheckCircle2, Clock, MapPin, RefreshCw, AlertCircle } from 'lucide-react';
import { useWardArrival } from '../../context/WardArrivalContext';
import { useLanguage } from '../../context/LanguageContext';

export const WardArrivalWidget: React.FC = () => {
  const { arrivalStatus, toggleArrivalState, isLoading } = useWardArrival();
  const { t } = useLanguage();

  if (isLoading || !arrivalStatus) {
    return (
      <div className="card-base p-5 animate-pulse flex items-center justify-center min-h-[120px]">
        <div className="h-4 w-1/2 bg-[var(--border-color)] rounded"></div>
      </div>
    );
  }

  return (
    <div className={`card-base p-5 transition-all border-l-4 ${
      arrivalStatus.isArrived
        ? 'border-l-emerald-500 bg-gradient-to-r from-emerald-500/5 to-transparent'
        : 'border-l-amber-500 bg-gradient-to-r from-amber-500/5 to-transparent'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left Side Info */}
        <div className="flex items-start gap-3.5">
          <div className={`p-3 rounded-2xl flex items-center justify-center shrink-0 ${
            arrivalStatus.isArrived
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
          }`}>
            {arrivalStatus.isArrived ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : (
              <AlertCircle className="w-6 h-6" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-[var(--text-primary)]">
                {t('wardArrivalTitle')}
              </h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                arrivalStatus.isArrived
                  ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                  : 'bg-amber-500/15 text-amber-700 dark:text-amber-300'
              }`}>
                {arrivalStatus.isArrived ? 'Recorded' : 'Pending'}
              </span>
            </div>

            <p className="text-sm font-medium text-[var(--text-primary)] mt-1">
              {arrivalStatus.isArrived ? t('wardArrivedMsg') : t('wardNotArrivedMsg')}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--text-secondary)] mt-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-sky-500" />
                {t('arrivedAt')}: <strong>{arrivalStatus.arrivalTime}</strong> ({arrivalStatus.date})
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                {t('biometricScanner')}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side Simulation Action */}
        <button
          onClick={toggleArrivalState}
          className="self-start sm:self-center flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-[var(--bg-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] hover:border-sky-500 transition-all shrink-0 active:scale-95"
          title="Simulate arrival status change for prototype review"
        >
          <RefreshCw className="w-3.5 h-3.5 text-sky-500" />
          <span>{t('simToggle')}</span>
        </button>
      </div>
    </div>
  );
};
