export interface DeviceState {
  on: boolean;
  brightness?: number;
  temperature?: number;
}

export interface Device {
  id: string;
  name: string;
  type: 'light' | 'ac' | 'tv' | 'fridge';
  icon: string;
  roomId: string;
  state: DeviceState;
}

export const devices: Device[] = [
  {
    id: "light-1",
    name: "Ceiling Light",
    type: "light",
    icon: "lightbulb-on-outline",
    roomId: "living-room",
    state: { on: true, brightness: 80 }
  },
  {
    id: "ac-1",
    name: "Air Conditioner",
    type: "ac",
    icon: "air-conditioner",
    roomId: "living-room",
    state: { on: false, temperature: 24 }
  },
  {
    id: "tv-1",
    name: "Smart TV",
    type: "tv",
    icon: "television",
    roomId: "living-room",
    state: { on: true }
  },
  {
    id: "light-2",
    name: "Bedside Lamp",
    type: "light",
    icon: "lamp",
    roomId: "bedroom",
    state: { on: false, brightness: 40 }
  },
  {
    id: "ac-2",
    name: "Bedroom AC",
    type: "ac",
    icon: "air-conditioner",
    roomId: "bedroom",
    state: { on: true, temperature: 22 }
  },
  {
    id: "light-3",
    name: "Kitchen Light",
    type: "light",
    icon: "lightbulb-on-outline",
    roomId: "kitchen",
    state: { on: true, brightness: 100 }
  },
  {
    id: "fridge-1",
    name: "Smart Fridge",
    type: "fridge",
    icon: "fridge-outline",
    roomId: "kitchen",
    state: { on: true, temperature: 4 }
  }
];

export default devices; 