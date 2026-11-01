import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { schoolStore, MOCK_BUSES } from '../../data/mockData';
import { Bus, MapPin, Phone, Clock, ArrowRight } from 'lucide-react';

export const StudentBusInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const student = schoolStore.getStudents()[0];
  const bus = MOCK_BUSES[2]; // Bus 3

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 text-slate-800 dark:text-slate-100">
      <Header title="My School Bus" subtitle="Transport Details" showBack={true} />

      <main className="max-w-md mx-auto p-4 space-y-4">
        
        {/* Bus Card */}
        <div className="p-5 rounded-3xl bg-blue-700 text-white shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-200">
              Assigned School Bus
            </span>
            <span className="text-xs bg-emerald-500 px-2.5 py-0.5 rounded-full font-bold">
              {bus.currentStatus}
            </span>
          </div>

          <div>
            <p className="text-2xl font-black">{bus.busNo}</p>
            <p className="text-xs text-blue-100">{bus.registrationNo} • {bus.routeName}</p>
          </div>

          <button
            onClick={() => navigate('/parent/bus')}
            className="w-full py-2.5 rounded-xl bg-white text-blue-800 font-bold text-xs flex items-center justify-center space-x-1.5 shadow-xs"
          >
            <span>Open Live GPS Tracker</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* My Stop & Timings */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Designated Stop & Timings
          </h3>
          <div className="flex items-center justify-between p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-xs">
            <div>
              <p className="font-bold text-blue-900 dark:text-blue-200">{student.stopName}</p>
              <p className="text-slate-500 text-[11px] mt-0.5">West Sector 3rd Cross</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-blue-700 dark:text-blue-400">Pickup: {student.pickupTime}</p>
              <p className="text-[10px] text-slate-400">Drop: {student.dropTime}</p>
            </div>
          </div>
        </div>

        {/* Crew Contact */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-100">Driver: {bus.driverName}</p>
              <p className="text-[10px] text-slate-400">Attendant: {bus.attendantName}</p>
            </div>
            <a
              href={`tel:${bus.driverPhone}`}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
            >
              <Phone className="w-3 h-3" />
              <span>Call</span>
            </a>
          </div>
        </div>

      </main>

      <BottomNav />
    </div>
  );
};
