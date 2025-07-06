import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Modal, ScrollView } from 'react-native';
import { AppContext } from '../context/AppContext';
import { getGreeting } from '../utils/timeUtils';
import { getWeather, POPULAR_CITIES } from '../utils/weatherApi';
import { Ionicons } from '@expo/vector-icons';

export default function Dashboard() {
  const { temperatureUnit, setTemperatureUnit, theme, toggleTheme } = useContext(AppContext)!;
  const isDark = theme === 'dark';
  const [weather, setWeather] = useState({ 
    temp: '--', 
    condition: 'Loading...', 
    description: '',
    humidity: 0,
    windSpeed: 0,
    city: 'Delhi'
  });
  const [currentCity, setCurrentCity] = useState('Delhi');
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [showCitySelector, setShowCitySelector] = useState(false);

  const fetchWeatherForCity = async (city: string = 'Delhi') => {
    try {
      setIsLoadingWeather(true);
      const weatherData = await getWeather(city, temperatureUnit === 'C' ? 'metric' : 'imperial');
      setWeather({
        temp: String(weatherData.temp),
        condition: weatherData.condition,
        description: weatherData.description,
        humidity: weatherData.humidity,
        windSpeed: weatherData.windSpeed,
        city: weatherData.city
      });
    } catch (error) {
      console.error('Error fetching weather:', error);
      Alert.alert(
        'Weather Error',
        'Unable to fetch weather data. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoadingWeather(false);
    }
  };

  const handleCitySelect = (city: string) => {
    setShowCitySelector(false);
    setCurrentCity(city);
    fetchWeatherForCity(city);
  };

  useEffect(() => {
    // Fetch weather for current city when temperature unit changes
    fetchWeatherForCity(currentCity);
  }, [temperatureUnit]);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image
            source={require('../assets/images/rooms/bedroom.jpg')}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.greeting, { color: isDark ? '#ffffff' : '#1a1a1a' }]}>
              {getGreeting()}, Hemant
            </Text>
            <Text style={[styles.date, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
              {new Date().toLocaleDateString(undefined, { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={[styles.themeButton, { 
            backgroundColor: isDark ? '#374151' : '#f3f4f6',
            borderColor: isDark ? '#4b5563' : '#e5e7eb'
          }]} 
          onPress={toggleTheme}
        >
          <Ionicons 
            name={theme === 'dark' ? 'sunny-outline' : 'moon-outline'} 
            size={20} 
            color={isDark ? '#fbbf24' : '#6b7280'} 
          />
        </TouchableOpacity>
      </View>

      {/* Weather Section */}
      <View style={styles.weatherSection}>
        <View style={styles.weatherInfo}>
          <Text style={[styles.city, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
            {weather.city}
          </Text>
          <Text style={[styles.temperature, { color: isDark ? '#ffffff' : '#1a1a1a' }]}>
            {weather.temp}°{temperatureUnit}
          </Text>
          <Text style={[styles.condition, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
            {weather.description}
          </Text>
          <View style={styles.weatherDetails}>
            <View style={styles.weatherDetail}>
              <Ionicons 
                name="water-outline" 
                size={16} 
                color={isDark ? '#60a5fa' : '#3b82f6'} 
              />
              <Text style={[styles.detailText, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                {weather.humidity}%
              </Text>
            </View>
            <View style={styles.weatherDetail}>
              <Ionicons 
                name="speedometer-outline" 
                size={16} 
                color={isDark ? '#60a5fa' : '#3b82f6'} 
              />
              <Text style={[styles.detailText, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                {weather.windSpeed} {temperatureUnit === 'C' ? 'm/s' : 'mph'}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.weatherControls}>
          <TouchableOpacity
            style={[styles.locationButton, { 
              backgroundColor: isDark ? '#374151' : '#f3f4f6',
              borderColor: isDark ? '#4b5563' : '#e5e7eb'
            }]}
            onPress={() => setShowCitySelector(true)}
            disabled={isLoadingWeather}
          >
            <Ionicons 
              name={isLoadingWeather ? 'refresh' : 'location-outline'} 
              size={16} 
              color={isDark ? '#60a5fa' : '#3b82f6'} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.unitToggle, { 
              backgroundColor: isDark ? '#374151' : '#f3f4f6',
              borderColor: isDark ? '#4b5563' : '#e5e7eb'
            }]}
            onPress={() => setTemperatureUnit(temperatureUnit === 'C' ? 'F' : 'C')}
          >
            <Text style={[styles.unitText, { color: isDark ? '#d1d5db' : '#4b5563' }]}>
              °C / °F
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Energy Section */}
      <View style={styles.energySection}>
        <View style={styles.energyInfo}>
          <Ionicons 
            name="flash-outline" 
            size={20} 
            color={isDark ? '#fbbf24' : '#f59e0b'} 
            style={styles.energyIcon}
          />
          <Text style={[styles.energyLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
            Energy Usage
          </Text>
        </View>
        <Text style={[styles.energyValue, { color: isDark ? '#ffffff' : '#1a1a1a' }]}>
          2.3 kWh
        </Text>
      </View>

      {/* City Selector Modal */}
      <Modal
        visible={showCitySelector}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCitySelector(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)' }]}>
          <View style={[styles.modalContent, { 
            backgroundColor: isDark ? '#1f2937' : '#ffffff',
            borderColor: isDark ? '#374151' : '#e5e7eb'
          }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: isDark ? '#ffffff' : '#1a1a1a' }]}>
                Select City
              </Text>
              <TouchableOpacity onPress={() => setShowCitySelector(false)}>
                <Ionicons 
                  name="close" 
                  size={24} 
                  color={isDark ? '#9ca3af' : '#6b7280'} 
                />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.cityList}>
              {POPULAR_CITIES.map((city) => (
                <TouchableOpacity
                  key={city}
                  style={[styles.cityItem, { 
                    backgroundColor: isDark ? '#374151' : '#f9fafb',
                    borderColor: isDark ? '#4b5563' : '#e5e7eb'
                  }]}
                  onPress={() => handleCitySelect(city)}
                >
                  <Text style={[styles.cityItemText, { color: isDark ? '#ffffff' : '#1a1a1a' }]}>
                    {city}
                  </Text>
                  {currentCity === city && (
                    <Ionicons 
                      name="checkmark" 
                      size={20} 
                      color={isDark ? '#60a5fa' : '#3b82f6'} 
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    marginBottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  date: {
    fontSize: 15,
    fontWeight: '400',
  },
  themeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  weatherSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  weatherInfo: {
    flex: 1,
  },
  city: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  temperature: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: -1,
  },
  condition: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12,
  },
  weatherDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  weatherDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    fontWeight: '500',
  },
  weatherControls: {
    flexDirection: 'row',
    gap: 8,
  },
  locationButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  unitToggle: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  unitText: {
    fontSize: 14,
    fontWeight: '500',
  },
  energySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  energyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  energyIcon: {
    marginRight: 8,
  },
  energyLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  energyValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxHeight: '80%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  cityList: {
    maxHeight: 400,
  },
  cityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  cityItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 