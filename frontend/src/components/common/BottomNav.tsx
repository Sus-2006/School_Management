import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Users,
  Briefcase,
  Bus,
  Grid,
  CalendarCheck,
  Award,
  MessageSquare,
  User,
  Clock,
  BookOpen,
  DollarSign,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types';

interface NavItem {
  key: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const BottomNav: React.FC = () => {
  const { role } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const getNavItems = (userRole: UserRole): NavItem[] => {
    switch (userRole) {
      case 'admin':
        return [
          { key: 'home', label: 'Home', path: '/admin', icon: Home },
          { key: 'students', label: 'Students', path: '/admin/students', icon: Users },
          { key: 'staff', label: 'Staff', path: '/admin/staff', icon: Briefcase },
          { key: 'transport', label: 'Transport', path: '/admin/transport', icon: Bus },
          { key: 'more', label: 'More', path: '/admin/more', icon: Grid },
        ];
      case 'teacher':
        return [
          { key: 'home', label: 'Home', path: '/teacher', icon: Home },
          { key: 'attendance', label: 'Attendance', path: '/teacher/attendance', icon: CalendarCheck },
          { key: 'marks', label: 'Marks', path: '/teacher/marks', icon: Award },
          { key: 'messages', label: 'Messages', path: '/teacher/messages', icon: MessageSquare },
          { key: 'profile', label: 'Profile', path: '/teacher/profile', icon: User },
        ];
      case 'parent':
        return [
          { key: 'home', label: 'Home', path: '/parent', icon: Home },
          { key: 'child', label: 'Child', path: '/parent/child', icon: User },
          { key: 'bus', label: 'Bus', path: '/parent/bus', icon: Bus },
          { key: 'fees', label: 'Fees', path: '/parent/fees', icon: DollarSign },
          { key: 'messages', label: 'Messages', path: '/parent/messages', icon: MessageSquare },
        ];
      case 'student':
        return [
          { key: 'home', label: 'Home', path: '/student', icon: Home },
          { key: 'timetable', label: 'Timetable', path: '/student/timetable', icon: Clock },
          { key: 'homework', label: 'Homework', path: '/student/homework', icon: BookOpen },
          { key: 'results', label: 'Results', path: '/student/results', icon: Award },
          { key: 'me', label: 'Me', path: '/student/profile', icon: User },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems(role);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-lg">
      <div className="max-w-md mx-auto grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.key}
              onClick={() => navigate(item.path)}
              className={`relative flex flex-col items-center justify-center transition-colors ${
                isActive
                  ? 'text-blue-700 dark:text-blue-400 font-semibold'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-blue-700 dark:bg-blue-400 rounded-full" />
              )}
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className="text-[11px] leading-tight tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
