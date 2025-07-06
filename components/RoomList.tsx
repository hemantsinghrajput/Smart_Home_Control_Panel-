import React, { useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';
import RoomCard from './RoomCard';
import { rooms } from '../data/rooms';

export default function RoomList(): React.JSX.Element {
  const context = useContext(AppContext);
  if (!context) throw new Error('RoomList must be used within AppProvider');
  
  const { selectedRoomId, setSelectedRoomId } = context;

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      nestedScrollEnabled={true}
    >
      {rooms.map(room => (
        <RoomCard
          key={room.id}
          room={room}
          isSelected={selectedRoomId === room.id}
          onPress={() => setSelectedRoomId(room.id)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
    paddingBottom: 0,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 0,
    paddingTop: 0,
  },
}); 