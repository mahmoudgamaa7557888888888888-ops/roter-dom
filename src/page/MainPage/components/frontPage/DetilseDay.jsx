import { FaBoxOpen, FaDollarSign, FaUsers, FaTruck, FaMoneyBillWave } from "react-icons/fa";

export default function AnalyticsDataCards() {
  const fakeData = [
    { label: "المليان المتوفر", value: 50, icon: <FaBoxOpen className="text-green-500" />, color: "green" },
    { label: "المليان المباع", value: 20, icon: <FaBoxOpen className="text-red-500" />, color: "red" },
    { label: "الفرداني المباع", value: 15, icon: <FaUsers className="text-yellow-500" />, color: "yellow" },
    { label: "الفاضي المستلم", value: 30, icon: <FaTruck className="text-blue-500" />, color: "blue" },
    { label: "الفاضي اللي برا", value: 12, icon: <FaTruck className="text-purple-500" />, color: "purple" },
    { label: "الفلوس المستلمة", value: 2000, icon: <FaDollarSign className="text-indigo-500" />, color: "indigo" },
    { label: "الفلوس عند التجار", value: 500, icon: <FaMoneyBillWave className="text-pink-500" />, color: "pink" },
  ];

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-right">تحليل بيانات اليوم</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {fakeData.map((item) => (
          <div
            key={item.label}
            className={`flex items-center justify-between p-6 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 transform hover:scale-[1.02] transition-transform`}
          >
            <div className="flex flex-col text-right">
              <span className="text-gray-500 dark:text-gray-400 font-semibold">{item.label}</span>
              <span className={`text-2xl font-bold text-${item.color}-600 dark:text-${item.color}-400`}>
                {item.value}
              </span>
            </div>
            <div className="text-4xl">
              {item.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
