import { WarehouseManger } from "../../../../context/WarehouseManager";
import { useState } from "react";
import { useToast } from "../../../../hoks/useToast";

export default function newDay() {
  const [mlian, setMlian] = useState("300");
  const [fadi, setFadi] = useState("0");
  const [money, setMoney] = useState("0");
  const today = new Date().toDateString();
  const [dayName, setDayName] = useState(today);
  const { showToast } = useToast();

  const mangerStockData = new WarehouseManger(dayName);

  const handleSubmit = (e) => {
    e.preventDefault();

    mangerStockData.addStock(mlian, fadi, money);

    showToast("تم حفظ البيانات بنجاح ✅");
  };

  return (
    <div className="min-h-screen flex items-center flex-col bg-gray-100 dark:bg-gray-900">
      <div className="text-center flex items-center">
        <h1 className="text-blue-700 font-bold text-3xl dark:text-gray-100">
          حقل اضافه يوم عمل جديد
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 h-3/6 mt-9 w-4/5 md:w-3/6 
      dark:bg-gray-800 dark:shadow-gray-900/40">

        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400">
          اضافه بينات النقله
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div>
            <label className="block mb-1 font-medium dark:text-gray-200">
              اسم اليوم
            </label>
            <input
              type="text"
              value={dayName}
              onChange={(e) => setDayName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-none 
              focus:ring-2 focus:ring-blue-500
              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-400"
              placeholder="مثلاً: الأحد"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium dark:text-gray-200">
              عدد المليان في المخزن
            </label>
            <input
              type="number"
              value={mlian}
              onChange={(e) => setMlian(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-none 
              focus:ring-2 focus:ring-blue-500
              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-400"
              placeholder="عدد المليان"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium dark:text-gray-200">
              عدد الفاضي في المخزن
            </label>
            <input
              type="number"
              value={fadi}
              onChange={(e) => setFadi(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-none 
              focus:ring-2 focus:ring-blue-500
              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-400"
              placeholder="عدد الفاضي"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg py-2 mt-4 hover:bg-blue-700 transition 
            dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            حفظ البيانات
          </button>

        </form>
      </div>
    </div>
  );
}
