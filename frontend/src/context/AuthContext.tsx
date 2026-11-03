import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from 'firebase/auth';

import { auth } from '../firebase';
import type { UserRole, AuthUser, StudentProfile } from '../types';
import { schoolStore } from '../data/mockData';

interface AuthContextType {
  user: AuthUser | null;
  role: UserRole;
  isAuthenticated: boolean;
  selectedChildId: string;
  activeChild: StudentProfile | null;
  setSelectedChildId: (id: string) => void;
  login: (
    role: UserRole,
    loginId?: string,
    password?: string
  ) => Promise<boolean>;
  loginWithOtp: (role: UserRole, phone?: string) => Promise<boolean>;
  switchRole: (role: UserRole) => void;
  logout: () => Promise<void>;
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [role, setRole] = useState<UserRole>('parent');
  const [user, setUser] = useState<AuthUser | null>(null);
  const [selectedChildId, setSelectedChildId] = useState<string>('STU-001');

  const activeChild =
    schoolStore.getStudentById(selectedChildId) ||
    schoolStore.getStudents()[0] ||
    null;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser: FirebaseUser | null) => {
        if (!firebaseUser) {
          setUser(null);
          return;
        }

        try {
          const idToken = await firebaseUser.getIdToken();

          const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to load school user profile');
          }

          const result = await response.json();
          const backendUser = result.data;

          const backendRole = String(
            backendUser.role,
          ).toLowerCase() as UserRole;

          const authUser: AuthUser = {
            id: backendUser.id,
            role: backendRole,
            loginId: backendUser.loginId,
            name: backendUser.name || firebaseUser.displayName || 'User',
            schoolName: backendUser.schoolName || '[School Name]',
            email: backendUser.email || firebaseUser.email || undefined,
            phone: backendUser.phone,
            avatar: backendUser.avatar,
            linkedStudentId: backendUser.linkedStudentId,
            childrenIds: backendUser.childrenIds,
            teacherId: backendUser.teacherId,
          };

          setUser(authUser);
          setRole(backendRole);

          if (authUser.linkedStudentId) {
            setSelectedChildId(authUser.linkedStudentId);
          }

          localStorage.setItem('lms_current_role', backendRole);
        } catch (error) {
          console.error('Failed to load backend user:', error);
          await signOut(auth);
          setUser(null);
        }
      },
    );

    return () => unsubscribe();
  }, []);

  const login = async (
    _selectedRole: UserRole,
    loginId?: string,
    password?: string,
  ): Promise<boolean> => {
    if (!loginId || !password) {
      return false;
    }

    try {
      const email = loginId.includes('@')
        ? loginId
        : loginId;

      await signInWithEmailAndPassword(auth, email, password);

      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const loginWithOtp = async (
    _selectedRole: UserRole,
    _phone?: string,
  ): Promise<boolean> => {
    console.warn('OTP login is not connected yet.');
    return false;
  };

  const switchRole = (newRole: UserRole) => {
    console.warn(
      `Role switching is disabled because roles now come from the backend: ${newRole}`,
    );
  };

  const logout = async () => {
    await signOut(auth);
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