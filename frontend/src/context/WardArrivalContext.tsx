import React, { createContext, useContext, useState, useEffect } from 'react';
import type { WardArrivalStatus } from '../types';
import { apiService } from '../services/apiService';

interface WardArrivalContextType {
  arrivalStatus: WardArrivalStatus | null;
  toggleArrivalState: () => void;
  isLoading: boolean;
}

const WardArrivalContext = createContext<WardArrivalContextType | undefined>(undefined);

export const WardArrivalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [arrivalStatus, setArrivalStatus] = useState<WardArrivalStatus | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    apiService.getWardArrivalStatus().then((data) => {
      setArrivalStatus(data);
      setIsLoading(false);
    });
  }, []);

  const toggleArrivalState = () => {
    if (!arrivalStatus) return;
    setArrivalStatus((prev) => {
      if (!prev) return null;
      if (prev.isArrived) {
        return {
          ...prev,
          isArrived: false,
          statusMessage: 'Student has not checked in today yet.',
          arrivalTime: '-- : --'
        };
      } else {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return {
          ...prev,
          isArrived: true,
          statusMessage: 'Your ward has arrived at school safely.',
          arrivalTime: timeStr
        };
      }
    });
  };

  return (
    <WardArrivalContext.Provider value={{ arrivalStatus, toggleArrivalState, isLoading }}>
      {children}
    </WardArrivalContext.Provider>
  );
};

export const useWardArrival = () => {
  const context = useContext(WardArrivalContext);
  if (!context) {
    throw new Error('useWardArrival must be used within a WardArrivalProvider');
  }
  return context;
};
