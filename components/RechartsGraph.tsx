'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface RechartsGraphProps {
  title: string;
  data: { timestamp: number; value: number }[];
  unit: string;
  color: string;
}

export default function RechartsGraph({ title, data, unit, color }: RechartsGraphProps) {
  // Format data for Recharts (convert timestamp to time string)
  const chartData = data.map(item => ({
    time: new Date(item.timestamp).toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' }),
    value: Number(item.value.toFixed(2)),
  }));

  // Calculate stats
  const values = chartData.map(d => d.value);
  const currentValue = values[values.length - 1] || 0;
  const minValue = Math.min(...values, currentValue);
  const maxValue = Math.max(...values, currentValue);
  const avgValue = values.reduce((a, b) => a + b, 0) / values.length || 0;

  // Create gradient ID unique to this chart
  const gradientId = `gradient-${title.replace(/\s+/g, '-').toLowerCase()}`;

  // Determine gradient colors based on main color
  const getGradientColors = (baseColor: string) => {
    const gradients: Record<string, { from: string; to: string }> = {
      '#1A73E8': { from: '#1A73E8', to: '#1A73E850' },
      '#0B3C61': { from: '#0B3C61', to: '#0B3C6150' },
      '#10b981': { from: '#10b981', to: '#10b98150' },
      '#f59e0b': { from: '#f59e0b', to: '#f59e0b50' },
    };
    return gradients[baseColor] || { from: baseColor, to: `${baseColor}50` };
  };

  const gradientColors = getGradientColors(color);

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-500">Ingen data tilgjengelig</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="text-right">
          <div className="text-2xl font-bold" style={{ color }}>{currentValue.toFixed(1)}</div>
          <div className="text-xs text-gray-500">{unit}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
        <div>
          <div className="text-gray-500">Min</div>
          <div className="font-semibold text-gray-700">{minValue.toFixed(1)}</div>
        </div>
        <div>
          <div className="text-gray-500">Gj.sn</div>
          <div className="font-semibold text-gray-700">{avgValue.toFixed(1)}</div>
        </div>
        <div>
          <div className="text-gray-500">Maks</div>
          <div className="font-semibold text-gray-700">{maxValue.toFixed(1)}</div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={gradientColors.from} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={gradientColors.to} stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="#9ca3af"
            fontSize={11}
            tick={{ fill: '#6b7280' }}
            tickLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            stroke="#9ca3af"
            fontSize={11}
            tick={{ fill: '#6b7280' }}
            tickLine={{ stroke: '#e5e7eb' }}
            width={50}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              padding: '12px'
            }}
            labelStyle={{ color: '#374151', fontWeight: 600, marginBottom: '4px' }}
            formatter={(value: number) => [`${value.toFixed(2)} ${unit}`, 'Verdi']}
            cursor={{ stroke: color, strokeWidth: 2, strokeDasharray: '5 5' }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke={color}
            strokeWidth={3}
            fill={`url(#${gradientId})`}
            dot={false}
            activeDot={{ r: 6, fill: color, stroke: '#fff', strokeWidth: 2 }}
            animationDuration={300}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
