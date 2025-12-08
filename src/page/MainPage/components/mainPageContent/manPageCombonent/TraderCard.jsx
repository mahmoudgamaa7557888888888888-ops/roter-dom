import React from "react";
import { Link } from "react-router-dom";

export default function TraderCard({ trader }) {
  return (
    <Link to={`trader/${trader.id}`}>
      <div
        className="w-full max-w-sm bg-gray-50 rounded-2xl shadow-md p-4 hover:shadow-lg transition hover:scale-105 duration-300
                  dark:bg-gray-700 dark:shadow-gray-900/40 border border-gray-200 dark:border-gray-600"
      >
        <h1 className="text-gray-800 font-semibold text-base truncate dark:text-gray-100">
          {trader.id}
        </h1>
        <p className="text-green-600 font-bold text-xl mt-2 dark:text-green-400">
          باقي الحديد [
          <span className="text-red-600 dark:text-red-400 ml-1">
            {trader.totalHadid ?? "-"}
          </span>
          ]
        </p>
        <p className="text-sm text-gray-500 mt-3 dark:text-gray-400">
          اضغط لعرض جميع التفاصيل
        </p>
      </div>
    </Link>
  );
}