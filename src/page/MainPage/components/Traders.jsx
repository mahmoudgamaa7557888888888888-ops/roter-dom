import { WarehouseManger } from "../../../context/WarehouseManager";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export default function Traders() {
  const [traderData, setTraderData] = useState({});
  const [traderLog, setTraderLog] = useState([]);
  const mangerOfWarehouse = new WarehouseManger();
  const [param] = useSearchParams();
  const traderID = param.get("name")
  const traderDate = param.get("day")
  useEffect(() => {
    async function getTradeData() {
      const data = await mangerOfWarehouse.getTrader(traderID);
      const logData = await mangerOfWarehouse.getTraderLog(traderID);
      setTraderLog(logData);
      setTraderData(data);
    }
    getTradeData();
  }, []);
  console.log(traderLog);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* عنوان الصفحة */}
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold transform duration-150  hover:scale-110 hover:text-indigo-600 text-gray-800">
          سجل التاجر <br />
          <span className="text-5xl">{traderID}</span>
        </h1>
        <p className="text-gray-600 text-lg mt-1">
          هنا ستجد جميع معاملات التاجر
        </p>
      </header>

      {/* القسم الرئيسي للمعلومات */}
      <section className="bg-white shadow-md rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          ملخص الحساب
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div className="bg-gray-100 rounded-lg p-4 text-center transform duration-300 hover:shadow-md hover:scale-110">
            <p className="text-gray-500 text-sm">عدد المليان الي خده</p>
            <p className="text-blue-600 font-bold text-lg">
              {traderData.traderMlian ?? "0"}
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 text-center transform duration-300 hover:shadow-md hover:scale-110">
            <p className="text-gray-500 text-sm">عدد الفاضي الي سلمه</p>
            <p className="text-red-600 font-bold text-lg">
              {traderData.traderFadi}
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 text-center transform duration-300 hover:shadow-md hover:scale-110">
            <p className="text-gray-500 text-sm">الحديد المتبقي عنده</p>
            <p className="text-green-600 font-bold text-lg">
              {traderData.totalHadid}
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 text-center transform duration-300 hover:shadow-md hover:scale-110">
            <p className="text-gray-500 text-sm">الفلوس الي دفعها </p>
            <p className="text-yellow-600 font-bold text-lg">
              {traderData.traderMoney}
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 text-center transform duration-300 hover:shadow-md hover:scale-110">
            <p className="text-gray-500 text-sm">الإجمالي \ المتبقي </p>
            <p className="text-purple-600 font-bold text-lg">5</p>
          </div>
        </div>
      </section>

      {/* القسم الخاص بالـ Logs */}
      <section className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          سجل الأحداث
        </h2>
        <div className="space-y-2">
          {/* مثال على سجل */}
          <div className="flex justify-between bg-gray-100 p-3 rounded-lg">
            <span>تاريخ الوصول:</span>
            <span>{traderDate}</span>
          </div>
          <div className="flex justify-between bg-gray-100 p-3 rounded-lg">
            <span>آخر مرة حمل: </span>
            <span>{traderData.waqt}</span>
          </div>
          {/* [سجلات التاجر كلها]*/}
          {traderLog.map((log) => {
            return (
              <div key={log.id} className="border border-gray-300 rounded-2xl bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md  mx-auto">
                {/* زر الفتح */}
                <button
                  onClick={(e) => {
                    const content = e.currentTarget.nextElementSibling;
                    content.classList.toggle("max-h-0");
                    content.classList.toggle("max-h-96");
                  }}
                  className="w-full text-left px-4 py-3 font-semibold text-gray-800 hover:bg-gray-100 transition"
                >
                  سجل المعاملات {param.id} -
                   <span className="text-gray-500 text-sm"> {log.waqt} </span>
                </button>

                {/* المحتوى المخفي */}
                <div className="px-4 max-h-0 overflow-hidden transition-all duration-300">
                 {log.mlian ? <p className="py-2">
                    <span className="font-medium"> قام ب استلام : </span> [ {log.mlian} ] - مليان
                  </p> : ''}
                 {log.fadi ?  <p className="py-1">
                    <span className="font-medium">  قام بتسليم:  </span> [ {log.fadi} ] - فاضي
                  </p>: ''}
                  
                  {log.money ? <p className="py-1">
                    <span className="font-medium">قام بدفع : </span>[ {log.money}ج ]
                   
                  </p>:''}
                  <p className="py-1 text-gray-500 text-sm">{log.waqt}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
