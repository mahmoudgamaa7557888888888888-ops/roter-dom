import { getAllDayesPageData } from "../../../../../hoks/useStock";
import DayHeader from "./DayHeader";
import DaySummaryCards from "./DaySummaryCards";
import TraderList from "./TraderList";
import { motion, AnimatePresence } from "framer-motion";

export default function DayCard({ day, dayData, openDayId, toggleDay, dayname }) {
  const { data: traderData, isLoading, isFetching } = getAllDayesPageData(dayname);
  const isOpen = openDayId === day.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-3xl"
    >
      {/* Header */}
      <DayHeader
        day={day}
        openDayId={openDayId}
        dayData={dayData}
        toggleDay={toggleDay}
      />

      {/* Animated Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-8 py-8 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-800/50 dark:to-gray-900 space-y-8">
              {/* Loading State */}
              {(isLoading || isFetching) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">جاري تحميل بيانات اليوم...</p>
                </motion.div>
              )}

              {/* Content */}
              {!isLoading && !isFetching && traderData && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-8"
                >
                  <DaySummaryCards traderData={traderData} isFetching={isFetching} />

                  <TraderList traderData={traderData} isLoading={isLoading} />
                </motion.div>
              )}

              {/* Empty State */}
              {!isLoading && !isFetching && (!traderData || traderData.allTradersDaysPage.length === 0) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl"
                >
                  <div className="text-5xl mb-4">📊</div>
                  <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                    لا توجد بيانات تجارية
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    لم يتم تسجيل أي عمليات تداول في هذا اليوم
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Footer */}
      {isOpen && (
        <div className="px-8 py-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>جاهز للعرض</span>
            </div>
            <div>
              تم التحديث: {new Date().toLocaleTimeString('ar-EG')}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}