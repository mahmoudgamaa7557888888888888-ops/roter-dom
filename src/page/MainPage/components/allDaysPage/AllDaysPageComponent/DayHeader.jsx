import { FaBoxes, FaTruck, FaCalendarDay, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function DayHeader({ day, openDayId, dayData, toggleDay }) {
  const isOpen = openDayId === day.id;
  
  return (
    <motion.button
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.995 }}
      onClick={() => toggleDay(day.id)}
      className="w-full px-8 py-6 flex justify-between items-center text-right focus:outline-none group bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/30 dark:hover:to-blue-800/30 rounded-t-2xl border-b border-gray-200 dark:border-gray-700 transition-all duration-300"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between w-full gap-4">
        {/* Day Name Section */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg">
            <FaCalendarDay className="text-white text-2xl" />
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-gray-900 dark:text-white block">
              {day.id}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              يوم عمل
            </span>
          </div>
        </div>

        {/* Stats Section */}
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-wrap gap-3"
          >
            <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl border border-green-200 dark:border-green-700/50 shadow-sm flex items-center gap-2">
              <FaBoxes className="text-green-600 dark:text-green-400" />
              <span className="font-semibold text-green-800 dark:text-green-300">
                المليان: {dayData?.allStockDataDaysPage?.available_mlian ?? "0"}
              </span>
            </div>
            
            <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl border border-blue-200 dark:border-blue-700/50 shadow-sm flex items-center gap-2">
              <FaTruck className="text-blue-600 dark:text-blue-400" />
              <span className="font-semibold text-blue-800 dark:text-blue-300">
                الفاضي: {dayData?.allStockDataDaysPage?.available_fadi ?? "0"}
              </span>
            </div>
            
            <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl border border-purple-200 dark:border-purple-700/50 shadow-sm">
              <span className="text-sm text-gray-500 dark:text-gray-400">انقر للتفاصيل</span>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Arrow Icon */}
      <div className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow group-hover:from-blue-100 group-hover:to-blue-200 dark:group-hover:from-blue-800 dark:group-hover:to-blue-900 ml-4 transition-all duration-300">
        {isOpen ? (
          <FaChevronUp className="text-blue-600 dark:text-blue-400 text-xl transition-transform" />
        ) : (
          <FaChevronDown className="text-gray-600 dark:text-gray-400 text-xl transition-transform" />
        )}
      </div>
    </motion.button>
  );
}