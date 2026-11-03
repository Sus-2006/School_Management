import React, { useEffect, useState } from 'react';
import { Header } from '../../components/common/Header';
import { Bell, Plus, CheckCircle2 } from 'lucide-react';
import type { NoticeCategory, NoticePriority } from '../../types';
import { backendApi } from '../../services/backendApi';

export const AdminNoticesPage: React.FC = () => {
  const [notices, setNotices] = useState<Array<{ id: string; title: string; date: string; timeAgo?: string; category: NoticeCategory; priority: NoticePriority; audience: 'all' | 'students' | 'parents' | 'teachers'; summary: string; fullContent: string; issuedBy: string }>>([]);
  const [apiError, setApiError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<NoticeCategory>('Notice');
  const [priority, setPriority] = useState<NoticePriority>('normal');
  const [audience, setAudience] = useState<'all' | 'students' | 'parents' | 'teachers'>('all');
  const [summary, setSummary] = useState('');
  const [fullContent, setFullContent] = useState('');

  const loadNotices = async () => {
    try {
      const data = await backendApi.getNotices();
      setNotices(data.map((notice) => ({ id: notice.id, title: notice.title, date: notice.date || notice.createdAt || '', category: 'Notice', priority: 'normal', audience: (['all', 'students', 'parents', 'teachers'].includes(notice.audience) ? notice.audience : 'all') as 'all' | 'students' | 'parents' | 'teachers', summary: notice.content, fullContent: notice.content, issuedBy: 'School Office' })));
      setApiError('');
    } catch (error) { setApiError(error instanceof Error ? error.message : 'Unable to load notices.'); }
  };

  useEffect(() => { void loadNotices(); }, []);

  const handlePostNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await backendApi.createNotice({ title, content: fullContent || summary, audience, date: new Date().toISOString() });
      await loadNotices();
      setShowAddModal(false); setTitle(''); setSummary(''); setFullContent('');
    } catch (error) { setApiError(error instanceof Error ? error.message : 'Unable to post notice.'); }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 text-slate-800 dark:text-slate-100">
      <Header title="Notice Board" subtitle="Admin Portal" showBack={true} />

      <main className="max-w-md mx-auto p-4 space-y-4">
        {apiError && <div role="alert" className="rounded-xl bg-red-50 p-3 text-xs text-red-700">{apiError}</div>}
        
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
