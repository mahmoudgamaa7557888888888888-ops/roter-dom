// import { WarehouseManger } from "../../../../context/WarehouseManager";
// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import { useTrader } from "../../../../hoks/useStock";

// export default function Traders() {
//   const {name} = useParams();
//   console.log(name);
  

//   const { data: trData, isLoading: traderLoading } = useTrader(name);


//   return (
//     <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
//       {/* عنوان الصفحة */}
//       <header className="mb-6 text-center">
//         <h1 className="text-3xl font-bold transform duration-150 hover:scale-110 hover:text-indigo-600 text-gray-800 dark:text-gray-100">
//           سجل التاجر <br />
//           <span className="text-5xl dark:text-gray-100">{name}</span>
//         </h1>
//         <p className="text-gray-600 text-lg mt-1 dark:text-gray-400">
//           هنا ستجد جميع معاملات التاجر
//         </p>
//       </header>

//       {/* القسم الرئيسي للمعلومات */}
//       <section className="bg-white shadow-md rounded-2xl p-6 mb-6 dark:bg-gray-800 dark:shadow-gray-900/40">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4 dark:text-gray-100">
//           ملخص الحساب
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
//           <div
//             className="bg-gray-100 rounded-lg p-4 text-center transform duration-300 hover:shadow-md hover:scale-110 
//           dark:bg-gray-700 dark:shadow-gray-900/40"
//           >
//             <p className="text-gray-500 text-sm dark:text-gray-400">
//               عدد المليان الي خده
//             </p>
//             <p className="text-blue-600 font-bold text-lg dark:text-blue-400">
//               {traderLoading ? "جاري التحميل" : trData.trader.traderMlian}
//             </p>
//           </div>

//           <div
//             className="bg-gray-100 rounded-lg p-4 text-center transform duration-300 hover:shadow-md hover:scale-110 
//           dark:bg-gray-700 dark:shadow-gray-900/40"
//           >
//             <p className="text-gray-500 text-sm dark:text-gray-400">
//               عدد الفاضي الي سلمه
//             </p>
//             <p className="text-red-600 font-bold text-lg dark:text-red-400">
//               {traderLoading ? "جاري التحميل" : trData.trader.traderFadi}
//             </p>
//           </div>

//           <div
//             className="bg-gray-100 rounded-lg p-4 text-center transform duration-300 hover:shadow-md hover:scale-110 
//           dark:bg-gray-700 dark:shadow-gray-900/40"
//           >
//             <p className="text-gray-500 text-sm dark:text-gray-400">
//               الحديد المتبقي عنده
//             </p>
//             <p className="text-green-600 font-bold text-lg dark:text-green-400">
//               {traderLoading ? "جاري التحميل" : trData.trader.totalHadid}
//             </p>
//           </div>

//           <div
//             className="bg-gray-100 rounded-lg p-4 text-center transform duration-300 hover:shadow-md hover:scale-110 
//           dark:bg-gray-700 dark:shadow-gray-900/40"
//           >
//             <p className="text-gray-500 text-sm dark:text-gray-400">
//               الفلوس الي دفعها
//             </p>
//             <p className="text-yellow-600 font-bold text-lg dark:text-yellow-400">
//               {traderLoading ? "جاري التحميل" : trData.trader.traderMoney}
//             </p>
//           </div>

//           <div
//             className="bg-gray-100 rounded-lg p-4 text-center transform duration-300 hover:shadow-md hover:scale-110 
//           dark:bg-gray-700 dark:shadow-gray-900/40"
//           >
//             <p className="text-gray-500 text-sm dark:text-gray-400">
//               الإجمالي \ المتبقي
//             </p>
//             <p className="text-purple-600 font-bold text-lg dark:text-purple-400">
//               5
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Logs */}
//       <section className="bg-white shadow-md rounded-2xl p-6 dark:bg-gray-800 dark:shadow-gray-900/40">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4 dark:text-gray-100">
//           سجل الأحداث
//         </h2>

//         <div className="space-y-2">
//           <div className="flex justify-between bg-gray-100 p-3 rounded-lg dark:bg-gray-700">
//             <span className="dark:text-gray-200">تاريخ الوصول:</span>
//             <span className="dark:text-gray-300">{"غير معلوم"}</span>
//           </div>

//           <div className="flex justify-between bg-gray-100 p-3 rounded-lg dark:bg-gray-700">
//             <span className="dark:text-gray-200">آخر مرة حمل:</span>
//             <span className="dark:text-gray-300">
//               {traderLoading ? "جاري التحميل" : trData.trader.waqt}
//             </span>
//           </div>

//           {traderLoading
//             ? "جاري التحميل"
//             : trData.traderLog?.map((log) => {
//                 return (
//                   <div
//                     key={log.id}
//                     className="border border-gray-300 rounded-2xl bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md mx-auto 
//                 dark:bg-gray-700 dark:border-gray-600 dark:shadow-gray-900/40"
//                   >
//                     <button
//                       onClick={(e) => {
//                         const content = e.currentTarget.nextElementSibling;
//                         content.classList.toggle("max-h-0");
//                         content.classList.toggle("max-h-96");
//                       }}
//                       className="w-full text-left px-4 py-3 font-semibold text-gray-800 hover:bg-gray-100 transition
//                   dark:text-gray-100 dark:hover:bg-gray-600"
//                     >
//                       سجل المعاملات - {name}
//                       <span className="text-gray-500 text-sm dark:text-gray-300">
//                         {" "}
//                         {log.waqt}{" "}
//                       </span>
//                     </button>

//                     <div className="px-4 max-h-0 overflow-hidden transition-all duration-300 dark:text-gray-200">
//                       {log.mlian ? (
//                         <p className="py-2">
//                           <span className="font-medium">قام ب استلام :</span> [{" "}
//                           {log.mlian} ] - مليان
//                         </p>
//                       ) : (
//                         ""
//                       )}

//                       {log.fadi ? (
//                         <p className="py-1">
//                           <span className="font-medium">قام بتسليم:</span> [{" "}
//                           {log.fadi} ] - فاضي
//                         </p>
//                       ) : (
//                         ""
//                       )}

//                       {log.money ? (
//                         <p className="py-1">
//                           <span className="font-medium">قام بدفع :</span> [{" "}
//                           {log.money} ج ]
//                         </p>
//                       ) : (
//                         ""
//                       )}

//                       <p className="py-1 text-gray-500 text-sm dark:text-gray-400">
//                         {log.waqt}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//         </div>
//       </section>
//     </div>
//   );
// }

import React from "react";
import { useParams } from "react-router-dom";
import { useTrader } from "../../../../hoks/useStock";
import AppLoader from "../../../../AppLoader/AppLoader";
import TradersContainer from "./traderCombonent/TradersContainer";
import TraderSummarySection from "./traderCombonent/TraderSummarySection";
import TraderLogsSection from "./traderCombonent/TraderLogsSection";

export default function Traders() {
  const { name } = useParams();
  const { data: trData, isLoading: traderLoading } = useTrader(name);

  // حالة التحميل
  if (traderLoading) {
    return <AppLoader />;
  }

  // حالة عدم وجود بيانات
  if (!trData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
            ⚠️ خطأ في تحميل البيانات
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            لا يمكن تحميل بيانات التاجر {name}
          </p>
        </div>
      </div>
    );
  }

  return (
    <TradersContainer name={name}>
      <TraderSummarySection 
        traderData={trData} 
        loading={traderLoading} 
      />
      
      <TraderLogsSection 
        traderData={trData} 
        loading={traderLoading}
        traderName={name}
      />
    </TradersContainer>
  );
}