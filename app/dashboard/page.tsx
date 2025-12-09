'use client';

import { useEffect, useState } from 'react';
import Graph from '@/components/Graph';
import Alerts from '@/components/Alerts';
import { sensorSimulator, SensorData, Alert } from '@/lib/sensorSimulator';

export default function Dashboard() {
  const [currentData, setCurrentData] = useState<SensorData | null>(null);
  const [historicalData, setHistoricalData] = useState<SensorData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Generate initial data
    const initialData = sensorSimulator.generateHistoricalData(24, 15);
    setHistoricalData(initialData);
    
    const latest = initialData[initialData.length - 1];
    setCurrentData(latest);
    
    const initialAlerts = sensorSimulator.checkAlerts(latest);
    setAlerts(initialAlerts);

    // Update data every 5 seconds
    const interval = setInterval(() => {
      const newData = sensorSimulator.generateSensorData();
      setCurrentData(newData);
      
      // Add to historical data (keep last 24 hours)
      setHistoricalData(prev => {
        const updated = [...prev, newData];
        const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
        return updated.filter(d => d.timestamp >= oneDayAgo);
      });

      // Check for new alerts
      const newAlerts = sensorSimulator.checkAlerts(newData);
      setAlerts(prev => {
        const combined = [...prev, ...newAlerts];
        // Keep only last 50 alerts
        return combined.slice(-50);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  if (!currentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Real-time monitoring of your aquaculture operations</p>
        </div>

        {/* Current Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Energy</div>
            <div className="text-2xl font-bold text-gray-900">{currentData.energy.toFixed(2)} kWh</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Flow Rate</div>
            <div className="text-2xl font-bold text-gray-900">{currentData.flow.toFixed(1)} L/min</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Oxygen</div>
            <div className="text-2xl font-bold text-gray-900">{currentData.oxygen.toFixed(2)} mg/L</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Temperature</div>
            <div className="text-2xl font-bold text-gray-900">{currentData.temperature.toFixed(1)}°C</div>
          </div>
        </div>

        {/* Graphs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Graph
            title="Energy Consumption"
            data={historicalData}
            dataKey="energy"
            unit="kWh"
            color="primary"
          />
          <Graph
            title="Water Flow"
            data={historicalData}
            dataKey="flow"
            unit="L/min"
            color="blue"
          />
          <Graph
            title="Oxygen Level"
            data={historicalData}
            dataKey="oxygen"
            unit="mg/L"
            color="green"
          />
          <Graph
            title="Temperature"
            data={historicalData}
            dataKey="temperature"
            unit="°C"
            color="orange"
          />
        </div>

        {/* Alerts */}
        <div className="mb-8">
          <Alerts alerts={alerts} />
        </div>
      </div>
    </div>
  );
}


