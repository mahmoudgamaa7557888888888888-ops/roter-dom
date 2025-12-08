import React from "react";
import TraderStatsCard from "./TraderStatsCard";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import AssignmentReturnedIcon from "@material-ui/icons/AssignmentReturned";
import IronIcon from "@material-ui/icons/Build";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";

export default function TraderSummarySection({ traderData, loading }) {
  const { trader } = traderData || {};

  return (
    <section className="bg-white shadow-md rounded-2xl p-6 mb-6 dark:bg-gray-800 dark:shadow-gray-900/40">
      <h2 className="text-xl font-semibold text-gray-700 mb-6 dark:text-gray-100">
        📊 ملخص الحساب
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <TraderStatsCard
          title="عدد المليان الي خده"
          value={trader?.traderMlian}
          loading={loading}
          color="blue"
          icon={<LocalShippingIcon className="text-blue-500" />}
        />

        <TraderStatsCard
          title="عدد الفاضي الي سلمه"
          value={trader?.traderFadi}
          loading={loading}
          color="red"
          icon={<AssignmentReturnedIcon className="text-red-500" />}
        />

        <TraderStatsCard
          title="الحديد المتبقي عنده"
          value={trader?.totalHadid}
          loading={loading}
          color="green"
          icon={<IronIcon className="text-green-500" />}
        />

        <TraderStatsCard
          title="الفلوس الي دفعها"
          value={trader?.traderMoney}
          loading={loading}
          color="yellow"
          icon={<AttachMoneyIcon className="text-yellow-500" />}
        />

        <TraderStatsCard
          title="الإجمالي / المتبقي"
          value="5" // قيمة ثابتة من الكود الأصلي
          loading={loading}
          color="purple"
          icon={<TrendingUpIcon className="text-purple-500" />}
        />
      </div>
    </section>
  );
}