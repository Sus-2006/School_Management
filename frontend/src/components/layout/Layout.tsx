import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { NavigationDrawer } from './NavigationDrawer';
import { apiService } from '../../services/apiService';
import type { StudentProfile } from '../../types';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [student, setStudent] = useState<StudentProfile | null>(null);

  useEffect(() => {
    apiService.getStudentProfile().then((data) => {
      setStudent(data);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-200">
      {/* Top Navigation Header */}
      <Header
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        student={student}
      />

      {/* Main Body Layout (Sidebar + Page Container) */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Navigation Sidebar Drawer */}
        <NavigationDrawer
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};
