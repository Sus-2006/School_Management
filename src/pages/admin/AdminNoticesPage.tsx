import React, { useState } from 'react';
import { Header } from '../../components/common/Header';
import { schoolStore } from '../../data/mockData';
import { Bell, Plus, CheckCircle2 } from 'lucide-react';
import type { NoticeCategory, NoticePriority } from '../../types';

export const AdminNoticesPage: React.FC = () => {
  const [notices, setNotices] = useState(schoolStore.getNotices());
  const [showAddModal, setShowAddModal] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<NoticeCategory>('Notice');
  const [priority, setPriority] = useState<NoticePriority>('normal');
  const [audience, setAudience] = useState<'all' | 'students' | 'parents' | 'teachers'>('all');
  const [summary, setSummary] = useState('');
  const [fullContent, setFullContent] = useState('');

  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    const created = schoolStore.addNotice({
      title,
      date: new Date().toISOString().split('T')[0],
      category,
      priority,
      audience,
      summary,
      fullContent,
      issuedBy: 'Principal Office',
    });
    setNotices([created, ...notices]);
    setShowAddModal(false);
    setTitle('');
    setSummary('');
    setFullContent('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 text-slate-800 dark:text-slate-100">
      <Header title="Notice Board" subtitle="Admin Portal" showBack={true} />

      <main className="max-w-md mx-auto p-4 space-y-4">
        
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Active Announcements ({notices.length})
          </h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Post Notice</span>
          </button>
        </div>

        {/* Notices List */}
        <div className="space-y-3">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold">
                      {notice.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      To: <span className="capitalize font-semibold">{notice.audience}</span>
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                    {notice.title}
                  </h3>
                </div>
                <span className="text-[10px] text-slate-400 font-medium shrink-0 ml-2">
                  {notice.timeAgo || notice.date}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {notice.summary}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                <span>Issued by: {notice.issuedBy}</span>
                <span className="font-medium text-blue-600 cursor-pointer hover:underline">
                  View Full Notice
                </span>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Post Notice Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <form
            onSubmit={handlePostNotice}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 dark:border-slate-800 space-y-3.5 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Publish School Notice
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Notice Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Science Exhibition Schedule"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as NoticeCategory)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                >
                  {['Academic', 'Examination', 'Holiday', 'Event', 'Notice', 'Transport', 'Fee'].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Target Audience
                </label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value as 'all' | 'students' | 'parents' | 'teachers')}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                >
                  <option value="all">Everyone</option>
                  <option value="students">Students Only</option>
                  <option value="parents">Parents Only</option>
                  <option value="teachers">Faculty Only</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Short Summary
              </label>
              <textarea
                rows={2}
                required
                placeholder="Brief 1-2 sentence overview..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Full Details
              </label>
              <textarea
                rows={3}
                placeholder="Detailed instructions or venue info..."
                value={fullContent}
                onChange={(e) => setFullContent(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800"
              >
                Publish Now
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
