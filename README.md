# Smart Home Control Panel

A modern React Native mobile application for controlling smart home devices. Built with Expo, featuring a clean UI with real-time weather data, room-based device management, and persistent state.

## Features

### 🏠 Dashboard
- **Dynamic Greeting**: Shows "Good Morning", "Good Afternoon", or "Good Evening" based on current time
- **Live Weather**: Fetches and displays current temperature and weather conditions from OpenWeatherMap API
- **Energy Usage**: Shows mock energy consumption data
- **Temperature Toggle**: Switch between Celsius (°C) and Fahrenheit (°F)

### 🏘️ Rooms
- **Horizontal Scrolling**: Smooth horizontal list of rooms (Living Room, Bedroom, Kitchen)
- **Active Device Count**: Shows number of active devices in each room
- **Visual Selection**: Selected room is highlighted with a blue border
- **Room Cards**: Each room displays with name and device count

### 🔌 Devices
- **Grid Layout**: 2-column grid of devices for the selected room
- **Device Types**: Smart Lights, Air Conditioners, TVs, Fridges
- **Toggle Controls**: On/off switches for each device
- **Live Readings**: Shows brightness for lights, temperature for AC/fridge
- **Visual Feedback**: Active devices have blue border and background

### 💾 State Management
- **Persistent Storage**: Device states saved to AsyncStorage
- **Context API**: Global state management for room selection and device states
- **Real-time Updates**: Immediate UI updates when toggling devices

## Tech Stack

- **Framework**: React Native with Expo
- **State Management**: React Context API
- **Storage**: AsyncStorage for persistence
- **UI**: React Native Paper components
- **API**: OpenWeatherMap for weather data
- **Styling**: StyleSheet for custom styling

## Project Structure

```
frontend/
├── app/
│   ├── (tabs)/
│   │   └── index.tsx          # Redirects to Smart Home
│   ├── _layout.tsx            # Root layout
│   └── smart-home.tsx         # Main Smart Home screen
├── components/
│   ├── Dashboard.js           # Weather, greeting, energy usage
│   ├── RoomList.js            # Horizontal room selection
│   ├── RoomCard.js            # Individual room card
│   ├── DeviceGrid.js          # Grid of devices
│   └── DeviceCard.js          # Individual device card
├── context/
│   └── AppContext.js          # Global state management
├── data/
│   ├── rooms.json             # Mock room data
│   └── devices.json           # Mock device data
├── utils/
│   ├── timeUtils.js           # Greeting logic
│   ├── weatherApi.js          # Weather API integration
│   └── storage.js             # AsyncStorage helpers
└── assets/
    └── images/                # Room background images
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: `npm install -g @expo/cli`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Weather API**
   - Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
   - Replace `YOUR_OPENWEATHERMAP_API_KEY` in `utils/weatherApi.js`

4. **Run the app**
   ```bash
   npm start
   ```

### Running on Different Platforms

- **iOS Simulator**: Press `i` in the terminal or scan QR code with Expo Go app
- **Android Emulator**: Press `a` in the terminal or scan QR code with Expo Go app
- **Web**: Press `w` in the terminal
- **Physical Device**: Scan QR code with Expo Go app

## API Configuration

### OpenWeatherMap API
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your free API key
3. Update `utils/weatherApi.js`:
   ```javascript
   const API_KEY = 'your_actual_api_key_here';
   ```

## Features in Detail

### Dynamic Greeting
- Automatically detects current time
- Shows appropriate greeting: "Good Morning" (5 AM - 12 PM), "Good Afternoon" (12 PM - 6 PM), "Good Evening" (6 PM - 5 AM)

### Weather Integration
- Fetches real-time weather data
- Displays current temperature and weather condition
- Supports both Celsius and Fahrenheit
- Graceful error handling for API failures

### Device Management
- **Smart Lights**: Toggle on/off, shows brightness percentage
- **Air Conditioners**: Toggle on/off, shows temperature setting
- **Smart TV**: Simple on/off toggle
- **Smart Fridge**: Toggle on/off, shows internal temperature

### State Persistence
- Device states automatically saved to device storage
- App remembers settings between sessions
- Temperature unit preference persisted

## Customization

### Adding New Rooms
1. Update `data/rooms.json` with new room data
2. Add corresponding device entries in `data/devices.json`

### Adding New Device Types
1. Add device data to `data/devices.json`
2. Update `DeviceCard.js` with new icon mapping
3. Add live reading logic if needed

### Styling
- Modify component styles in respective `.js` files
- Update colors, spacing, and layout as needed
- Add animations using React Native's Animated API

## Troubleshooting

### Common Issues

1. **Weather API not working**
   - Check API key is correctly set
   - Verify internet connection
   - Check API quota limits

2. **App not loading**
   - Clear Expo cache: `expo start -c`
   - Restart development server

3. **Device states not persisting**
   - Check AsyncStorage permissions
   - Verify device storage space

## Future Enhancements

- [ ] Add room background images
- [ ] Implement device grouping
- [ ] Add scheduling functionality
- [ ] Real-time device status updates
- [ ] Voice control integration
- [ ] Energy usage analytics
- [ ] Device automation rules

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

---

**Note**: This is a demo application with mock data. In a production environment, you would integrate with real smart home APIs and implement proper security measures.
