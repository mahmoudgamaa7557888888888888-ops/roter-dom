import React from "react";
import AllDaysLest from "../../allDaysPage/AllDaysLest";
import OverviewSection from "./OverviewSection";
import TradersQuickView from "./TradersQuickView";
import AddTraderF from "../../frontPage/addTrader";

export default function MainPageContainer({
  selectedDay,
  stockLoading,
  stockData,
  traders,
  children
}) {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 dark:bg-gray-900">
      <div className="max-w-6xl h-full mx-auto text-center">
        <div className="flex items-center justify-between">
          <h1 className="dark:text-gray-100">اليوم : {selectedDay}</h1>
          <div>
            <AllDaysLest />
          </div>
        </div>

        {children}

        {/* الزرار العائم */}
        <div>
          <AddTraderF /> {/* ده الزرار بتاع اضافه تاجر  */}
        </div>
      </div>
    </div>
  );
}