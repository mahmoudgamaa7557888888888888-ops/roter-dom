
import React from 'react';
import LogContainer from './LogContainer';

export default function StockLogs() {
  const fakeLogs = [
    {
      id: 1,
      before: { mlian: 120, fadi: 45, money: 3000 },
      trader: { mlian: 10, fadi: 2, money: 150 },
      after: { mlian: 110, fadi: 47, money: 3150 },
      time: '10:22 AM'
    },
    {
      id: 2,
      before: { mlian: 110, fadi: 47, money: 3150 },
      trader: { mlian: 5, fadi: 1, money: 80 },
      after: { mlian: 105, fadi: 48, money: 3230 },
      time: '12:05 PM'
    },
    {
      id: 3,
      before: { mlian: 105, fadi: 48, money: 3230 },
      trader: { mlian: 15, fadi: 0, money: 200 },
      after: { mlian: 90, fadi: 48, money: 3430 },
      time: '3:40 PM'
    }
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">سجل التغييرات</h1>
      <LogContainer logs={fakeLogs} />
    </div>
  );
}
