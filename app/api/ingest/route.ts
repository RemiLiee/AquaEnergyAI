import { NextRequest, NextResponse } from 'next/server';

interface SensorReading {
  id: string;
  type: string;
  value: number;
  unit: string;
}

interface IngestRequest {
  gateway_id: string;
  timestamp: string | number;
  sensors: SensorReading[];
}

export async function POST(request: NextRequest) {
  try {
    const body: IngestRequest = await request.json();
    
    // Validate incoming data structure
    if (!body.gateway_id || !body.timestamp || !body.sensors || !Array.isArray(body.sensors)) {
      return NextResponse.json(
        { error: 'Invalid sensor data format. Expected: { gateway_id, timestamp, sensors[] }' },
        { status: 400 }
      );
    }

    // Log the incoming data (in production, this would be stored in a database)
    console.log('Sensor data ingested:', {
      gateway_id: body.gateway_id,
      timestamp: body.timestamp,
      sensor_count: body.sensors.length,
      sensors: body.sensors,
    });

    // In a real app, you would:
    // 1. Validate API key from headers
    // 2. Store data in database
    // 3. Process alerts based on sensor values
    // 4. Trigger notifications if needed
    // 5. Update analytics

    return NextResponse.json({
      status: 'ok',
      message: 'Data ingested successfully',
      gateway_id: body.gateway_id,
      timestamp: Date.now(),
      sensors_received: body.sensors.length,
    });
  } catch (error) {
    console.error('Error ingesting sensor data:', error);
    return NextResponse.json(
      { error: 'Failed to ingest sensor data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return mock data for testing
  const mockData = sensorSimulator.generateSensorData();
  const alerts = sensorSimulator.checkAlerts(mockData);

  return NextResponse.json({
    success: true,
    data: mockData,
    alerts: alerts,
    message: 'Mock sensor data generated',
  });
}

