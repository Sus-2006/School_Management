import React, { useState } from 'react';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { schoolStore } from '../../data/mockData';
import { Bus, MapPin, Phone, Users, Plus, ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { SchoolBus } from '../../types';

export const TransportPage: React.FC = () => {
  const [buses, setBuses] = useState<SchoolBus[]>(schoolStore.getBuses());
  const [selectedBus, setSelectedBus] = useState<SchoolBus | null>(null);
  const [showAddBusModal, setShowAddBusModal] = useState(false);

  // Add Bus form state
  const [busNo, setBusNo] = useState('');
  const [regNo, setRegNo] = useState('');
  const [capacity, setCapacity] = useState(30);
  const [routeName, setRouteName] = useState('');
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [attendantName, setAttendantName] = useState('');
  const [attendantPhone, setAttendantPhone] = useState('');

  const handleAddBus = (e: React.FormEvent) => {
    e.preventDefault();
    const created = schoolStore.addBus({
      busNo: busNo || `Bus ${buses.length + 1}`,
      registrationNo: regNo || `TN 01 XY ${1000 + buses.length}`,
      capacity: Number(capacity),
      routeId: `RT-0${buses.length + 1}`,
      routeName: routeName || 'New City Route',
      driverId: `DRV-0${buses.length + 1}`,
      driverName: driverName || 'Driver Name',
      driverPhone: driverPhone || '+91 98765 00000',
      attendantName: attendantName || 'Attendant',
      attendantPhone: attendantPhone || '+91 98765 11111',
      currentStatus: 'At school',
      currentLocationName: 'School Bus Bay',
      stops: [
        { id: 'STP-NEW-1', name: 'Main Junction Stop', order: 1, pickupTime: '07:35 AM', dropTime: '04:40 PM', landmark: 'Town Hall' },
        { id: 'STP-NEW-2', name: 'West Cross Road', order: 2, pickupTime: '07:50 AM', dropTime: '04:25 PM', landmark: 'Bank Stop' },
      ],
    });
    setBuses([...schoolStore.getBuses()]);
    setShowAddBusModal(false);
    setSelectedBus(created);
  };

  const totalAssignedStudents = buses.reduce((acc, b) => acc + b.assignedStudentsCount, 0);
  const totalBusCapacity = buses.reduce((acc, b) => acc + b.capacity, 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 text-slate-800 dark:text-slate-100">
      <Header title="Transport Fleet" subtitle="Admin Portal" />

      <main className="max-w-md mx-auto p-4 space-y-4">
        
        {/* Top Summary Banner */}
        <div className="p-4 rounded-3xl bg-blue-700 text-white shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-200">
              Fleet Capacity & Safety
            </span>
            <span className="text-xs bg-blue-600 px-2.5 py-0.5 rounded-full font-bold">
              {buses.length} Active Buses
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-black tracking-tight">
                {totalAssignedStudents} <span className="text-xs font-normal text-blue-200">/ {totalBusCapacity} Seats Allocated</span>
              </p>
              <p className="text-[11px] text-blue-100 mt-0.5">
                ~60% student transport rule active & enforced.
              </p>
            </div>
            <button
              onClick={() => setShowAddBusModal(true)}
              className="px-3 py-2 rounded-xl bg-white text-blue-800 text-xs font-bold shadow-xs hover:bg-blue-50 active:scale-95 transition"
            >
              + Add Bus
            </button>
          </div>
        </div>

        {/* Fleet List */}
        <div className="space-y-3">
          {buses.map((bus) => {
            const seatsRemaining = bus.capacity - bus.assignedStudentsCount;
            const occupancyPct = Math.round((bus.assignedStudentsCount / bus.capacity) * 100);
            const isFull = seatsRemaining <= 0;

            return (
              <div
                key={bus.id}
                onClick={() => setSelectedBus(bus)}
                className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs cursor-pointer hover:border-blue-400 active:scale-[0.99] transition space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0">
                      <Bus className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {bus.busNo} • {bus.registrationNo}
                      </h3>
                      <p className="text-xs text-slate-500 truncate max-w-[200px]">
                        {bus.routeName}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      bus.currentStatus === 'On the way'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300'
                        : bus.currentStatus === 'At school'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {bus.currentStatus}
                  </span>
                </div>

                {/* Capacity Progress Bar with Seat Capacity Enforced Rule */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">
                      Capacity Utilization:
                    </span>
                    <span className={`font-bold ${isFull ? 'text-red-600' : 'text-slate-700 dark:text-slate-200'}`}>
                      {bus.assignedStudentsCount} / {bus.capacity} seats ({occupancyPct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      style={{ width: `${Math.min(occupancyPct, 100)}%` }}
                      className={`h-full rounded-full transition-all duration-300 ${
                        isFull
                          ? 'bg-red-500'
                          : occupancyPct > 80
                          ? 'bg-amber-500'
                          : 'bg-blue-600'
                      }`}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>{bus.stops.length} Scheduled Stops</span>
                    <span>{seatsRemaining > 0 ? `${seatsRemaining} seats available` : 'BUS FULL'}</span>
                  </div>
                </div>

                {/* Driver Info */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex items-center space-x-1.5 text-slate-600 dark:text-slate-300">
                    <span className="font-medium">Driver: {bus.driverName}</span>
                  </div>
                  <a
                    href={`tel:${bus.driverPhone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center space-x-1 font-semibold text-blue-600 hover:underline"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Driver</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </main>

      {/* Bus Details & Stops Modal */}
      {selectedBus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 dark:border-slate-800 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  {selectedBus.registrationNo}
                </span>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  {selectedBus.busNo}
                </h3>
                <p className="text-xs text-slate-500">{selectedBus.routeName}</p>
              </div>
              <button
                onClick={() => setSelectedBus(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Crew Details */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Driver:</span>
                <a href={`tel:${selectedBus.driverPhone}`} className="font-bold text-blue-600 flex items-center gap-1">
                  <Phone className="w-3 h-3" /> {selectedBus.driverName} ({selectedBus.driverPhone})
                </a>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Attendant:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {selectedBus.attendantName} ({selectedBus.attendantPhone})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Current Status:</span>
                <span className="font-bold text-emerald-600">{selectedBus.currentStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">GPS Location:</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">{selectedBus.currentLocationName}</span>
              </div>
            </div>

            {/* Ordered Stops List */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>Ordered Stops & Pickup Times</span>
              </h4>
              <div className="space-y-2">
                {selectedBus.stops.map((stop, index) => (
                  <div
                    key={stop.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs border border-slate-100 dark:border-slate-800"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-[10px] flex items-center justify-center">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-100">{stop.name}</p>
                        {stop.landmark && <p className="text-[10px] text-slate-400">{stop.landmark}</p>}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-700 dark:text-blue-400">{stop.pickupTime}</p>
                      <p className="text-[10px] text-slate-400">Drop: {stop.dropTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedBus(null)}
              className="w-full py-2.5 rounded-xl bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Add Bus Modal */}
      {showAddBusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <form
            onSubmit={handleAddBus}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 dark:border-slate-800 space-y-3.5 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Add New School Bus
              </h3>
              <button
                type="button"
                onClick={() => setShowAddBusModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Bus Display Number
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Bus 6"
                value={busNo}
                onChange={(e) => setBusNo(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Registration No
                </label>
                <input
                  type="text"
                  required
                  placeholder="TN 01 KL 6006"
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Seat Capacity
                </label>
                <input
                  type="number"
                  min="10"
                  max="50"
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Route Name
              </label>
              <input
                type="text"
                required
                placeholder="Route 6: South Ring - Airport Road"
                value={routeName}
                onChange={(e) => setRouteName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Driver Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Mr. Suresh"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Driver Phone
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43215"
                  value={driverPhone}
                  onChange={(e) => setDriverPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Attendant Name
                </label>
                <input
                  type="text"
                  placeholder="Mr. Mohan"
                  value={attendantName}
                  onChange={(e) => setAttendantName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Attendant Phone
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43295"
                  value={attendantPhone}
                  onChange={(e) => setAttendantPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddBusModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800"
              >
                Save Bus
              </button>
            </div>
          </form>
        </div>
      )}

      <BottomNav />
    </div>
  );
};
