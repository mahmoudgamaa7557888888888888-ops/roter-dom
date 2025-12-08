import AppLoader from "../../../../AppLoader/AppLoader";
import { useState } from "react";
import { useAllDays } from "../../../../context/AllDaysProvider";
import { getAllDayesPageData } from "../../../../hoks/useStock";
import { useQueryClient } from "react-query";
import { FaBoxes, FaTruck, FaMoneyBillWave, FaUser } from "react-icons/fa";

export default function AllDaysPage() {
  const { allDays, daysLoading, selectedDay } = useAllDays();
  const [openDayId, setOpenDayId] = useState(null);
  const [dayname, setDayname] = useState(selectedDay);
  const { data: traderData, isLoading, isFetching } = getAllDayesPageData(dayname);
  const queryClinte = useQueryClient();

  if (daysLoading) return <AppLoader />;

  const toggleDay = (id) => {
    setOpenDayId(openDayId === id ? null : id);
    setDayname(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-right">
        جميع أيام العمل
      </h1>

      <div className="space-y-5">
        {allDays.map((day) => {
          const dayData = queryClinte.getQueryData(["allPageData", day.id]);
          return (
            <div
              key={day.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-700 transition-transform transform hover:scale-[1.01]"
            >
              {/* Header */}
              <button
                onClick={() => toggleDay(day.id)}
                className="w-full px-5 py-4 flex justify-between items-center text-right focus:outline-none"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between w-full">
                  <span className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200">
                    {day.id}
                  </span>

                  {openDayId !== day.id && (
                    <div className="mt-2 sm:mt-0 text-sm sm:text-base flex space-x-3 justify-start sm:justify-end">
                      <span className="px-2 py-1 rounded-lg bg-green-100 dark:bg-green-800 text-green-800 dark:text-white flex items-center">
                         
                      <FaBoxes className="ml-1" />  .  .المليان:   {dayData?.allStockDataDaysPage.available_mlian ?? ""}
                      </span>
                      <span className="px-2 py-1 rounded-lg bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-white flex items-center">
                        <FaTruck className="ml-1" />
                        الفاضي: {dayData?.allStockDataDaysPage.available_fadi ?? ""}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-gray-500 dark:text-gray-400 ml-3 text-xl">
                  {openDayId === day.id ? "▲" : "▼"}
                </span>
              </button>

              {/* Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out
                  ${openDayId === day.id ? "max-h-[2000px] opacity-100 px-5 py-4" : "max-h-0 opacity-0 px-5 py-0"}
                `}
              >
                <div className="space-y-3 text-right">
                  {/* Day Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-green-50 dark:bg-green-900 p-3 rounded-xl shadow flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-green-700 dark:text-green-200">المليان:</span>{" "}
                        <span className="dark:text-white">
                           {isFetching ? "جاري التحميل" : traderData.allStockDataDaysPage.available_mlian}
                        </span>
                      </div>
                       < FaBoxes className="text-green-600 dark:text-green-400 text-2xl" />
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-xl shadow flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-blue-700 dark:text-blue-200">الفاضي : </span>{" "}
                        <span className="dark:text-white">
                          {isFetching ? "جاري التحميل" : traderData.allStockDataDaysPage.available_fadi}
                        </span> 
                      </div>
                         <FaTruck className="text-blue-600 dark:text-blue-400 text-2xl" /> 
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900 p-3 rounded-xl shadow flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-yellow-700 dark:text-yellow-200">الإجمالي:</span>{" "}
                        <span className="dark:text-white">
                           {isFetching ? "جاري التحميل" : traderData.allStockDataDaysPage.available_money}
                        </span>
                      </div>
                       <FaMoneyBillWave className="text-yellow-600 dark:text-yellow-400 text-2xl" />
                    </div>
                  </div>

                  {/* Traders List */}
                  {traderData && traderData.allTradersDaysPage.length > 0 &&  !isLoading && (
                    <div className="mt-3 space-y-3 ">
                      <div className="text-center"><span> قائمه التجار</span></div>
                      {traderData.allTradersDaysPage.map((trader) => (
                        <div
                          key={trader.id}
                          className="bg-white  dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 shadow hover:shadow-lg transition-shadow"
                        >
                          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:space-x-4 text-gray-800 dark:text-white">
                            <span className="flex items-center">
                              <FaUser className="ml-1" />  .  .<span className="font-semibold">الاسم :  {trader.id}</span> 
                            </span>
                            <span className="flex items-center">
                              <FaBoxes className="ml-1" /> .  .<span className="font-semibold">المليان الي استلمه : {trader.traderMlian} </span> 
                            </span>
                            <span className="flex items-center">
                              <FaTruck className="ml-1" /> .  . <span className="font-semibold">الفاضي الي سلمه  : {trader.traderFadi} </span> 
                            </span>
                            <span className="flex items-center">
                              <FaBoxes className="ml-1" />  .  .<span className="font-semibold">باقي الحديدالي عنده : {trader.totalHadid}</span> 
                            </span>
                            <span className="flex items-center">
                              <FaMoneyBillWave className="ml-1" /> .  . <span className="font-semibold">الفلوس الي قام بدفعها : {trader.traderMoney}</span> 
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
