import { FaUser, FaBoxes, FaTruck, FaMoneyBillWave, FaChevronDown, FaChevronUp } from "react-icons/fa";


export default function TraderCard({ traderName, traderMlian, traderFadi, traderHadid, traderMoney ,toggle, selectedID }) {
  

  return (
    <div className="bg-white dark:bg-gray-800 border  border-gray-300 dark:border-gray-700 rounded-2xl shadow-md overflow-hidden transition-all">
      {/* Header */}
      <button
        onClick={() => toggle(traderName)}
        className="w-full flex justify-between items-center p-4 text-right focus:outline-none"
      >
        <span className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
          <FaUser /> {traderName}
        </span>
        {selectedID === traderName ? (
          <FaChevronUp className="text-gray-500 dark:text-gray-300" />
        ) : (
          <FaChevronDown className="text-gray-500 dark:text-gray-300" />
        )}
      </button>

      {/* Content */}
      <div
        className={`transition-all duration-500 ease-in-out bg-gray-50  dark:bg-gray-900 ${
          selectedID === traderName ? "max-h-[500px] opacity-100 p-4" : "max-h-0 opacity-0 overflow-hidden p-0"
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 o text-gray-800 dark:text-gray-100 text-sm">
          <div className="bg-white dark:bg-gray-700 p-3 rounded-xl shadow flex justify-between items-center">
            <span className="font-semibold">المليان المستلم:</span>
            <span className="flex items-center gap-1"><FaBoxes /> {traderMlian}</span>
          </div>

          <div className="bg-white dark:bg-gray-700 p-3 rounded-xl shadow flex justify-between items-center">
            <span className="font-semibold">الفاضي المسلم:</span>
            <span className="flex items-center gap-1"><FaTruck /> {traderFadi}</span>
          </div>

          <div className="bg-white dark:bg-gray-700 p-3 rounded-xl shadow flex justify-between items-center">
            <span className="font-semibold">باقي الحديد:</span>
            <span className="flex items-center gap-1"><FaBoxes /> {traderHadid}</span>
          </div>

          <div className="bg-white dark:bg-gray-700 p-3 rounded-xl shadow flex justify-between items-center">
            <span className="font-semibold">الفلوس المدفوعة:</span>
            <span className="flex items-center gap-1"><FaMoneyBillWave /> {traderMoney}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
