import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/common/Header';
import { schoolStore, MOCK_CLASSES } from '../../data/mockData';
import { CheckCircle2 } from 'lucide-react';

export const AddTeacherPage: React.FC = () => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [qualification, setQualification] = useState('M.Sc., B.Ed.');
  const [classTeacherOf, setClassTeacherOf] = useState('');
  const [experienceYears, setExperienceYears] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    schoolStore.addTeacher({
      name,
      phone,
      email,
      subject,
      qualification,
      classTeacherOf: classTeacherOf || undefined,
      experienceYears: Number(experienceYears),
    });
    setSaved(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 text-slate-800 dark:text-slate-100">
      <Header title="Add Faculty" subtitle="Admin Portal" showBack={true} />

      <main className="max-w-md mx-auto p-4 space-y-4">
        {saved ? (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md text-center space-y-4">
            <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Teacher Added Successfully!
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-white">{name}</span> has been registered as {subject} faculty.
            </p>
            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => {
                  setSaved(false);
                  setName('');
                  setPhone('');
                  setEmail('');
                }}
                className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold"
              >
                Add Another
              </button>
              <button
                onClick={() => navigate('/admin/staff')}
                className="flex-1 py-3 rounded-xl bg-blue-700 text-white text-xs font-semibold"
              >
                View Staff
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Teacher's Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Mrs. Lakshmi V"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                >
                  {['Mathematics', 'Science', 'English', 'Tamil', 'Social Science', 'Computer Science', 'Hindi', 'Physical Education'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Experience (Yrs)
                </label>
                <input
                  type="number"
                  min="0"
                  max="40"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(Number(e.target.value))}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Qualifications
              </label>
              <input
                type="text"
                placeholder="e.g. M.Sc., B.Ed., M.Phil."
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Class Teacher In-Charge (Optional)
              </label>
              <select
                value={classTeacherOf}
                onChange={(e) => setClassTeacherOf(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <option value="">None (Subject Teacher Only)</option>
                {MOCK_CLASSES.map((c) => (
                  <option key={c.id} value={c.fullName}>{c.fullName}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 9840112233"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="teacher@govschool.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3.5 rounded-xl bg-[#1e4ed8] hover:bg-blue-700 text-white font-semibold text-sm shadow-md"
            >
              Register Teacher
            </button>
          </form>
        )}
      </main>
    </div>
  );
};
