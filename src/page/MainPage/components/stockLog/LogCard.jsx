import React from 'react';
import { motion } from 'framer-motion';
import { FaExchangeAlt, FaUserTie, FaHistory, FaArrowRight } from 'react-icons/fa';

export default function LogCard({ before, trader, after, time }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
      className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl p-6 relative overflow-hidden border border-gray-100"
    >
      {/* خلفية زخرفية */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-full -mr-10 -mt-10"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100 to-transparent rounded-full -ml-8 -mb-8"></div>
      
      {/* رأس البطاقة */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-md">
            <FaExchangeAlt className="text-white text-xl" />
          </div>
          <div>
            <h2 className="font-bold text-xl text-gray-800">عملية تداول</h2>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <FaHistory className="text-blue-500" />
              <span>آخر تحديث: {time}</span>
            </p>
          </div>
        </div>
        <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium shadow-md">
          البينات
        </div>
      </div>
      
      {/* محتوى البطاقة */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 relative z-10">
        {/* قسم "قبل" */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-md p-5 border-l-4  border-red-400 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400"></span>
              قبل العملية
            </h3>
            <div className="text-xs text-gray-500">المخزن قبل</div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
              <span className="text-gray-600 font-medium">مليان</span>
              <span className="text-xl font-bold text-red-600">{before.mlian}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
              <span className="text-gray-600 font-medium">فاضي</span>
              <span className="text-xl font-bold text-red-500">{before.fadi}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
              <span className="text-gray-600 font-medium">فلوس</span>
              <span className="text-xl font-bold text-red-700">{before.money}</span>
            </div>
          </div>
        </motion.div>
        
        {/* قسم "عملية التاجر" */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-blue-400 hover:shadow-lg transition-all duration-300 relative lg:order-2"
        >
          <div className="absolute -top-3 left-1/2  transform -translate-x-1/2">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg">
              <FaUserTie className="text-white text-xl" />
            </div>
          </div>
          
          <div className="mt-4 mb-6">
            <h3 className="font-bold text-lg text-gray-800 flex items-center justify-center gap-2">
              عملية التاجر
            </h3>
            <p className="text-center text-sm text-gray-500 mt-1">تفاصيل المعاملة</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
              <span className="text-gray-600 font-medium">مليان</span>
              <span className="text-xl font-bold text-blue-600">{trader.mlian}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
              <span className="text-gray-600 font-medium">فاضي</span>
              <span className="text-xl font-bold text-blue-500">{trader.fadi}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
              <span className="text-gray-600 font-medium">فلوس</span>
              <span className="text-xl font-bold text-blue-700">{trader.money}</span>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
              <FaHistory className="text-blue-500" />
              <span className="text-sm text-gray-600">الوقت: {time}</span>
            </div>
          </div>
        </motion.div>
        
        {/* قسم "بعد" */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-green-400 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-400"></span>
              بعد العملية
            </h3>
            <div className="text-xs text-gray-500">النتيجة النهائية</div>
          </div>
          
          <div className="  space-y-4 ">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
              <span className="text-gray-600 font-medium">مليان</span>
              <span className="text-xl font-bold text-green-600">{after.mlian}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
              <span className="text-gray-600 font-medium">فاضي</span>
              <span className="text-xl font-bold text-green-500">{after.fadi}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
              <span className="text-gray-600 font-medium">فلوس</span>
              <span className="text-xl font-bold text-green-700">{after.money}</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* أسهم التنقل بين الأقسام */}
      <div className="hidden lg:flex items-center justify-center gap-4 mb-6 relative z-10">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 shadow-md">
          <FaArrowRight />
        </div>
        <div className="w-16 h-1 bg-gradient-to-r from-red-400 to-blue-400 rounded-full"></div>
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 shadow-md">
          <FaArrowRight />
        </div>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-green-400 rounded-full"></div>
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 shadow-md">
          <FaArrowRight />
        </div>
      </div>
      
      {/* ملخص العملية */}
      <div className="relative z-10 pt-6 border-t border-gray-100">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
              <FaUserTie className="text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-800">عملية تاجر</p>
              <p className="text-sm text-gray-500">تمت بنجاح</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-red-600">{before.mlian}</div>
              <div className="text-xs text-gray-500">مليان (قبل)</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">{trader.mlian}</div>
              <div className="text-xs text-gray-500">مليان (تاجر)</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">{after.mlian}</div>
              <div className="text-xs text-gray-500">مليان (بعد)</div>
            </div>
          </div>
          
          <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-sm font-medium shadow-md">
            مكتملة ✓
          </div>
        </div>
      </div>
    </motion.div>
  );
}