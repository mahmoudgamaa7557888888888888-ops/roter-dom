import { useAllDays } from "../../../../context/AllDaysProvider";

export default function AllDaysLest() {
  const { allDays, daysLoading, setSelectedDay } = useAllDays();

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      {/* زر القائمة */}
      <button
        onClick={(e) => {
          const content = e.currentTarget.nextElementSibling;
          content.classList.toggle("max-h-0");
          content.classList.toggle("max-h-full");
        }}
        className="
 w-full text-right px-4 py-3 rounded-xl 
 font-semibold text-gray-800 bg-gray-200 
 hover:bg-gray-300 transition-all 
 dark:text-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 relative
 "
      >
        اختر يوم عمل
      </button>

      {/* القائمة */}
      <div
        className=" absolute z-30
 max-h-0 overflow-hidden transition-all duration-500 
 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md mt-2
 "
      >
        <div className="p-3">
          {daysLoading ? (
            <p className="text-gray-600 dark:text-gray-300 text-sm text-right">
              جاري التحميل...
            </p>
          ) : (
            allDays.map((day) => (
              <div
                onClick={(e) => {
                  setSelectedDay(day.id);
                }}
                key={day.id}
                className="
 px-4 py-2 rounded-lg cursor-pointer
 hover:bg-gray-200 dark:hover:bg-gray-700 
 text-right font-medium text-gray-800 dark:text-gray-200
 transition-all
 "
              >
                {day.id}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
