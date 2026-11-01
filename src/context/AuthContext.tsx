import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserRole, AuthUser, StudentProfile } from '../types';
import { MOCK_USERS, schoolStore } from '../data/mockData';

interface AuthContextType {
  user: AuthUser | null;
  role: UserRole;
  isAuthenticated: boolean;
  selectedChildId: string;
  activeChild: StudentProfile | null;
  setSelectedChildId: (id: string) => void;
  login: (role: UserRole, loginId?: string, password?: string) => boolean;
  loginWithOtp: (role: UserRole, phone?: string) => boolean;
  switchRole: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to parent or admin for demo, or read from localStorage
  const [role, setRole] = useState<UserRole>(() => {
    return (localStorage.getItem('lms_current_role') as UserRole) || 'admin';
  });

  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedRole = (localStorage.getItem('lms_current_role') as UserRole) || 'admin';
    return MOCK_USERS.find((u) => u.role === savedRole) || MOCK_USERS[0];
  });

  const [selectedChildId, setSelectedChildId] = useState<string>('STU-001');

  useEffect(() => {
    if (role) {
      localStorage.setItem('lms_current_role', role);
      const matched = MOCK_USERS.find((u) => u.role === role);
      if (matched) {
        setUser(matched);
        if (matched.linkedStudentId) {
          setSelectedChildId(matched.linkedStudentId);
        }
      }
    }
  }, [role]);

  const activeChild = schoolStore.getStudentById(selectedChildId) || schoolStore.getStudents()[0] || null;

  const login = (selectedRole: UserRole, _loginId?: string, _password?: string): boolean => {
    setRole(selectedRole);
    const matched = MOCK_USERS.find((u) => u.role === selectedRole);
    if (matched) {
      setUser(matched);
      if (matched.linkedStudentId) {
        setSelectedChildId(matched.linkedStudentId);
      }
    }
    return true;
  };

  const loginWithOtp = (selectedRole: UserRole, _phone?: string): boolean => {
    return login(selectedRole);
  };

  const switchRole = (newRole: UserRole) => {
    login(newRole);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lms_current_role');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        selectedChildId,
        activeChild,
        setSelectedChildId,
        login,
        loginWithOtp,
        switchRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
