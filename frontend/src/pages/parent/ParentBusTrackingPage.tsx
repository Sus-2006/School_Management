import React, { useState, useEffect } from 'react';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { useAuth } from '../../context/AuthContext';
import { schoolStore, MOCK_BUSES } from '../../data/mockData';
import { Bus, MapPin, Phone, ShieldCheck, Navigation, Clock } from 'lucide-react';

export const ParentBusTrackingPage: React.FC = () => {
  const { activeChild } = useAuth();
  const child = activeChild || schoolStore.getStudents()[0];
  const bus = child?.busId ? schoolStore.getBusById(child.busId) || MOCK_BUSES[2] : MOCK_BUSES[2];

  // Bus movement simulation along stops
  const [currentProgress, setCurrentProgress] = useState(65);
  const [etaMinutes, setEtaMinutes] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProgress((prev) => (prev >= 95 ? 30 : prev + 2));
      setEtaMinutes((prev) => (prev <= 1 ? 5 : prev - 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 text-slate-800 dark:text-slate-100">
      <Header title="Live Bus Tracking" subtitle="Transport Portal" showBack={true} />

      <main className="max-w-md mx-auto p-4 space-y-4">
        
        {/* Interactive Simulated Live GPS Map View */}
        <div className="relative h-64 rounded-3xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800 bg-slate-900 flex flex-col justify-between p-4">
          
          {/* Simulated Map Visual Layers (Streets, River, Grid) */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#60a5fa" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Route Path Polyline */}
              <path
                d="M 30 200 Q 120 120 220 140 T 360 40"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="6"
                strokeDasharray="4 4"
              />
            </svg>
          </div>

          {/* Map Top Status Pills */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-white text-[11px] font-bold shadow-md flex items-center gap-1.5 backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              GPS Active • 32 km/h
            </span>

            <span className="px-3 py-1 rounded-full bg-slate-800/90 text-white text-[11px] font-bold shadow-md flex items-center gap-1.5 backdrop-blur-xs border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              ETA: {etaMinutes} Mins
            </span>
          </div>

          {/* Animated Bus Icon Marker on simulated road */}
          <div
            style={{ left: `${currentProgress}%`, top: '48%' }}
            className="absolute z-15 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 flex flex-col items-center"
          >
            <div className="px-2 py-0.5 rounded-md bg-[#1e4ed8] text-white font-bold text-[10px] shadow-lg mb-1 whitespace-nowrap animate-bounce">
              {bus.busNo} ({bus.currentStatus})
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-500 border-2 border-white shadow-xl flex items-center justify-center text-slate-900">
              <Bus className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Destination / School Stop Marker */}
          <div className="absolute right-6 top-6 z-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-white bg-slate-800/80 px-1.5 py-0.5 rounded-md mt-0.5">
              Govt School
            </span>
          </div>

          {/* Map Bottom Location Bar */}
          <div className="relative z-10 p-3 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white text-xs flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Navigation className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="truncate max-w-[240px] text-[11px]">{bus.currentLocationName}</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider shrink-0">
              Approaching Stop
            </span>
          </div>
        </div>

        {/* Bus & Driver Contact Card */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                Vehicle Details
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                {bus.busNo} • {bus.registrationNo}
              </h3>
              <p className="text-xs text-slate-500">{bus.routeName}</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
              {bus.currentStatus}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                Driver: {bus.driverName}
              </p>
              <p className="text-[11px] text-slate-400">
                Attendant: {bus.attendantName}
              </p>
            </div>
            <a
              href={`tel:${bus.driverPhone}`}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Driver</span>
            </a>
          </div>
        </div>

        {/* Student's Assigned Stop & Timings */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Assigned Stop for {child.name}
          </h4>
          <div className="flex items-center justify-between p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30">
            <div>
              <p className="text-sm font-bold text-blue-900 dark:text-blue-200">
                {child.stopName || 'Kamaraj Circle Stop'}
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-0.5">
                Opposite Post Office, Sector 4
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-blue-900 dark:text-blue-200">
                Morning: {child.pickupTime || '07:35 AM'}
              </p>
              <p className="text-[10px] text-blue-600 dark:text-blue-400">
                Evening Drop: {child.dropTime || '04:45 PM'}
              </p>
            </div>
          </div>
        </div>

        {/* All Ordered Stops along route */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs space-y-2">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2">
            Route Schedule & Stops
          </h4>
          <div className="space-y-2">
            {bus.stops.map((st, i) => (
              <div
                key={st.id}
                className="flex items-center justify-between p-2 text-xs rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40"
              >
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{st.name}</span>
                    {st.name === child.stopName && (
                      <span className="ml-1.5 text-[9px] px-1.5 py-0.2 rounded bg-blue-100 text-blue-700 font-bold">
                        Your Stop
                      </span>
                    )}
                  </div>
                </div>
                <span className="font-bold text-blue-600">{st.pickupTime}</span>
              </div>
            ))}
          </div>
        </div>

      </main>

      <BottomNav />
    </div>
  );
};
