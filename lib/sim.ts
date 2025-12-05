// Dummy sensor data simulator - simplified version

export interface DummySensorData {
  energy: number; // kWh (100-300)
  flow: number; // m3/h (20-40)
  o2: number; // % (85-100)
  temp: number; // °C (8-14)
  vibration: number; // (0.5-1.5)
  timestamp: number;
}

export function getDummySensorData(): DummySensorData {
  return {
    energy: Math.random() * 200 + 100, // 100-300
    flow: Math.random() * 20 + 20, // 20-40
    o2: Math.random() * 15 + 85, // 85-100
    temp: Math.random() * 6 + 8, // 8-14
    vibration: Math.random() * 1 + 0.5, // 0.5-1.5
    timestamp: Date.now(),
  };
}
