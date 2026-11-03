import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  BellRing,
  UserCheck,
  GraduationCap,
  FileSpreadsheet,
  PhoneCall,
  User,
  ChevronDown,
  ChevronRight,
  X,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { t } = useLanguage();

  // State to track expanded sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'student-info': false,
    'academics': false,
    'examination': false
  });

  const toggleExpand = (key: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const navItems = [
    {
      title: t('homeDashboard'),
      path: '/',
      icon: LayoutDashboard
    },
    {
      title: t('attendance'),
      path: '/attendance',
      icon: UserCheck
    },
    {
      title: t('schoolRoutine'),
      path: '/calendar',
      icon: CalendarDays
    },
    {
      title: t('importantNotices'),
      path: '/notices',
      icon: BellRing
    },
    {
      title: t('studentInfo'),
      path: '/student-info',
      icon: User,
      expandable: true,
      subItems: [
        { title: 'Personal Profile', desc: 'Demo Info' },
        { title: 'Guardian Details', desc: 'Contact' },
        { title: 'Future Expandable Items', desc: 'Placeholder' }
      ]
    },
    {
      title: t('academics'),
      path: '/academics',
      icon: GraduationCap,
      expandable: true,
      subItems: [
        { title: 'Subjects & Syllabus', desc: 'Class 8' },
        { title: 'Learning Material', desc: 'Future LMS' },
        { title: 'Assignments', desc: 'Future LMS' }
      ]
    },
    {
      title: t('examination'),
      path: '/examination',
      icon: FileSpreadsheet,
      expandable: true,
      subItems: [
        { title: 'Exam Timetable', desc: 'Term 1' },
        { title: 'Syllabus Coverage', desc: 'Exam Topics' },
        { title: 'Report Card', desc: 'Future Results' }
      ]
    },
    {
      title: t('contactUs'),
      path: '/contact',
      icon: PhoneCall
    }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Drawer Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-[var(--bg-card)] border-r border-[var(--border-color)] flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header (Mobile Close button) */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)] lg:hidden">
          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-[var(--text-primary)]">
              Navigation Menu
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-main)]"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* School Category Header */}
        <div className="p-5 pb-3 hidden lg:block">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Student LMS Navigation
          </p>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const sectionKey = item.path.replace('/', '');
            const isExpanded = expandedSections[sectionKey];

            return (
              <div key={item.path} className="space-y-1">
                <div className="flex items-center">
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex-1 flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                        isActive
                          ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold border border-sky-500/20'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-main)]'
                      }`
                    }
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        isActive
                          ? 'text-sky-500'
                          : 'text-[var(--text-muted)] group-hover:text-[var(--text-primary)]'
                      }`}
                    />
                    <span className="flex-1">{item.title}</span>
                  </NavLink>

                  {item.expandable && (
                    <button
                      onClick={(e) => toggleExpand(sectionKey, e)}
                      className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-lg transition-colors"
                      title={`Toggle ${item.title} submenus`}
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>

                {/* Submenu Expansion (Architecture ready for future LMS sections) */}
                {item.expandable && isExpanded && (
                  <div className="ml-8 pl-3 border-l-2 border-[var(--border-color)] space-y-1 py-1">
                    {item.subItems?.map((sub, idx) => (
                      <NavLink
                        key={idx}
                        to={item.path}
                        onClick={onClose}
                        className="block px-3 py-1.5 text-xs rounded-lg text-[var(--text-secondary)] hover:text-sky-500 hover:bg-[var(--bg-main)] transition-colors"
                      >
                        <div className="font-medium">{sub.title}</div>
                        <div className="text-[10px] text-[var(--text-muted)]">{sub.desc}</div>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Low-Bandwidth & Future Expansion Note */}
        <div className="p-4 border-t border-[var(--border-color)] m-3 rounded-xl bg-[var(--bg-main)]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('prototypeNote')}</span>
          </div>
          <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
            {t('prototypeDesc')}
          </p>
        </div>
      </aside>
    </>
  );
};
