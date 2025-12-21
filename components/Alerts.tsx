'use client';

import { useState } from 'react';
import { Alert } from '@/lib/sensorSimulator';

interface AlertsProps {
  alerts: Alert[];
}

export default function Alerts({ alerts }: AlertsProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['error', 'warning'])); // Error og warning er åpne som standard

  const toggleGroup = (type: string) => {
    setExpandedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(type)) {
        newSet.delete(type);
      } else {
        newSet.add(type);
      }
      return newSet;
    });
  };

  if (alerts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Varsler</h2>
        <p className="text-gray-500 text-sm">Ingen aktive varsler</p>
      </div>
    );
  }

  // Group alerts by type
  const groupedAlerts = {
    error: alerts.filter(a => a.type === 'error'),
    warning: alerts.filter(a => a.type === 'warning'),
    info: alerts.filter(a => a.type === 'info'),
  };

  // Sort each group by timestamp (newest first)
  Object.keys(groupedAlerts).forEach(key => {
    groupedAlerts[key as keyof typeof groupedAlerts].sort((a, b) => b.timestamp - a.timestamp);
  });

  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'error':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const renderGroup = (type: 'error' | 'warning' | 'info', typeAlerts: Alert[]) => {
    if (typeAlerts.length === 0) return null;

    const isExpanded = expandedGroups.has(type);
    const typeLabels = {
      error: 'Kritiske varsler',
      warning: 'Advarsler',
      info: 'Informasjon',
    };
    const typeColors = {
      error: 'text-red-800 border-red-300 bg-red-50',
      warning: 'text-yellow-800 border-yellow-300 bg-yellow-50',
      info: 'text-blue-800 border-blue-300 bg-blue-50',
    };

    return (
      <div key={type} className="border rounded-lg overflow-hidden">
        <button
          onClick={() => toggleGroup(type)}
          className={`w-full px-4 py-3 flex items-center justify-between font-semibold text-sm transition-colors ${typeColors[type]}`}
        >
          <div className="flex items-center gap-2">
            {getAlertIcon(type)}
            <span>{typeLabels[type]}</span>
            <span className="text-xs font-normal opacity-75">({typeAlerts.length})</span>
          </div>
          <svg
            className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isExpanded && (
          <div className="p-2 space-y-2 max-h-64 overflow-y-auto bg-white">
            {typeAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`border rounded-lg p-2.5 flex items-start space-x-2 text-sm ${getAlertColor(alert.type)}`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium leading-tight">{alert.message}</p>
                  <p className="text-xs opacity-75 mt-0.5">
                    {new Date(alert.timestamp).toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Varsler</h2>
      <div className="space-y-2">
        {renderGroup('error', groupedAlerts.error)}
        {renderGroup('warning', groupedAlerts.warning)}
        {renderGroup('info', groupedAlerts.info)}
      </div>
    </div>
  );
}

