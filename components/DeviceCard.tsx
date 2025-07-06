import React, { useContext } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { AppContext } from '../context/AppContext';
import { Device } from '../data/devices';

interface DeviceCardProps {
  device: Device;
}

export default function DeviceCard({ device }: DeviceCardProps): React.JSX.Element {
  const context = useContext(AppContext);
  if (!context) throw new Error('DeviceCard must be used within AppProvider');
  const { deviceStates, setDeviceStates, temperatureUnit, theme } = context;
  const isDark = theme === 'dark';
  
  // Get current device state (saved or default)
  const currentState = deviceStates[device.id] || device.state;
  const isOn = currentState.on;

  const handleToggle = (value: boolean) => {
    setDeviceStates(prev => ({
      ...prev,
      [device.id]: {
        ...currentState,
        on: value
      }
    }));
  };

  const getDeviceIcon = (): string => {
    // Enhanced emoji icons for better visual appeal
    const icons: Record<string, string> = {
      'lightbulb-on-outline': isOn ? '💡' : '💡',
      'air-conditioner': isOn ? '❄️' : '❄️',
      'television': isOn ? '📺' : '📺',
      'lamp': isOn ? '🕯️' : '🕯️',
      'fridge-outline': isOn ? '🧊' : '🧊'
    };
    return icons[device.icon] || '🔌';
  };

  const getLiveReading = (): string | null => {
    if (!isOn) return null;
    
    if (device.type === 'light' && currentState.brightness) {
      return `${currentState.brightness}%`;
    }
    if (device.type === 'ac' && currentState.temperature) {
      return `${currentState.temperature}°${temperatureUnit}`;
    }
    if (device.type === 'fridge' && currentState.temperature) {
      return `${currentState.temperature}°${temperatureUnit}`;
    }
    return null;
  };

  const getDeviceColor = (): string => {
    if (!isOn) return isDark ? '#23242A' : '#fff';
    const colors: Record<string, string> = {
      'light': isDark ? '#35363C' : '#F7E9B7',
      'ac': isDark ? '#2A2D3A' : '#D6E6F2',
      'tv': isDark ? '#2A2D3A' : '#D6F2E6',
      'fridge': isDark ? '#35363C' : '#F2F2F2'
    };
    return colors[device.type] || (isDark ? '#23242A' : '#fff');
  };

  return (
    <View style={[styles.card, { backgroundColor: getDeviceColor(), borderColor: isDark ? '#23242A' : '#eee' }, isOn && styles.activeCard]}>
      <View style={styles.header}>
        <Text style={[styles.icon, isOn && styles.activeIcon, { color: isDark ? '#fff' : '#181A20' }]}>{getDeviceIcon()}</Text>
        <Switch
          value={isOn}
          onValueChange={handleToggle}
          trackColor={{ false: '#767577', true: '#007AFF' }}
          thumbColor={isOn ? (isDark ? '#fff' : '#181A20') : (isDark ? '#23242A' : '#fff')}
        />
      </View>
      
      <Text style={[styles.deviceName, { color: isDark ? '#fff' : '#181A20' }]}>{device.name}</Text>
      
      {getLiveReading() && (
        <Text style={styles.liveReading}>{getLiveReading()}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
  },
  activeCard: {
    borderColor: '#007AFF',
    elevation: 5,
    shadowOpacity: 0.2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 28,
    opacity: 0.7,
  },
  activeIcon: {
    opacity: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  liveReading: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
}); 