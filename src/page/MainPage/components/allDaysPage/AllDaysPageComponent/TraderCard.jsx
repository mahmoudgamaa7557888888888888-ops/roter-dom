import { FaUser, FaBoxes, FaTruck, FaMoneyBillWave, FaCube } from "react-icons/fa";
import { motion } from "framer-motion";

export default function TraderCard({ trader, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-5 border border-gray-100 dark:border-gray-700 overflow-hidden relative group transition-all duration-300"
    >
      {/* Header Section - Trader Name */}
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-md">
            <FaUser className="text-white text-lg" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">اسم التاجر</p>
            <p className="font-bold text-gray-800 dark:text-white text-lg">{trader.id}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-800 dark:text-blue-300 text-xs font-medium rounded-full">
            رقم {index + 1}
          </span>
        </div>
      </div>

      {/* Stats Grid - Organized in 2x2 layout */}
      <div className="grid grid-cols-2 gap-4">
        
        {/* المليان المستلم */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl border border-green-200 dark:border-green-700/30">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-sm">
              <FaBoxes className="text-white text-sm" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">المليان المستلم</p>
              <p className="font-bold text-gray-800 dark:text-white text-lg">{trader.traderMlian}</p>
            </div>
          </div>
        </div>
        
        {/* الفاضي المسلم */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl border border-blue-200 dark:border-blue-700/30">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-sm">
              <FaTruck className="text-white text-sm" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">الفاضي المسلم</p>
              <p className="font-bold text-gray-800 dark:text-white text-lg">{trader.traderFadi}</p>
            </div>
          </div>
        </div>
        
        {/* باقي الحديد */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-xl border border-orange-200 dark:border-orange-700/30">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg shadow-sm">
              <FaCube className="text-white text-sm" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">باقي الحديد</p>
              <p className="font-bold text-gray-800 dark:text-white text-lg">{trader.totalHadid}</p>
            </div>
          </div>
        </div>
        
        {/* الفلوس المدفوعة */}
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-4 rounded-xl border border-yellow-200 dark:border-yellow-700/30">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg shadow-sm">
              <FaMoneyBillWave className="text-white text-sm" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">الفلوس المدفوعة</p>
              <p className="font-bold text-gray-800 dark:text-white text-lg">{trader.traderMoney}</p>
            </div>
          </div>
        </div>
        
      </div>
      
      {/* Progress Bar for visual representation */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span>إجمالي التداول</span>
          <span>{(trader.traderMlian + trader.traderFadi + trader.traderMoney) || 0}</span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
            style={{ 
              width: `${Math.min(100, ((trader.traderMlian + trader.traderFadi + trader.traderMoney) / 5000) * 100)}%` 
            }}
          ></div>
        </div>
      </div>
    </motion.div>
  );
}