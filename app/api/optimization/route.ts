import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/database';
import { optimizationEngine } from '@/lib/optimization';
import { maintenanceEngine } from '@/lib/maintenance';
import { sensorSimulator } from '@/lib/sensorSimulator';

// Mark as dynamic route (API routes are always dynamic)
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const gatewayId = searchParams.get('gateway_id');
    
    if (!gatewayId) {
      return NextResponse.json(
        { error: 'gateway_id parameter required' },
        { status: 400 }
      );
    }

    // Get last 24 hours of data
    const endTime = Date.now();
    const startTime = endTime - 24 * 60 * 60 * 1000;

    let readings = await database.getSensorReadings(gatewayId, startTime, endTime);
    
    // If no data in database, use fake/demo data
    let sensorData;
    if (readings.length === 0) {
      // Generate fake historical data for demo
      sensorData = sensorSimulator.generateHistoricalData(24, 15);
    } else {
      // Group readings by timestamp and convert to sensor data format
      const dataMap = new Map<number, any>();
      
      readings.forEach(reading => {
        if (!dataMap.has(reading.timestamp)) {
          dataMap.set(reading.timestamp, {
            timestamp: reading.timestamp,
            energy: 0,
            flow: 0,
            oxygen: 0,
            temperature: 0,
          });
        }
        
        const data = dataMap.get(reading.timestamp);
        if (reading.sensor_type === 'energy') data.energy = reading.value;
        if (reading.sensor_type === 'flow') data.flow = reading.value;
        if (reading.sensor_type === 'oxygen') data.oxygen = reading.value;
        if (reading.sensor_type === 'temperature') data.temperature = reading.value;
      });

      sensorData = Array.from(dataMap.values()).sort((a, b) => a.timestamp - b.timestamp);
    }

    // Run optimization analysis
    const analysis = optimizationEngine.analyzeEnergyConsumption(sensorData);
    const recommendations = optimizationEngine.generateRecommendations(
      sensorData[sensorData.length - 1],
      sensorData
    );

    // Get total savings history (use fake data if empty)
    let savingsHistory = await database.getEnergySavingsHistory(30);
    let totalSavings = await database.getTotalSavings();
    
    // If no savings data, generate fake demo data
    if (savingsHistory.length === 0) {
      savingsHistory = Array.from({ length: 7 }, (_, i) => {
        const baseConsumption = 220;
        const savings = 1500 + Math.random() * 500;
        return {
          date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString(),
          actualConsumption: baseConsumption + Math.random() * 20,
          optimizedConsumption: baseConsumption * 0.75 + Math.random() * 10,
          savings: savings / 100, // Convert to percentage
          savingsAmount: savings,
        };
      });
    }
    
    if (!totalSavings || totalSavings.totalAmount === 0) {
      totalSavings = {
        totalSavings: 25.5,
        totalAmount: 12500,
      };
    }

    // Run maintenance analysis
    const maintenanceAlerts = maintenanceEngine.analyzeMaintenance(sensorData);

    return NextResponse.json({
      success: true,
      analysis,
      recommendations,
      maintenanceAlerts,
      savingsHistory: savingsHistory.slice(-7), // Last 7 days
      totalSavings,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Error getting optimization data:', error);
    return NextResponse.json(
      { error: 'Failed to get optimization data' },
      { status: 500 }
    );
  }
}

