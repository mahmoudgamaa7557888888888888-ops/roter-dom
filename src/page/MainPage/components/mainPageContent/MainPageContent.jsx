import { useContext, useEffect, useState } from "react";
import { WarehouseManger } from "../../../../context/WarehouseManager";
import { AuthStateContext } from "../../../../context/AuthStateContext";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import { Link, useSearchParams } from "react-router-dom";

export default function MainPageContent() {
  const { user } = useContext(AuthStateContext);
  const [name, setName] = useState("يوسف");
  const [mlian, setMlian] = useState("15");
  const [money, setMoney] = useState("4950");
  const [fadi, setFadi] = useState("1");
  const [trader, setTrader] = useState([]);
  const [dats, setData] = useState(null);
  const today = new Date().toDateString();
  const [param] = useSearchParams();
  const dayName = param.get("dayName");

  const mangerOfWarehouse = new WarehouseManger(dayName);
  useEffect(() => {
    async function getDayName() {
      const d = await mangerOfWarehouse.getAllStock();
    }
    getDayName();
  }, []);

  useEffect(() => {
    const unsbscribe = mangerOfWarehouse.getStock((newData) => {
      setData(newData);
    });
    return () => unsbscribe();
  }, []);

  useEffect(() => {
    async function getTraders() {
      const traders = await mangerOfWarehouse.getAllTraders();
      setTrader(traders);
    }
    getTraders();
  }, []);

  function ehandler() {
    mangerOfWarehouse.addStock(mlian, fadi, money);
  }

  return (
    <div className="min-h-screen  bg-gray-100  py-10 px-6">
      <div className="max-w-6xl h-full mx-auto text-center">
        <h1>اليوم : {dayName}</h1>
        <section className="bg-white mb-6 shadow-md rounded-2xl p-6 ">
          <h1 className="text-3xl font-bold  hover:text-blue-400 transform duration-150 hover:scale-105 mb-10 text-gray-800">
            نظرة عامة على الحساب
          </h1>

          {/* الكروت الأساسية */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* كارت المليان */}
            <div className="bg-gray-50 rounded-2xl shadow-lg p-6 hover:scale-105 transform duration-300">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                <EventAvailableIcon /> المليان
              </h2>
              <p className="text-3xl font-bold text-green-600">
                {dats ? dats.available_mlian : "جاري التحميل"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                المليان المتبقي فالمخزن
              </p>
            </div>

            {/* كارت الفاضي */}
            <div className="bg-gray-50  rounded-2xl shadow-lg p-6 hover:scale-105 transform duration-300">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                {" "}
                <AssignmentTurnedInOutlinedIcon /> الفاضي
              </h2>
              <p className="text-3xl font-bold text-blue-600">
                {dats ? dats.available_fadi : "جاري التحميل"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                الفاضي الي تم استلامه وموجود فالمخزن
              </p>
            </div>

            {/* كارت المتبقي */}
            <div className="bg-gray-50  rounded-2xl shadow-lg p-6 hover:scale-105 transform duration-300">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                {" "}
                <AssessmentOutlinedIcon /> المتبقي
              </h2>
              <p className="text-3xl font-bold text-red-600">
                {dats ? dats.available_money : "جاري التحميل"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                الفاضي الي برا لسه مش مستلم
              </p>
            </div>
          </div>

          {/* القسم السفلي */}
          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6">
            <Link
              to="add-day"
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              🚚 إنشاء نقلة جديدة
            </Link>

            <Link
              to="all-days"
              className="bg-pink-600 hover:bg-pink-700 text-white text-lg font-semibold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              📦 عرض جميع النقل
            </Link>
          </div>
        </section>
        <section className="bg-white shadow-md rounded-2xl p-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold m-5 hover:text-blue-400 transform duration-150 hover:scale-105 mb-10 text-gray-800">
              نظرة عامه على التجار
            </h1>

            <div className="w-full px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {trader.map((t) => (
                  <Link key={t.id} to={`trader?name=${t.id}&&day=${today}`}>
                    <div className="w-full max-w-sm bg-gray-50 rounded-2xl shadow-md p-4 hover:shadow-lg transition">
                      <h1 className="text-gray-800 font-semibold text-base truncate">
                        {t.id}
                      </h1>

                      <p className="text-green-600 font-bold text-xl mt-2">
                        باقي الحديد [
                        <span className="text-red-600">
                          {t.totalHadid ?? "-"}
                        </span>
                        ]
                      </p>
                      <p className="text-sm text-gray-500 mt-3">
                        اضغط لعرض جميع التفاصيل
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <button onClick={ehandler}>test</button>
    </div>
  );
}
