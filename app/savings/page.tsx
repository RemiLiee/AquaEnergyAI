'use client';

import { useEffect, useState } from 'react';
import { optimizationEngine } from '@/lib/optimization';

interface SavingsData {
  daily: { date: string; savings: number; amount: number }[];
  monthly: { month: string; savings: number; amount: number }[];
  total: { savings: number; amount: number };
  roi: { paybackMonths: number; yearlySavings: number; threeYearROI: number };
}

export default function SavingsPage() {
  const [savingsData, setSavingsData] = useState<SavingsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        const response = await fetch('/api/optimization?gateway_id=demo-gateway');
        if (response.ok) {
          const result = await response.json();
          
          // Calculate ROI (example: Plug & Play package)
          const roi = optimizationEngine.calculateROI(
            result.analysis.savingsAmount,
            25000, // Initial cost
            2990 // Monthly subscription
          );

          // Generate mock historical data for visualization
          const daily = [];
          const monthly = [];
          for (let i = 29; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dailySavings = result.analysis.savingsAmount * (0.8 + Math.random() * 0.4);
            daily.push({
              date: date.toLocaleDateString('no-NO', { day: 'numeric', month: 'short' }),
              savings: result.analysis.potentialSavings * (0.9 + Math.random() * 0.2),
              amount: dailySavings,
            });
          }

          // Monthly aggregation
          const monthlyMap = new Map<string, { savings: number; amount: number; count: number }>();
          daily.forEach(d => {
            const month = new Date(d.date).toLocaleDateString('no-NO', { month: 'long', year: 'numeric' });
            if (!monthlyMap.has(month)) {
              monthlyMap.set(month, { savings: 0, amount: 0, count: 0 });
            }
            const monthData = monthlyMap.get(month)!;
            monthData.savings += d.savings;
            monthData.amount += d.amount;
            monthData.count += 1;
          });

          monthly.push(...Array.from(monthlyMap.entries()).map(([month, data]) => ({
            month,
            savings: data.savings / data.count,
            amount: data.amount,
          })));

          setSavingsData({
            daily,
            monthly,
            total: result.totalSavings,
            roi,
          });
        }
      } catch (error) {
        console.error('Error fetching savings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Laster besparelsesdata...</div>
      </div>
    );
  }

  if (!savingsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Ingen data tilgjengelig</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Energibesparelser</h1>
          <p className="text-gray-600">Oversikt over besparelser og ROI</p>
        </div>

        {/* Total Savings Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-6 border-2 border-green-200">
            <div className="text-sm text-green-700 mb-1">Total besparelse</div>
            <div className="text-4xl font-bold text-green-900">
              {Math.round(savingsData.total.amount).toLocaleString('no-NO')} kr
            </div>
            <div className="text-sm text-green-600 mt-2">
              {savingsData.total.savings.toFixed(1)}% reduksjon
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 border-2 border-blue-200">
            <div className="text-sm text-blue-700 mb-1">Årlig besparelse</div>
            <div className="text-4xl font-bold text-blue-900">
              {Math.round(savingsData.roi.yearlySavings).toLocaleString('no-NO')} kr
            </div>
            <div className="text-sm text-blue-600 mt-2">Etter abonnement</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-6 border-2 border-purple-200">
            <div className="text-sm text-purple-700 mb-1">Tilbakebetalingstid</div>
            <div className="text-4xl font-bold text-purple-900">
              {savingsData.roi.paybackMonths.toFixed(1)}
            </div>
            <div className="text-sm text-purple-600 mt-2">måneder</div>
          </div>
        </div>

        {/* ROI Information */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ROI-analyse</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-600 mb-1">3-års ROI</div>
              <div className="text-3xl font-bold text-primary-600">
                {savingsData.roi.threeYearROI.toFixed(0)}%
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Årlig netto besparelse</div>
              <div className="text-3xl font-bold text-green-600">
                {Math.round(savingsData.roi.yearlySavings).toLocaleString('no-NO')} kr
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Tilbakebetalingstid</div>
              <div className="text-3xl font-bold text-blue-600">
                {savingsData.roi.paybackMonths.toFixed(1)} mnd
              </div>
            </div>
          </div>
        </div>

        {/* Daily Savings Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Daglige besparelser (siste 30 dager)</h2>
          <div className="space-y-2">
            {savingsData.daily.slice(-7).map((day, index) => (
              <div key={index} className="flex items-center">
                <div className="w-24 text-sm text-gray-600">{day.date}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                  <div
                    className="bg-green-500 h-8 rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${Math.min(100, (day.amount / 5000) * 100)}%` }}
                  >
                    <span className="text-white text-xs font-semibold">
                      {Math.round(day.amount).toLocaleString('no-NO')} kr
                    </span>
                  </div>
                </div>
                <div className="w-20 text-right text-sm font-semibold text-gray-700">
                  {day.savings.toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

