import React, { createContext, useState, ReactNode } from 'react';
import { DeviceState } from '../data/devices';

export interface AppContextType {
  selectedRoomId: string;
  setSelectedRoomId: (id: string) => void;
  deviceStates: Record<string, DeviceState>;
  setDeviceStates: React.Dispatch<React.SetStateAction<Record<string, DeviceState>>>;
  temperatureUnit: 'C' | 'F';
  setTemperatureUnit: (unit: 'C' | 'F') => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>('living-room');
  const [deviceStates, setDeviceStates] = useState<Record<string, DeviceState>>({});
  const [temperatureUnit, setTemperatureUnit] = useState<'C' | 'F'>('C');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <AppContext.Provider value={{
      selectedRoomId,
      setSelectedRoomId,
      deviceStates,
      setDeviceStates,
      temperatureUnit,
      setTemperatureUnit,
      theme,
      toggleTheme
    }}>
      {children}
    </AppContext.Provider>
  );
}; 