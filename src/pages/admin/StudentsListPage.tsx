import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { schoolStore, MOCK_CLASSES } from '../../data/mockData';
import { Search, Plus, Bus, Trash2, Phone, Filter } from 'lucide-react';
import type { StudentProfile } from '../../types';

export const StudentsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [transportFilter, setTransportFilter] = useState<'ALL' | 'BUS' | 'SELF'>('ALL');
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  const students = schoolStore.getStudents();

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.includes(searchTerm) ||
      s.admissionNo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClass = selectedClass === 'ALL' || s.classId === selectedClass;

    const matchesTransport =
      transportFilter === 'ALL' ||
      (transportFilter === 'BUS' && s.transportRequired) ||
      (transportFilter === 'SELF' && !s.transportRequired);

    return matchesSearch && matchesClass && matchesTransport;
  });

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove ${name} from the student records?`)) {
      schoolStore.deleteStudent(id);
      setSelectedStudent(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 text-slate-800 dark:text-slate-100">
      <Header title="Student Directory" subtitle="Admin Portal" />

      <main className="max-w-md mx-auto p-4 space-y-4">
        
        {/* Top Header Controls: Search & Add */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, roll no, or admission..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            onClick={() => navigate('/admin/add-student')}
            className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-[#1e4ed8] hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="space-y-2">
          {/* Class Filters */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            <span className="text-slate-400 text-[11px] font-medium flex items-center shrink-0 mr-1">
              <Filter className="w-3 h-3 mr-1" /> Class:
            </span>
            <button
              onClick={() => setSelectedClass('ALL')}
              className={`px-3 py-1.5 rounded-xl shrink-0 font-medium ${
                selectedClass === 'ALL'
                  ? 'bg-blue-700 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              All ({students.length})
            </button>
            {MOCK_CLASSES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedClass(c.id)}
                className={`px-3 py-1.5 rounded-xl shrink-0 font-medium ${
                  selectedClass === c.id
                    ? 'bg-blue-700 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {c.fullName}
              </button>
            ))}
          </div>

          {/* Transport Filter */}
          <div className="flex items-center space-x-2 text-[11px]">
            <span className="text-slate-400">Transport:</span>
            <button
              onClick={() => setTransportFilter('ALL')}
              className={`px-2.5 py-1 rounded-lg ${
                transportFilter === 'ALL' ? 'bg-slate-200 dark:bg-slate-700 font-bold' : 'text-slate-500'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setTransportFilter('BUS')}
              className={`px-2.5 py-1 rounded-lg ${
                transportFilter === 'BUS' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 font-bold' : 'text-slate-500'
              }`}
            >
              School Bus
            </button>
            <button
              onClick={() => setTransportFilter('SELF')}
              className={`px-2.5 py-1 rounded-lg ${
                transportFilter === 'SELF' ? 'bg-slate-200 dark:bg-slate-700 font-bold' : 'text-slate-500'
              }`}
            >
              Self-Commute
            </button>
          </div>
        </div>

        {/* Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Showing {filteredStudents.length} students</span>
          <span>7 Classes • 140 Enrolled</span>
        </div>

        {/* Students List */}
        <div className="space-y-2.5">
          {filteredStudents.length === 0 ? (
            <div className="p-8 text-center text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              <p className="text-xs">No students match your search filters.</p>
            </div>
          ) : (
            filteredStudents.map((student) => (
              <div
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-blue-400 cursor-pointer active:scale-[0.99] transition flex items-center justify-between"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-sm shrink-0">
                    {student.rollNo}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {student.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 truncate">
                      {student.className} • Adm: {student.admissionNo}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {student.transportRequired ? (
                        <span className="inline-flex items-center text-[10px] px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-medium">
                          <Bus className="w-2.5 h-2.5 mr-1" /> {student.busNo} ({student.stopName})
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-medium">
                          Self-commute
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400">
                        {student.attendancePercentage}% att.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right pl-2 shrink-0">
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    View &gt;
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

      </main>

      {/* Student Details & Action Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 dark:border-slate-800 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  {selectedStudent.className} • Roll {selectedStudent.rollNo}
                </span>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mt-0.5">
                  {selectedStudent.name}
                </h3>
                <p className="text-xs text-slate-500">{selectedStudent.admissionNo}</p>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
              <div className="flex justify-between">
                <span className="text-slate-500">Date of Birth:</span>
                <span className="font-medium">{selectedStudent.dob}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Gender & Blood:</span>
                <span className="font-medium">{selectedStudent.gender} ({selectedStudent.bloodGroup})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Parent / Guardian:</span>
                <span className="font-medium">{selectedStudent.guardianName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Parent Phone:</span>
                <a
                  href={`tel:${selectedStudent.guardianPhone}`}
                  className="font-medium text-blue-600 flex items-center gap-1 hover:underline"
                >
                  <Phone className="w-3 h-3" /> {selectedStudent.guardianPhone}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Transport:</span>
                <span className="font-medium">
                  {selectedStudent.transportRequired
                    ? `${selectedStudent.busNo} (${selectedStudent.stopName})`
                    : 'Self-commute'}
                </span>
              </div>
              {selectedStudent.transportRequired && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Monthly Transport Fee:</span>
                  <span className="font-medium">₹{selectedStudent.monthlyTransportFee}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500">Address:</span>
                <span className="font-medium text-right max-w-[180px]">{selectedStudent.address}</span>
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => handleDelete(selectedStudent.id, selectedStudent.name)}
                className="flex-1 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center justify-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
              <button
                onClick={() => setSelectedStudent(null)}
                className="flex-1 py-2.5 rounded-xl bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};
