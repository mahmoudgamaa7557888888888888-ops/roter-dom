import { useContext, useEffect, useState } from "react";
import { WarehouseManger } from "../../../../context/WarehouseManager";
import { AuthStateContext } from "../../../../context/AuthStateContext";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import { Link, useSearchParams } from "react-router-dom";
import { useToast } from "../../../../hoks/useToast";
import { useStock } from "../../../../hoks/useStock";
import AllDaysLest from "../allDaysPage/AllDaysLest";
import { useAllDays } from "../../../../context/AllDaysProvider";
import AppLoader from "../../../../AppLoader/AppLoader";

export default function MainPageContent() {
  const { user } = useContext(AuthStateContext);
  const [name, setName] = useState("عمرو");
  const [mlian, setMlian] = useState("15");
  const [money, setMoney] = useState("4950");
  const [fadi, setFadi] = useState("1");
  const [param] = useSearchParams();
  const dayName = param.get("dayName");
  const { showToast } = useToast();
  const { selectedDay } = useAllDays();

  const mangerOfWarehouse = new WarehouseManger(selectedDay, showToast);
  const { data: stock_data, isFetching, isLoading: stockLoading, invalidData } = useStock();

if (!stock_data && !stockLoading) {

  return <AppLoader/>;
}
if (!stockLoading && !stock_data.stockData && !isFetching){
  return <div>هذا اليوم لا يوجد فيه معلومات او غير موجود ف قاعدة البينات</div>
}


  const thisday = localStorage.getItem("selected")
  console.log(thisday);
  function ehandler() {
    mangerOfWarehouse.addTrader(name, mlian, fadi, money);
    invalidData();
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 dark:bg-gray-900">
      <div className="max-w-6xl h-full mx-auto text-center">
        <div className="flex items-center justify-between ">
          <h1 className="dark:text-gray-100 ">اليوم : {selectedDay}</h1>
          <div>
            <AllDaysLest />
          </div>
        </div>

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
            <div
              className="bg-gray-50 rounded-2xl shadow-lg p-6 hover:scale-105 transform duration-300 
            dark:bg-gray-700 dark:shadow-gray-900/40"
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-2 dark:text-gray-200">
                <EventAvailableIcon /> المليان
              </h2>

              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {stockLoading
                  ? "جاري التحميل"
                  : stock_data.stockData.available_mlian}
              </p>

              <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
                المليان المتبقي فالمخزن
              </p>
            </div>

            {/* الفاضي */}
            <div
              className="bg-gray-50 rounded-2xl shadow-lg p-6 hover:scale-105 transform duration-300 
            dark:bg-gray-700 dark:shadow-gray-900/40"
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-2 dark:text-gray-200">
                <AssignmentTurnedInOutlinedIcon /> الفاضي
              </h2>

              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {stockLoading
                  ? "جاري التحميل"
                  : stock_data.stockData.available_fadi}
              </p>

              <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
                الفاضي الي تم استلامه وموجود فالمخزن
              </p>
            </div>

            {/* المتبقي */}
            <div
              className="bg-gray-50 rounded-2xl shadow-lg p-6 hover:scale-105 transform duration-300 
            dark:bg-gray-700 dark:shadow-gray-900/40"
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-2 dark:text-gray-200">
                <AssessmentOutlinedIcon /> المتبقي
              </h2>

              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                {stockLoading
                  ? "جاري التحميل"
                  : stock_data.stockData.available_money}
              </p>

              <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
                الفاضي الي برا لسه مش مستلم
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6">
            <Link
              to={`add-day?dayName=${dayName}`}
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-6 rounded-2xl shadow-lg 
              transform hover:scale-105 transition-all duration-300 
              dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              🚚 إنشاء نقلة جديدة
            </Link>

            <Link
              to={`all-days?dayName=${dayName}`}
              className="bg-pink-600 hover:bg-pink-700 text-white text-lg font-semibold py-3 px-6 rounded-2xl shadow-lg 
              transform hover:scale-105 transition-all duration-300 
              dark:bg-pink-500 dark:hover:bg-pink-600"
            >
              📦 عرض جميع النقل
            </Link>
          </div>
        </section>

        <section
          className="bg-white shadow-md rounded-2xl p-6 mb-6 
        dark:bg-gray-800 dark:shadow-gray-900/40"
        >
          <h1
            className="text-3xl font-bold m-5 hover:text-blue-400 transform duration-150 hover:scale-105 mb-10 text-gray-800 
          dark:text-gray-100"
          >
            نظرة عامه على التجار
          </h1>

          <div className="w-full px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {stockLoading
                ? ""
                : stock_data.traders?.map((t) => (
                    <Link
                      key={t.id}
                      to={`trader/${t.id}`}
                    >
                      <div
                        className="w-full max-w-sm bg-gray-50 rounded-2xl shadow-md p-4 hover:shadow-lg transition 
                  dark:bg-gray-700 dark:shadow-gray-900/40"
                      >
                        <h1 className="text-gray-800 font-semibold text-base truncate dark:text-gray-100">
                          {t.id}
                        </h1>

                        <p className="text-green-600 font-bold text-xl mt-2 dark:text-green-400">
                          باقي الحديد [
                          <span className="text-red-600 dark:text-red-400">
                            {t.totalHadid ?? "-"}
                          </span>
                          ]
                        </p>

                        <p className="text-sm text-gray-500 mt-3 dark:text-gray-400">
                          اضغط لعرض جميع التفاصيل
                        </p>
                      </div>
                    </Link>
                  ))}
            </div>
          </div>
        </section>
      </div>

      <button onClick={ehandler} className="dark:text-gray-200">
        test
      </button>
    </div>
  );
}
