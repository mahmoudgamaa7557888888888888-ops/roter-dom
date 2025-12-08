import React from "react";
import TraderLogItem from "./TraderLogItem";

export default function TraderLogsSection({ traderData, loading, traderName }) {
  const { traderLog, trader } = traderData || {};

  return (
    <section className="bg-white shadow-md rounded-2xl p-6 dark:bg-gray-800 dark:shadow-gray-900/40">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 dark:text-gray-100">
        📋 سجل الأحداث
      </h2>

      <div className="space-y-4">
        {/* معلومات ثابتة */}
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl dark:bg-gray-700">
          <span className="dark:text-gray-200 font-medium">تاريخ الوصول:</span>
          <span className="dark:text-gray-300">{"غير معلوم"}</span>
        </div>

        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl dark:bg-gray-700">
          <span className="dark:text-gray-200 font-medium">آخر مرة حمل:</span>
          <span className="dark:text-gray-300">
            {loading ? "جاري التحميل" : trader?.waqt || "غير متاح"}
          </span>
        </div>

        {/* سجل المعاملات */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700 mb-3 dark:text-gray-200">
            📝 سجل المعاملات
          </h3>
          
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, index) => (
                <div 
                  key={index} 
                  className="h-16 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : traderLog?.length > 0 ? (
            <div className="space-y-3">
              {traderLog.map((log) => (
                <TraderLogItem 
                  key={log.id} 
                  log={log} 
                  traderName={traderName}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              لا توجد معاملات مسجلة لهذا التاجر
            </div>
          )}
        </div>
      </div>
    </section>
  );
}