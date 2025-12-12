import { FaBoxes, FaTruck, FaMoneyBillWave, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";

export default function DaySummaryCards({ traderData, isFetching }) {
  const cards = [
    {
      icon: FaBoxes,
      title: "المليان",
      value: traderData?.allStockDataDaysPage?.available_mlian ,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      darkBgColor: "from-green-900/30 to-green-800/30",
      iconColor: "text-green-600 dark:text-green-400",
      loadingText: "جاري التحميل"
    },
    {
      icon: FaTruck,
      title: "الفاضي",
      value: traderData?.allStockDataDaysPage?.available_fadi,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      darkBgColor: "from-blue-900/30 to-blue-800/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      loadingText: "جاري التحميل"
    },
    {
      icon: FaMoneyBillWave,
      title: "الفلوس",
      value: traderData?.allStockDataDaysPage?.available_money + "$",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "from-yellow-50 to-yellow-100",
      darkBgColor: "from-yellow-900/30 to-yellow-800/30",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      loadingText: "جاري التحميل"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
           <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="md:col-span-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow">
              <FaChartLine className="text-white text-xl" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 dark:text-white text-lg">ملخص اليوم</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">إجمالي العمليات والمخزون</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">
              {!isFetching ? "جاهز للعرض" : "جاري التحميل..."}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">حالة البيانات</div>
          </div>
        </div>
      </motion.div>
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -8, scale: 1.02 }}
          className={`bg-gradient-to-br ${card.bgColor} dark:${card.darkBgColor} rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 relative overflow-hidden group transition-all duration-300`}
        >
          {/* Decorative Background */}
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${card.color} opacity-10 rounded-full -mr-10 -mt-10`}></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex-1">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{card.title}</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">
                {isFetching ? card.loadingText : card.value || "0"}
              </p>
              <div className="flex items-center gap-2 mt-4">
                <div className={`w-full h-2 bg-gradient-to-r ${card.color} rounded-full opacity-80`}></div>
              </div>
            </div>
            
            <div className={`p-4 bg-gradient-to-br ${card.color} rounded-2xl shadow-lg ml-4`}>
              <card.icon className="text-white text-2xl" />
            </div>
          </div>
          
          {/* Status Indicator */}
          <div className="mt-4 flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${card.color}`}></div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {!isFetching ? "محدث" : "جاري التحديث"}
            </span>
          </div>
        </motion.div>
      ))}
      
   
 
    </div>
  );
}