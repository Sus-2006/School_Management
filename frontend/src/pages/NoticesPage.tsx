import React, { useEffect, useState } from 'react';
import {
  BellRing,
  Calendar,
  Search,
  ArrowLeft,
  UserCheck,
  X,
  Megaphone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { apiService } from '../services/apiService';
import { useLanguage } from '../context/LanguageContext';
import type { Notice } from '../types';

export const NoticesPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [notices, setNotices] = useState<Notice[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    apiService.getNotices().then((data) => {
      setNotices(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-20 bg-[var(--bg-card)] rounded-2xl"></div>
        <div className="h-40 bg-[var(--bg-card)] rounded-2xl"></div>
        <div className="h-40 bg-[var(--bg-card)] rounded-2xl"></div>
      </div>
    );
  }

  const categories = ['All', 'Academic', 'Examination', 'Holiday', 'Event', 'Notice'];

  const filteredNotices = notices.filter((notice) => {
    const matchesCategory =
      activeCategory === 'All' || notice.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesQuery =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.fullContent.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

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
    <div className="space-y-6 pb-8">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('backToDashboard')}</span>
        </button>

        <span className="text-xs text-[var(--text-muted)]">
          {notices.length} {t('activeAnnouncements')}
        </span>
      </div>

      {/* Banner */}
      <div className="card-base p-6 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-amber-500/20">
              <BellRing className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
                {t('noticesBoardTitle')}
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
                {t('schoolAnnouncements')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="card-base p-4 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notices by title, keyword or date..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-[var(--bg-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotices.map((notice) => (
          <div
            key={notice.id}
            onClick={() => setSelectedNotice(notice)}
            className="card-base p-5 card-hover cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${getPriorityBadge(notice.priority)}`}>
                  {notice.category}
                </span>

                <span className="text-xs font-semibold text-[var(--text-muted)] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  {notice.date}
                </span>
              </div>

              <h3 className="font-bold text-base text-[var(--text-primary)] group-hover:text-amber-500 transition-colors">
                {notice.title}
              </h3>

              <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed line-clamp-3">
                {notice.summary}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs">
              <span className="text-[var(--text-muted)] flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-amber-500" />
                Issued by: <strong className="text-[var(--text-primary)]">{notice.issuedBy}</strong>
              </span>

              <button className="text-xs font-semibold text-amber-500 hover:underline">
                Read Circular →
              </button>
            </div>
          </div>
        ))}

        {filteredNotices.length === 0 && (
          <div className="col-span-full card-base p-12 text-center space-y-3">
            <Megaphone className="w-10 h-10 text-[var(--text-muted)] mx-auto" />
            <h3 className="text-base font-bold text-[var(--text-primary)]">
              No notices found
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">
              No school announcements match your current search query or category filter.
            </p>
          </div>
        )}
      </div>

      {/* Modal View for Full Notice Content */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="card-base max-w-lg w-full p-6 space-y-4 relative animate-in fade-in zoom-in duration-200">
            <div className="flex items-start justify-between gap-3 border-b border-[var(--border-color)] pb-3">
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getPriorityBadge(selectedNotice.priority)}`}>
                  {selectedNotice.category}
                </span>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mt-2">
                  {selectedNotice.title}
                </h3>
                <div className="text-xs text-[var(--text-muted)] flex items-center gap-2 mt-1">
                  <span>Date: {selectedNotice.date}</span>
                  <span>•</span>
                  <span>Issued By: {selectedNotice.issuedBy}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedNotice(null)}
                className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-main)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[var(--text-secondary)] leading-relaxed max-h-72 overflow-y-auto pr-1">
              <div className="p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] font-medium text-[var(--text-primary)]">
                {selectedNotice.summary}
              </div>
              <p>{selectedNotice.fullContent}</p>
            </div>

            <div className="pt-3 border-t border-[var(--border-color)] flex justify-end">
              <button
                onClick={() => setSelectedNotice(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 text-white hover:bg-amber-600 transition-colors"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
