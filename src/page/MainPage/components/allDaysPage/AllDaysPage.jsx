import AppLoader from "../../../../AppLoader/AppLoader";
import { useState } from "react";
import { useAllDays } from "../../../../context/AllDaysProvider";
import { useQueryClient } from "react-query";
import DayCard from "./AllDaysPageComponent/DayCard";
import { FaCalendarAlt, FaDatabase, FaSearch } from "react-icons/fa";
import { useMemo } from "react";

export default function AllDaysPage() {
  const { allDays, daysLoading, selectedDay } = useAllDays();
  const [openDayId, setOpenDayId] = useState(null);
  const [dayname, setDayname] = useState(selectedDay);
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("")

  if (daysLoading) return <AppLoader />;
  
 const filterDay = useMemo(()=>{
  return allDays.filter((day)=>{
    return day.id.toLowerCase().includes(searchQuery.toLowerCase())
  })
 },[searchQuery])

 console.log(allDays);
  const toggleDay = (id) => {
    setOpenDayId(openDayId === id ? null : id);
    setDayname(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-8">
      {/* Header Section */}
      <div className="mb-10 relative">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-200 to-transparent dark:from-blue-900/30 rounded-full -mr-16 -mt-10 opacity-60"></div>
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl">
                <FaDatabase className="text-white text-2xl" />
              </div>
              جميع أيام العمل
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              إدارة وتتبع جميع عمليات التداول يومياً
            </p>
          </div>
        
          
          
          <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="relative">
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <FaSearch className="text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث..."
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl py-3 px-12 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            )}
          </div>

            <FaCalendarAlt className="text-blue-600 dark:text-blue-400 text-2xl" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">الأيام المسجلة</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{allDays.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Days Grid */}
      <div className="space-y-6">
        {filterDay.length > 0 ?  (filterDay.map((day) => {
          const dayData = queryClient.getQueryData(["allPageData", day.id]);
          return (
            <DayCard
              key={day.id}
              day={day}
              dayData={dayData}
              openDayId={openDayId}
              toggleDay={toggleDay}
              dayname={dayname}
            />
          );
        })) :  (
        <div className="text-center py-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
            لا توجد نتائج مطابقة
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            لم نعثر على تجار يطابقون معايير البحث
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            عرض جميع الايام
          </button>
        </div>
      )

      
      
      }
      </div>
      
      {/* Empty State */}
      {allDays.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-block p-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-3xl shadow-lg">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">لا توجد أيام مسجلة</h3>
            <p className="text-gray-500 dark:text-gray-400">سيظهر هنا أيام العمل عند تسجيلها</p>
          </div>
        </div>
      )}
    </div>
  );
}