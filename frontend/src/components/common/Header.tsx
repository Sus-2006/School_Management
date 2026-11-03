import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ArrowLeft, LogOut, RefreshCw, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { NotificationsModal } from './NotificationsModal';
import { schoolStore } from '../../data/mockData';
import type { UserRole } from '../../types';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  stepIndicator?: string; // e.g. "Step 1 of 4"
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack,
  onBack,
  stepIndicator,
}) => {
  const { role, user, selectedChildId, setSelectedChildId, switchRole, logout } = useAuth();
  const navigate = useNavigate();
  const [showChildMenu, setShowChildMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);

  const activeChild = schoolStore.getStudentById(selectedChildId);
  const parentChildren = user?.childrenIds
    ? user.childrenIds.map((id) => schoolStore.getStudentById(id)).filter(Boolean)
    : [activeChild].filter(Boolean);

  const unreadAlerts = schoolStore.getNotifications(role).filter((n) => !n.read).length;

  const handleRoleChange = (newRole: UserRole) => {
    switchRole(newRole);
    setShowRoleMenu(false);
    navigate(`/${newRole}`);
  };

  return (
    <>
      <header className="bg-[#1e4ed8] text-white px-5 pt-4 pb-4 sticky top-0 z-30 shadow-md">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {showBack && (
              <button
                onClick={onBack || (() => navigate(-1))}
                className="p-1 -ml-1.5 rounded-full hover:bg-white/10 active:bg-white/20 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
            )}

            <div>
              {/* Step indicator or Subtitle / Role Tag */}
              {stepIndicator ? (
                <p className="text-xs font-normal text-blue-200 tracking-wide">{stepIndicator}</p>
              ) : subtitle ? (
                <p className="text-xs font-normal text-blue-200 tracking-wide">{subtitle}</p>
              ) : role === 'admin' ? (
                <p className="text-xs font-normal text-blue-200 tracking-wide">Admin</p>
              ) : role === 'teacher' ? (
                <p className="text-xs font-normal text-blue-200 tracking-wide">Teacher</p>
              ) : role === 'parent' ? (
                <p className="text-xs font-normal text-blue-200 tracking-wide">Parent</p>
              ) : role === 'student' ? (
                <p className="text-xs font-normal text-blue-200 tracking-wide">
                  {activeChild ? `${activeChild.className} • Roll ${activeChild.rollNo}` : 'Class 8-A'}
                </p>
              ) : null}

              {/* Title / Child Dropdown */}
              {role === 'parent' && !title ? (
                <div className="relative">
                  <button
                    onClick={() => setShowChildMenu(!showChildMenu)}
                    className="flex items-center space-x-1.5 font-bold text-xl text-white tracking-tight hover:opacity-90 active:opacity-75 transition-opacity"
                  >
                    <span>{activeChild ? activeChild.name : 'Child name'}</span>
                    <ChevronDown className="w-4 h-4 ml-0.5 text-blue-200" />
                  </button>

                  {showChildMenu && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl py-2 z-50 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-700 animate-in fade-in duration-150">
                      <p className="px-4 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Select Child
                      </p>
                      {parentChildren.map((child) => child && (
                        <button
                          key={child.id}
                          onClick={() => {
                            setSelectedChildId(child.id);
                            setShowChildMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-blue-50 dark:hover:bg-slate-700 ${
                            child.id === selectedChildId ? 'font-bold text-blue-700 dark:text-blue-400' : ''
                          }`}
                        >
                          <div>
                            <p className="font-medium">{child.name}</p>
                            <p className="text-xs text-slate-500">{child.className}</p>
                          </div>
                          {child.id === selectedChildId && (
                            <span className="w-2 h-2 rounded-full bg-blue-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : role === 'student' && !title ? (
                <h1 className="font-bold text-xl text-white tracking-tight">
                  Hi, {user ? user.name.split(' ')[0] : 'Student name'}
                </h1>
              ) : (
                <h1 className="font-bold text-xl text-white tracking-tight">
                  {title || (user?.schoolName ? '[School Name]' : '[School Name]')}
                </h1>
              )}
            </div>
          </div>

          {/* Right Action Icons: Alerts circular button matching screenshot & Quick Role Switcher */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAlerts(true)}
              className="relative w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 active:scale-95 text-white flex items-center justify-center font-medium text-xs shadow-inner transition-all"
              title="Alerts"
            >
              <span className="text-[12px] font-semibold">Alerts</span>
              {unreadAlerts > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-blue-700">
                  {unreadAlerts}
                </span>
              )}
            </button>

            {/* Role switch / account menu */}
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="p-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                title="Switch Role / Profile"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              {showRoleMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl py-2 z-50 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-150">
                  <p className="px-4 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Switch Active Role
                  </p>
                  {(['admin', 'teacher', 'parent', 'student'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => handleRoleChange(r)}
                      className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-blue-50 dark:hover:bg-slate-700 capitalize ${
                        role === r ? 'font-bold text-blue-700 dark:text-blue-400 bg-blue-50/50' : ''
                      }`}
                    >
                      <span>{r}</span>
                      {role === r && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                    </button>
                  ))}
                  <div className="border-t border-slate-100 dark:border-slate-700 my-1" />
                  <button
                    onClick={() => {
                      logout();
                      setShowRoleMenu(false);
                      navigate('/login');
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-red-600 dark:text-red-400 flex items-center space-x-2 hover:bg-red-50 dark:hover:bg-red-950/20"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <NotificationsModal isOpen={showAlerts} onClose={() => setShowAlerts(false)} />
    </>
  );
};
