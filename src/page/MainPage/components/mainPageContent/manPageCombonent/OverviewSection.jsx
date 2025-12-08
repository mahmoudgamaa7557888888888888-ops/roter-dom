import React from "react";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";
import { Link } from "react-router-dom";
import StockCard from "./StockCard";

export default function OverviewSection({
  stockLoading,
  stockData,
  selectedDay
}) {
  return (
    <section
      className="bg-white mb-6 shadow-md rounded-2xl p-6 
        dark:bg-gray-800 dark:shadow-gray-900/40"
    >
      <h1
        className="text-3xl font-bold hover:text-blue-400 transform duration-150 hover:scale-105 mb-10 text-gray-800 
          dark:text-gray-100"
      >
        نظرة عامة على الحساب
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* المليان */}
        <StockCard
          title="المليان"
          value={stockData?.available_mlian}
          loading={stockLoading}
          description="المليان المتبقي فالمخزن"
          icon={EventAvailableIcon}
          color="green"
        />

        {/* الفاضي */}
        <StockCard
          title="الفاضي"
          value={stockData?.available_fadi}
          loading={stockLoading}
          description="الفاضي الي تم استلامه وموجود فالمخزن"
          icon={AssignmentTurnedInOutlinedIcon}
          color="blue"
        />

        {/* المتبقي */}
        <StockCard
          title="المتبقي"
          value={stockData?.available_money}
          loading={stockLoading}
          description="الفاضي الي برا لسه مش مستلم"
          icon={AssessmentOutlinedIcon}
          color="red"
        />
      </div>

      <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6">
        <Link
          to={`detilse`}
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-6 rounded-2xl shadow-lg 
              transform hover:scale-105 transition-all duration-300 
              dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          🚚 إنشاء نقلة جديدة
        </Link>

        <Link
          to={`all-days?dayName=${selectedDay || "dayName"}`}
          className="bg-pink-600 hover:bg-pink-700 text-white text-lg font-semibold py-3 px-6 rounded-2xl shadow-lg 
              transform hover:scale-105 transition-all duration-300 
              dark:bg-pink-500 dark:hover:bg-pink-600"
        >
          📦 عرض جميع النقل
        </Link>
      </div>
    </section>
  );
}