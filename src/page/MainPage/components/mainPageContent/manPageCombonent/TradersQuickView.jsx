import TraderCard from "./TraderCard";

export default function TradersQuickView({ stockLoading, traders }) {
  if (!traders || traders.length === 0) {
    return null;
  }

  return (
    <section
      className="bg-white shadow-md rounded-2xl p-6 mb-6 
        dark:bg-gray-800 dark:shadow-gray-900/40"
    >
      <h1
        className="text-3xl font-bold m-5 hover:text-blue-400 transform duration-150 hover:scale-105 mb-10 text-gray-800 
          dark:text-gray-100"
      >
        نظرة عامه على التجار
      </h1>

      <div className="w-full px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stockLoading 
              /* هنا سكيليتون لودينج  */
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full max-w-sm bg-gray-50 rounded-2xl shadow-md p-4 animate-pulse 
                  dark:bg-gray-700"
                >
                  <div className="h-4 bg-gray-300 rounded dark:bg-gray-600 mb-3"></div>
                  <div className="h-6 bg-gray-300 rounded dark:bg-gray-600 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded dark:bg-gray-600"></div>
                </div>
              ))
            : traders.map((trader) => (
                <TraderCard key={trader.id} trader={trader} />
              ))}
        </div>
      </div>
    </section>
  );
}