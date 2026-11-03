import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BellRing, ChevronRight, Calendar, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { Notice } from '../../types';

interface NoticesWidgetProps {
  notices: Notice[];
}

export const NoticesWidget: React.FC<NoticesWidgetProps> = ({ notices }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Display top 3 recent notices on dashboard
  const recentNotices = notices.slice(0, 3);

  const getPriorityBadge = (priority: Notice['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
      case 'high':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      default:
        return 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20';
    }
  };

  return (
    <div className="card-base p-5 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
              <BellRing className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[var(--text-primary)]">
                {t('importantNotices')}
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                {t('schoolAnnouncements')}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/notices')}
            className="flex items-center gap-1 text-xs font-semibold text-amber-500 hover:text-amber-600 transition-colors"
          >
            <span>{t('viewAllNotices')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Notices Item List */}
        <div className="space-y-3 my-2">
          {recentNotices.map((notice) => (
            <div
              key={notice.id}
              onClick={() => navigate('/notices')}
              className="p-3.5 rounded-xl bg-[var(--bg-main)] border border-transparent hover:border-[var(--border-color)] transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${getPriorityBadge(notice.priority)}`}>
                  {notice.category}
                </span>

                <span className="text-[11px] text-[var(--text-muted)] flex items-center gap-1 shrink-0">
                  <Calendar className="w-3 h-3 text-[var(--text-muted)]" />
                  {notice.date}
                </span>
              </div>

              <h4 className="font-semibold text-xs sm:text-sm text-[var(--text-primary)] group-hover:text-amber-500 transition-colors mt-2 line-clamp-1">
                {notice.title}
              </h4>

              <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mt-1 leading-relaxed">
                {notice.summary}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs">
        <span className="text-[var(--text-muted)] flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          {notices.length} {t('activeAnnouncements')}
        </span>
        <button
          onClick={() => navigate('/notices')}
          className="text-xs font-semibold text-amber-500 hover:underline"
        >
          {t('openNoticeBoard')} →
        </button>
      </div>
    </div>
  );
};
