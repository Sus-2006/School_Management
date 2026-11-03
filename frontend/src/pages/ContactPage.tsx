import React, { useEffect, useState } from 'react';
import {
  PhoneCall,
  Mail,
  Clock,
  Building2,
  Send,
  CheckCircle2,
  ArrowLeft,
  Headphones,
  UserCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { apiService } from '../services/apiService';
import type { SchoolContactInfo } from '../types';

export const ContactPage: React.FC = () => {
  const navigate = useNavigate();

  const [contact, setContact] = useState<SchoolContactInfo | null>(null);
  const [formData, setFormData] = useState({
    name: 'Aarav Sharma',
    email: 'aarav.sharma@student.up.gov.in',
    subject: 'Query Regarding First Term Exam Hall Ticket',
    message: ''
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    apiService.getContactInfo().then((data) => {
      setContact(data);
      setLoading(false);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) {
      alert('Please enter your query message.');
      return;
    }

    setSubmitting(true);
    apiService.submitContactQuery(formData).then((res) => {
      setSubmitting(false);
      setFeedback(res.message);
      setFormData((prev) => ({ ...prev, message: '' }));
    });
  };

  if (loading || !contact) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-20 bg-[var(--bg-card)] rounded-2xl"></div>
        <div className="h-64 bg-[var(--bg-card)] rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <span className="text-xs text-[var(--text-muted)]">
          School Help Desk
        </span>
      </div>

      {/* Banner */}
      <div className="card-base p-6 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-transparent">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-purple-500/20">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
                Contact & School Help Desk
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
                Official Directory, Office Hours & Student Inquiry Submission
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Directory & Mock Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Directory Info (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="card-base p-6 space-y-5">
            <h2 className="text-base font-bold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-3">
              School Administration Directory
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500 shrink-0 mt-0.5">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[var(--text-primary)]">{contact.schoolName}</div>
                  <div className="text-[var(--text-secondary)] mt-0.5 leading-relaxed">{contact.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-sky-500/10 text-sky-500 shrink-0 mt-0.5">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[var(--text-primary)]">School Office Phone</div>
                  <div className="text-[var(--text-secondary)] mt-0.5">{contact.phone}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0 mt-0.5">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[var(--text-primary)]">Toll-Free Helpline</div>
                  <div className="text-[var(--text-secondary)] mt-0.5 font-semibold text-emerald-600 dark:text-emerald-400">
                    {contact.emergencyHelpline}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[var(--text-primary)]">Official Email</div>
                  <div className="text-[var(--text-secondary)] mt-0.5">{contact.email}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[var(--text-primary)]">Office Hours</div>
                  <div className="text-[var(--text-secondary)] mt-0.5">{contact.officeHours}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500 shrink-0 mt-0.5">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[var(--text-primary)]">Headmaster Office</div>
                  <div className="text-[var(--text-secondary)] mt-0.5">{contact.headmaster}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mock Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="card-base p-6 space-y-4">
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                Submit Inquiry / Feedback
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Frontend prototype form • Sends message to school admin queue
              </p>
            </div>

            {feedback && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <div>{feedback}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[var(--text-secondary)] mb-1">
                  Student Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-[var(--text-secondary)] mb-1">
                  Student / Guardian Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-[var(--text-secondary)] mb-1">
                  Subject Category
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-[var(--text-secondary)] mb-1">
                  Query Message
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your message, inquiry or feedback here..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl text-xs font-bold bg-purple-500 text-white hover:bg-purple-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
              >
                {submitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
