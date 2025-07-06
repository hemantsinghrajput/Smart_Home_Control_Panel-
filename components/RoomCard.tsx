import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { AppContext } from '../context/AppContext';
import { devices } from '../data/devices';
import { Room } from '../data/rooms';

interface RoomCardProps {
  room: Room;
  isSelected: boolean;
  onPress: () => void;
}

export default function RoomCard({ room, isSelected, onPress }: RoomCardProps): React.JSX.Element {
  const context = useContext(AppContext);
  if (!context) throw new Error('RoomCard must be used within AppProvider');
  const { deviceStates, theme } = context;
  const isDark = theme === 'dark';
  
  // Count active devices in this room
  const activeDevices = devices
    .filter(device => device.roomId === room.id)
    .filter(device => {
      const savedState = deviceStates[device.id];
      return savedState ? savedState.on : device.state.on;
    }).length;

  // Get the correct image for each room
  const getRoomImage = () => {
    switch (room.id) {
      case 'living-room':
        return require('../assets/images/rooms/living-room.jpg');
      case 'bedroom':
        return require('../assets/images/rooms/bedroom.jpg');
      case 'kitchen':
        return require('../assets/images/rooms/kitchen.jpg');
      default:
        return require('../assets/images/rooms/living-room.jpg');
    }
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard, { backgroundColor: isDark ? '#23242A' : '#fff' }]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <ImageBackground
          source={getRoomImage()}
          style={styles.background}
          imageStyle={styles.backgroundImage}
        >
          <View style={[styles.overlay, { backgroundColor: isDark ? 'rgba(24,26,32,0.55)' : 'rgba(255,255,255,0.55)' }]} />
          <View style={styles.content}>
            <Text style={[styles.roomName, isDark ? styles.roomNameDark : styles.roomNameLight]}>{room.name}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <Text style={[styles.deviceCountLabel, isDark ? styles.deviceCountDark : styles.deviceCountLight]}>
        {activeDevices} active device{activeDevices !== 1 ? 's' : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    width: 120,
    marginRight: 12,
  },
  card: {
    width: 120,
    height: 80,
    borderRadius: 16,
    overflow: 'hidden',
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    borderRadius: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  roomName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  roomNameDark: {
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  roomNameLight: {
    color: '#181A20',
    textShadowColor: 'rgba(255,255,255,0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 0.5,
  },
  deviceCountLabel: {
    fontSize: 12,
    marginTop: 6,
    marginBottom: 2,
    textAlign: 'center',
  },
  deviceCountDark: {
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  deviceCountLight: {
    color: '#007AFF',
    fontWeight: 'bold',
    textShadowColor: 'rgba(255,255,255,0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 0.2,
  },
}); 