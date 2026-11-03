import React from 'react';
import { X, Bell, Bus, CheckCircle2, DollarSign, BookOpen } from 'lucide-react';
import { schoolStore } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import type { NotificationAlert } from '../../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  const { role } = useAuth();
  const alerts = schoolStore.getNotifications(role);

  if (!isOpen) return null;

  const getAlertIcon = (type: NotificationAlert['type']) => {
    switch (type) {
      case 'bus':
        return <Bus className="w-5 h-5 text-amber-600" />;
      case 'attendance':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'fee':
        return <DollarSign className="w-5 h-5 text-blue-600" />;
      case 'academic':
        return <BookOpen className="w-5 h-5 text-purple-600" />;
      default:
        return <Bell className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-blue-700 p-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <h3 className="font-bold text-lg">Notifications & Alerts</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 max-h-[65vh] overflow-y-auto space-y-3">
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <Bell className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p>No new alerts right now</p>
            </div>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 flex items-start space-x-3"
              >
                <div className="p-2 rounded-xl bg-white dark:bg-slate-700 shadow-xs shrink-0">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                      {alert.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 shrink-0 ml-2">
                      {alert.timeAgo}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                    {alert.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              schoolStore.markAllNotificationsRead();
              onClose();
            }}
            className="text-xs font-medium text-blue-700 dark:text-blue-400 hover:underline px-2 py-1"
          >
            Mark all as read
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
