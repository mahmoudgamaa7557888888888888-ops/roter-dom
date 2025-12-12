import React from "react";

export default function DaySummaryCards({ label, color, value, icon }) {
  return (
    <div
      className={`flex items-center border-l-4 border-${color}-500  justify-between p-6 rounded-2xl shadow-lg  bg-white dark:bg-gray-800 transform hover:scale-[1.02] transition-transform`}
    >
      
      <div className={`flex  flex-col text-right`}>
        <span className="text-gray-500 dark:text-gray-400 font-semibold">
          {label}
        </span>
        <span
          className={`text-2xl font-bold text-${color}-600 dark:text-${color}-400`}
        >
          {value}
        </span>
      </div>
      <div className="text-4xl">{icon}</div>
    </div>
  );
}
