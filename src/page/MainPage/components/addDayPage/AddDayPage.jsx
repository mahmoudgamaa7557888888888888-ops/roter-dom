import { WarehouseManger } from "../../../../context/WarehouseManager";
import { useState } from "react";



export default function newDay() {
  const [mlian, setMlian] = useState("300");
  const [fadi, setFadi] = useState("0");
  const [money, setMoney] = useState("0");
  const today = new Date().toDateString();
  const [dayName, setDayName] = useState(today);

  const mangerStockData = new WarehouseManger(dayName);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("📅 اسم اليوم:", dayName);
    console.log("🧴 عدد المليان:", mlian);
    console.log("🍶 عدد الفاضي:", fadi);
    mangerStockData.addStock(mlian, fadi, money);

    // هنا ممكن تحط كود إضافة البيانات في Firebase لو حبيت
    alert("تم حفظ البيانات بنجاح ✅");
  };

  return (
    <div>
      <div className="min-h-screen flex items-center  flex-col  bg-gray-100">
        <div className="text-center flex  items-center text-">
          <h1 className="text-blue-700 font-bold text-3xl"> حقل اضافه يوم عمل جديد</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 h-3/6 mt-9 w-3/6">
          <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
            اضافه بينات النقله
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block mb-1 font-medium">اسم اليوم</label>
              <input
                type="text"
                value={dayName}
                onChange={(e) => setDayName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="مثلاً: الأحد"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                عدد المليان في المخزن
              </label>
              <input
                type="number"
                value={mlian}
                onChange={(e) => setMlian(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="عدد المليان"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                عدد الفاضي في المخزن
              </label>
              <input
                type="number"
                value={fadi}
                onChange={(e) => setFadi(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="عدد الفاضي"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg py-2 mt-4 hover:bg-blue-700 transition"
            >
              حفظ البيانات
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
