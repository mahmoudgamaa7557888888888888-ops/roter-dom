import React, { useState } from "react";

export default function TraderLogItem({ log, traderName }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border border-gray-200 rounded-2xl bg-white shadow-sm overflow-hidden transition-all duration-300 
      hover:shadow-md dark:bg-gray-700 dark:border-gray-600 dark:shadow-gray-900/40 dark:hover:shadow-gray-900/60">
      <button
        onClick={toggleExpand}
        className="w-full text-left px-5 py-4 font-semibold text-gray-800 hover:bg-gray-50 transition
          dark:text-gray-100 dark:hover:bg-gray-600 flex justify-between items-center"
      >
        <span>
          سجل المعاملات - {traderName}
          <span className="text-gray-500 text-sm font-normal ml-2 dark:text-gray-300">
            {log.waqt}
          </span>
        </span>
        <span className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      <div className={`px-5 overflow-hidden transition-all duration-300 dark:text-gray-200 ${
        isExpanded ? 'max-h-96 py-4' : 'max-h-0'
      }`}>
        {log.mlian && (
          <p className="py-2 flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="font-medium">قام باستلام:</span> 
            <span className="mx-2 font-bold text-green-600 dark:text-green-400">
              {log.mlian}
            </span>
            مليان
          </p>
        )}

        {log.fadi && (
          <p className="py-2 flex items-center">
            <span className="text-blue-500 mr-2">↗</span>
            <span className="font-medium">قام بتسليم:</span> 
            <span className="mx-2 font-bold text-blue-600 dark:text-blue-400">
              {log.fadi}
            </span>
            فاضي
          </p>
        )}

        {log.money && (
          <p className="py-2 flex items-center">
            <span className="text-yellow-500 mr-2">💰</span>
            <span className="font-medium">قام بدفع:</span> 
            <span className="mx-2 font-bold text-yellow-600 dark:text-yellow-400">
              {log.money} ج
            </span>
          </p>
        )}

        <div className="pt-3 mt-3 border-t border-gray-100 dark:border-gray-600">
          <p className="text-gray-500 text-sm dark:text-gray-400">
            ⏰ {log.waqt}
          </p>
        </div>
      </div>
    </div>
  );
}