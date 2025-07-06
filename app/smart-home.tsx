import React, { useContext } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Dashboard from '../components/Dashboard';
import RoomList from '../components/RoomList';
import DeviceGrid from '../components/DeviceGrid';
import { AppContext } from '../context/AppContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SmartHomeScreen() {
  const { theme } = useContext(AppContext)!;
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#181A20' : '#F5F6FA', paddingTop:insets.top,paddingBottom:insets.bottom }] }>
      <ScrollView 
        style={[styles.scrollView, { backgroundColor: isDark ? '#181A20' : '#F5F6FA' }]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.contentContainer, { backgroundColor: isDark ? '#181A20' : '#F5F6FA' }]}
      >
        <Dashboard />
        <RoomList />
        <DeviceGrid />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 0,
  },
}); 