import React from "react";

export default function StockCard({
  title,
  value,
  loadingText = "جاري التحميل",
  description,
  icon: Icon,
  color = "blue", // blue, green, red <== اللون التلقائي ازرق
  loading = false
}) {
  // تحديد الألوان حسب النوع
  const colorConfigs = {
    blue: {
      border: "border-blue-200 dark:border-blue-600",
      text: "text-blue-600 dark:text-blue-400",
      shadow: "shadow-blue",
      icon: <Icon className="text-blue-500" />
    },
    green: {
      border: "border-green-200 dark:border-green-600",
      text: "text-green-600 dark:text-green-400",
      shadow: "shadow-green",
      icon: <Icon className="text-green-500" />
    },
    red: {
      border: "border-red-200 dark:border-red-600",
      text: "text-red-600 dark:text-red-400",
      shadow: "shadow-red",
      icon: <Icon className="text-red-500" />
    }
  };

  const config = colorConfigs[color] || colorConfigs.blue;

  return (
    <div
      className={`bg-gray-50 rounded-2xl ${config.shadow} p-6 hover:scale-105 transform duration-300 
            dark:bg-gray-700 dark:shadow-gray-900/40 border-2 border-solid ${config.border}`}
    >
      <h2 className="text-lg font-semibold text-gray-700 mb-2 dark:text-gray-200">
        {config.icon} {title}
      </h2>
      <p className={`text-3xl font-bold ${config.text}`}>
        {loading ? loadingText : value}
      </p>
      <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}