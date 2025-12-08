import React from "react";

export default function TraderStatsCard({
  title,
  value,
  loadingText = "جاري التحميل",
  loading = false,
  color = "blue", // blue, red, green, yellow, purple
  icon // Optional icon component
}) {
  const colorConfigs = {
    blue: {
      text: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20"
    },
    red: {
      text: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-900/20"
    },
    green: {
      text: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/20"
    },
    yellow: {
      text: "text-yellow-600 dark:text-yellow-400",
      bg: "bg-yellow-50 dark:bg-yellow-900/20"
    },
    purple: {
      text: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-900/20"
    }
  };

  const config = colorConfigs[color] || colorConfigs.blue;

  return (
    <div
      className={`rounded-xl p-5 text-center transform duration-300 hover:shadow-lg hover:scale-105 
        ${config.bg} dark:shadow-gray-900/40`}
    >
      {icon && <div className="mb-2">{icon}</div>}
      <p className="text-gray-500 text-sm mb-2 dark:text-gray-400">
        {title}
      </p>
      <p className={`font-bold text-xl ${config.text}`}>
        {loading ? loadingText : value}
      </p>
    </div>
  );
}