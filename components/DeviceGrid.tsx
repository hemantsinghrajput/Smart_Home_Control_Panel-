import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';
import DeviceCard from './DeviceCard';
import { devices } from '../data/devices';

export default function DeviceGrid(): React.JSX.Element {
  const context = useContext(AppContext);
  if (!context) throw new Error('DeviceGrid must be used within AppProvider');
  
  const { selectedRoomId } = context;
  
  // Filter devices for the selected room
  const roomDevices = devices.filter(device => device.roomId === selectedRoomId);

  // Group devices into rows of 2
  const deviceRows = [];
  for (let i = 0; i < roomDevices.length; i += 2) {
    deviceRows.push(roomDevices.slice(i, i + 2));
  }

  return (
    <View style={styles.container}>
      {deviceRows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map(device => (
            <DeviceCard key={device.id} device={device} />
          ))}
          {row.length === 1 && <View style={styles.emptySpace} />}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginTop: 0,
    paddingTop: 20,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  emptySpace: {
    width: '48%',
  },
}); 