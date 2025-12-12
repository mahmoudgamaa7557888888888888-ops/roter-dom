import TraderCard from "./TraderCard";
import {
  FaUsers,
  FaListAlt,
  FaSortAmountDown,
  FaFilter,
  FaSearch,
  FaBoxes,
  FaTruck,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useState, useMemo } from "react";

export default function TraderList({ traderData, isLoading }) {
  const [sortBy, setSortBy] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    hasMlian: false,
    hasFadi: false,
    hasMoney: false,
  });

  if (!traderData || traderData.allTradersDaysPage.length === 0 || isLoading)
    return null;

  // Filter and sort traders
  const filteredTraders = useMemo(() => {
    return traderData.allTradersDaysPage.filter((trader) => {
      // Search by name
      const matchesSearch = trader.id.toLowerCase().includes(searchQuery.toLowerCase());

      // Apply filters
      const matchesFilters =
        (!selectedFilters.hasMlian || trader.traderMlian > 0) &&
        (!selectedFilters.hasFadi || trader.traderFadi > 0) &&
        (!selectedFilters.hasMoney || trader.traderMoney > 0);

      return matchesSearch && matchesFilters;
    });
  }, [traderData.allTradersDaysPage, searchQuery, selectedFilters]);

  // Sort traders
  const sortedTraders = [...filteredTraders].sort((a, b) => {
    if (sortBy === "name") return a.id.localeCompare(b.id);
    if (sortBy === "mlian") return b.traderMlian - a.traderMlian;
    if (sortBy === "fadi") return b.traderFadi - a.traderFadi;
    if (sortBy === "money") return b.traderMoney - a.traderMoney;
    return 0;
  });

  const totalTraders = traderData.allTradersDaysPage.length;
  const filteredCount = filteredTraders.length;
  const totalMlian = filteredTraders.reduce(
    (sum, t) => sum + (t.traderMlian || 0),
    0
  );
  const totalFadi = filteredTraders.reduce(
    (sum, t) => sum + (t.traderFadi || 0),
    0
  );

  // Handle filter toggle
  const toggleFilter = (filterName) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedFilters({
      hasMlian: false,
      hasFadi: false,
      hasMoney: false,
    });
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Search and Filter Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <FaSearch className="text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن تاجر بالاسم..."
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl py-3 px-12 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            )}
          </div>

          {/* Search Stats */}
          <div className="mt-3 flex justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {filteredCount === totalTraders ? (
                <span>عرض جميع التجار ({totalTraders})</span>
              ) : (
                <span>
                  عرض{" "}
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {filteredCount}
                  </span>{" "}
                  من أصل <span className="font-bold">{totalTraders}</span> تاجر
                </span>
              )}
            </div>
            {searchQuery && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                نتائج البحث عن: "
                <span className="font-bold">{searchQuery}</span>"
              </span>
            )}
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Section */}
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <FaFilter className="text-blue-500" />
              التصفية حسب النشاط
            </h4>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => toggleFilter("hasMlian")}
                className={`px-4 py-2 rounded-xl border transition-all flex items-center gap-2 ${
                  selectedFilters.hasMlian
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white border-green-600 shadow-md"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <FaBoxes className="text-sm" />
                <span>لديه مليان</span>
                {selectedFilters.hasMlian && <span>✓</span>}
              </button>

              <button
                onClick={() => toggleFilter("hasFadi")}
                className={`px-4 py-2 rounded-xl border transition-all flex items-center gap-2 ${
                  selectedFilters.hasFadi
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <FaTruck className="text-sm" />
                <span>لديه فاضي</span>
                {selectedFilters.hasFadi && <span>✓</span>}
              </button>

              <button
                onClick={() => toggleFilter("hasMoney")}
                className={`px-4 py-2 rounded-xl border transition-all flex items-center gap-2 ${
                  selectedFilters.hasMoney
                    ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-yellow-600 shadow-md"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <FaMoneyBillWave className="text-sm" />
                <span>دفع فلوس</span>
                {selectedFilters.hasMoney && <span>✓</span>}
              </button>

              {(searchQuery ||
                Object.values(selectedFilters).some(Boolean)) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                >
                  إعادة تعيين الكل
                </button>
              )}
            </div>
          </div>

          {/* Sorting Section */}
          <div className="lg:w-64">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <FaSortAmountDown className="text-purple-500" />
              ترتيب النتائج
            </h4>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl py-3 px-4 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none shadow-sm"
              >
                <option value="name">🔤 الترتيب الأبجدي</option>
                <option value="mlian">📦 المليان (الأعلى أولاً)</option>
                <option value="fadi">🚚 الفاضي (الأعلى أولاً)</option>
                <option value="money">💰 الفلوس (الأعلى أولاً)</option>
              </select>
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <FaSortAmountDown className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg">
            <FaUsers className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-800 dark:text-white">
              التجار المطابقون
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {filteredCount} تاجر مطابق للمعايير
            </p>
          </div>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          {filteredCount === 0 ? (
            <span className="text-red-500 dark:text-red-400">
              لا توجد نتائج مطابقة
            </span>
          ) : (
            <span className="text-green-600 dark:text-green-400">
              نتائج البحث جاهزة
            </span>
          )}
        </div>
      </div>

      {/* Grid Layout for Traders */}
      {filteredCount > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedTraders.map((trader, index) => (
            <TraderCard key={trader.id} trader={trader} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
            لا توجد نتائج مطابقة
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            لم نعثر على تجار يطابقون معايير البحث
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            عرض جميع التجار
          </button>
        </div>
      )}

      {/* Summary Footer */}
      {filteredCount > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl shadow p-6 border border-blue-200 dark:border-blue-700/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                التجار المعروضين
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {filteredCount}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                إجمالي المليان
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {totalMlian}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                إجمالي الفاضي
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {totalFadi}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                حالة البحث
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  نشط
                </p>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchQuery || Object.values(selectedFilters).some(Boolean)) && (
            <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-700/30">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                الفلاتر النشطة:
              </p>
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                    بحث: {searchQuery}
                  </span>
                )}
                {selectedFilters.hasMlian && (
                  <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 text-green-800 dark:text-green-300 rounded-full text-sm">
                    لديه مليان
                  </span>
                )}
                {selectedFilters.hasFadi && (
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                    لديه فاضي
                  </span>
                )}
                {selectedFilters.hasMoney && (
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 text-yellow-800 dark:text-yellow-300 rounded-full text-sm">
                    دفع فلوس
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
