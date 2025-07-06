export interface Room {
  id: string;
  name: string;
  deviceIds: string[];
}

export const rooms: Room[] = [
  {
    id: "living-room",
    name: "Living Room",
    deviceIds: ["light-1", "ac-1", "tv-1"]
  },
  {
    id: "bedroom",
    name: "Bedroom",
    deviceIds: ["light-2", "ac-2"]
  },
  {
    id: "kitchen",
    name: "Kitchen",
    deviceIds: ["light-3", "fridge-1"]
  }
];

export default rooms; 