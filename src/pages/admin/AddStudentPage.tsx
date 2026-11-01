import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/common/Header';
import { schoolStore, MOCK_CLASSES } from '../../data/mockData';
import { Check, Camera, CheckCircle2 } from 'lucide-react';
import type { StudentProfile } from '../../types';

export const AddStudentPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [successSaved, setSuccessSaved] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Student Details
    fullName: '',
    dob: '',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    classId: 'CLS-8A',
    className: 'Class 8-A',
    section: 'A',
    admissionNo: `ADM-2024-${String(schoolStore.getStudents().length + 1).padStart(3, '0')}`,
    bloodGroup: 'O+',
    photo: '',

    // Step 2: Parent Details
    fatherName: '',
    motherName: '',
    phone: '',
    email: '',
    address: '',
    district: 'Kanchipuram',
    state: 'Tamil Nadu',

    // Step 3: Transport Details
    transportRequired: true,
    routeId: 'RT-03',
    stopId: 'STP-301',
    busId: 'BUS-03',
    busNo: 'Bus 3',
    monthlyTransportFee: 850,
  });

  const buses = schoolStore.getBuses();
  const selectedBus = buses.find((b) => b.id === formData.busId) || buses[0];
  const selectedRouteStops = selectedBus?.stops || [];
  const selectedStop = selectedRouteStops.find((s) => s.id === formData.stopId) || selectedRouteStops[0];

  const availableSeats = selectedBus ? selectedBus.capacity - selectedBus.assignedStudentsCount : 0;
  const isBusFull = availableSeats <= 0;

  const handleRouteChange = (routeId: string) => {
    const matchedBus = buses.find((b) => b.routeId === routeId) || buses[0];
    const defaultStop = matchedBus.stops[0];
    setFormData((prev) => ({
      ...prev,
      routeId,
      busId: matchedBus.id,
      busNo: matchedBus.busNo,
      stopId: defaultStop?.id || '',
      monthlyTransportFee: 850,
    }));
  };

  const handleClassChange = (classId: string) => {
    const cls = MOCK_CLASSES.find((c) => c.id === classId);
    if (cls) {
      setFormData((prev) => ({
        ...prev,
        classId: cls.id,
        className: cls.fullName,
        section: cls.section,
      }));
    }
  };

  const handleSaveStudent = () => {
    const nextRoll = String(
      schoolStore.getStudents().filter((s) => s.classId === formData.classId).length + 1
    ).padStart(2, '0');

    const newStudent: Omit<StudentProfile, 'id'> = {
      name: formData.fullName || 'New Student',
      rollNo: nextRoll,
      classId: formData.classId,
      className: formData.className,
      section: formData.section,
      schoolName: 'Govt. Higher Secondary School',
      academicYear: '2026-2027',
      admissionNo: formData.admissionNo,
      dob: formData.dob || '2012-05-15',
      gender: formData.gender,
      bloodGroup: formData.bloodGroup,
      guardianName: formData.fatherName || 'Parent',
      guardianPhone: formData.phone || '9840199999',
      fatherName: formData.fatherName || 'Father',
      motherName: formData.motherName || 'Mother',
      parentEmail: formData.email || 'parent@gmail.com',
      address: formData.address || 'Street 5, Town',
      district: formData.district,
      state: formData.state,
      transportRequired: formData.transportRequired,
      busId: formData.transportRequired ? selectedBus.id : undefined,
      busNo: formData.transportRequired ? selectedBus.busNo : undefined,
      routeId: formData.transportRequired ? selectedBus.routeId : undefined,
      routeName: formData.transportRequired ? selectedBus.routeName : undefined,
      stopId: formData.transportRequired ? selectedStop?.id : undefined,
      stopName: formData.transportRequired ? selectedStop?.name : undefined,
      pickupTime: formData.transportRequired ? selectedStop?.pickupTime : undefined,
      dropTime: formData.transportRequired ? selectedStop?.dropTime : undefined,
      monthlyTransportFee: formData.transportRequired ? formData.monthlyTransportFee : 0,
      attendancePercentage: 100,
      todayAttendance: 'present',
    };

    schoolStore.addStudent(newStudent);
    setSuccessSaved(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 text-slate-800 dark:text-slate-100">
      {/* Top Header matching Images 3 and 4 */}
      <Header
        stepIndicator={`Step ${currentStep} of 4`}
        title="Add Student"
        showBack={true}
        onBack={() => {
          if (currentStep > 1) setCurrentStep((prev) => prev - 1);
          else navigate('/admin/students');
        }}
      />

      <main className="max-w-md mx-auto p-4 space-y-5">
        
        {/* 4-Step Progress Bar (Matching Image 3 & 4) */}
        <div className="grid grid-cols-4 gap-2 pt-1">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step <= currentStep
                  ? 'bg-[#1e4ed8] dark:bg-blue-500'
                  : 'bg-slate-200 dark:bg-slate-800'
              }`}
            />
          ))}
        </div>

        {successSaved ? (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md text-center space-y-4">
            <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Student Successfully Registered!
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <span className="font-semibold text-slate-900 dark:text-white">{formData.fullName || 'Student'}</span> has been admitted to {formData.className} with admission number {formData.admissionNo}.
              {formData.transportRequired && (
                <span className="block mt-1 text-blue-600 font-medium">
                  Assigned to {formData.busNo} ({selectedStop?.name}).
                </span>
              )}
            </p>
            <div className="flex space-x-2 pt-3">
              <button
                onClick={() => {
                  setSuccessSaved(false);
                  setCurrentStep(1);
                  setFormData((prev) => ({
                    ...prev,
                    fullName: '',
                    admissionNo: `ADM-2024-${String(schoolStore.getStudents().length + 1).padStart(3, '0')}`,
                  }));
                }}
                className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100"
              >
                Add Another
              </button>
              <button
                onClick={() => navigate('/admin/students')}
                className="flex-1 py-3 rounded-xl bg-[#1e4ed8] text-white text-xs font-semibold hover:bg-blue-700"
              >
                View Students
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            
            {/* STEP 1: STUDENT DETAILS (Matching Image 3) */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Student details
                </h2>

                {/* Circular Photo Upload Placeholder */}
                <div className="flex justify-start">
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 bg-white dark:bg-slate-900 shadow-xs cursor-pointer hover:border-blue-500 transition">
                    <Camera className="w-5 h-5 mb-0.5 opacity-60" />
                    <span className="text-[10px] font-medium">Photo</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Full name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Date of birth
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'Male' | 'Female' | 'Other' })}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Class
                    </label>
                    <select
                      value={formData.classId}
                      onChange={(e) => handleClassChange(e.target.value)}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    >
                      {MOCK_CLASSES.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Section
                    </label>
                    <select
                      value={formData.section}
                      onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    >
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Admission number
                    </label>
                    <input
                      type="text"
                      value={formData.admissionNo}
                      onChange={(e) => setFormData({ ...formData, admissionNo: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Blood group
                    </label>
                    <select
                      value={formData.bloodGroup}
                      onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    >
                      {['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'].map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-full mt-4 py-3.5 rounded-xl bg-[#1e4ed8] hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition"
                >
                  Next
                </button>
              </div>
            )}

            {/* STEP 2: PARENT DETAILS */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Parent / Guardian details (Creates Parent Login)
                </h2>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Father's full name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter father's name"
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Mother's full name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter mother's name"
                    value={formData.motherName}
                    onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Primary phone number (Used for Parent OTP Login)
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 9840123456"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="parent@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Residential address
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Door No, Street Name, Locality"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="flex-1 py-3.5 rounded-xl bg-[#1e4ed8] hover:bg-blue-700 text-white font-semibold text-xs shadow-md"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: TRANSPORT DETAILS (Matching Image 4) */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Transport details
                </h2>

                {/* Transport Yes / No segmented toggle (Image 4) */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, transportRequired: true })}
                    className={`py-3 text-xs font-semibold rounded-xl border transition ${
                      formData.transportRequired
                        ? 'bg-[#1e4ed8] text-white border-blue-700 shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    Transport: Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, transportRequired: false })}
                    className={`py-3 text-xs font-semibold rounded-xl border transition ${
                      !formData.transportRequired
                        ? 'bg-[#1e4ed8] text-white border-blue-700 shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    No
                  </button>
                </div>

                {formData.transportRequired ? (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                        Route
                      </label>
                      <select
                        value={formData.routeId}
                        onChange={(e) => handleRouteChange(e.target.value)}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      >
                        {buses.map((b) => (
                          <option key={b.routeId} value={b.routeId}>
                            {b.routeName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                        Pickup stop
                      </label>
                      <select
                        value={formData.stopId}
                        onChange={(e) => setFormData({ ...formData, stopId: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      >
                        {selectedRouteStops.map((st) => (
                          <option key={st.id} value={st.id}>
                            {st.name} ({st.pickupTime})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                        Bus number (auto)
                      </label>
                      <input
                        type="text"
                        disabled
                        value={formData.busNo}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-not-allowed font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                        Monthly transport fee (auto)
                      </label>
                      <input
                        type="text"
                        disabled
                        value={`₹${formData.monthlyTransportFee}`}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-not-allowed font-medium"
                      />
                    </div>

                    {/* Seat Capacity Enforced Rule Banner (Image 4) */}
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                      {isBusFull ? (
                        <p className="text-red-600 dark:text-red-400 font-semibold">
                          ⚠️ {selectedBus.busNo} is currently full ({selectedBus.assignedStudentsCount}/{selectedBus.capacity} seats). Please select an alternate route.
                        </p>
                      ) : (
                        <p className="text-slate-600 dark:text-slate-300">
                          Seats available on <span className="font-semibold text-blue-700 dark:text-blue-400">{selectedBus.busNo}</span>: {availableSeats} of {selectedBus.capacity} seats open. (Capacity rule enforced)
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 text-center text-xs text-slate-500">
                    Self-commute chosen. No bus transport fee will be applied.
                  </div>
                )}

                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={formData.transportRequired && isBusFull}
                    onClick={() => setCurrentStep(4)}
                    className="flex-1 py-3.5 rounded-xl bg-[#1e4ed8] hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs shadow-md"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW & SAVE */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Review & Confirm Student Details
                </h2>

                <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-3 divide-y divide-slate-100 dark:divide-slate-800">
                  
                  {/* Student Summary */}
                  <div className="pt-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                        Student Details
                      </span>
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {formData.fullName || 'Student Name'}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formData.className} • DOB: {formData.dob || '2012-05-15'} • Gender: {formData.gender} • Blood Group: {formData.bloodGroup}
                    </p>
                    <p className="text-xs text-slate-500">
                      Admission No: {formData.admissionNo}
                    </p>
                  </div>

                  {/* Parent Summary */}
                  <div className="pt-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                        Parent / Guardian
                      </span>
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {formData.fatherName || 'Father Name'} & {formData.motherName || 'Mother Name'}
                    </p>
                    <p className="text-xs text-slate-500">
                      Phone: {formData.phone || '9840123456'} • Email: {formData.email || 'parent@example.com'}
                    </p>
                    <p className="text-xs text-slate-500">
                      Address: {formData.address || 'Town, Sector 4'}, {formData.district}
                    </p>
                  </div>

                  {/* Transport Summary */}
                  <div className="pt-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                        Transport Allocation
                      </span>
                      <button
                        onClick={() => setCurrentStep(3)}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    {formData.transportRequired ? (
                      <div>
                        <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                          <Check className="w-4 h-4" /> Allocated to {selectedBus.busNo} ({selectedBus.registrationNo})
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Route: {selectedBus.routeName}
                        </p>
                        <p className="text-xs text-slate-500">
                          Pickup Stop: {selectedStop?.name} ({selectedStop?.pickupTime})
                        </p>
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 mt-1">
                          Monthly Transport Fee: ₹{formData.monthlyTransportFee}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500">
                        Self Commute (No bus transport required)
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="flex-1 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveStudent}
                    className="flex-1 py-3.5 rounded-xl bg-[#1e4ed8] hover:bg-blue-700 text-white font-semibold text-xs shadow-md"
                  >
                    Save Student
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </main>
    </div>
  );
};
