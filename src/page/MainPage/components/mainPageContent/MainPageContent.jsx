import{ useContext } from "react";
import { WarehouseManger } from "../../../../context/WarehouseManager";
import { AuthStateContext } from "../../../../context/AuthStateContext";
import { useToast } from "../../../../hoks/useToast";
import { useStock } from "../../../../hoks/useStock";
import { useAllDays } from "../../../../context/AllDaysProvider";
import AppLoader from "../../../../AppLoader/AppLoader";
import MainPageContainer from "./manPageCombonent/MainPageContainer";
import OverviewSection from "./manPageCombonent/OverviewSection";
import TradersQuickView from "./manPageCombonent/TradersQuickView";

export default function MainPageContent() {
  // const { user } = useContext(AuthStateContext);
  // const { showToast } = useToast();
  
  const { selectedDay } = useAllDays();

  
  const {
    data: stock_data,
    isFetching,
    isLoading: stockLoading,
    invalidData,
  } = useStock();

  // حالات التحميل والأخطاء
  if (!stock_data && !stockLoading) {
    return <AppLoader />;
  }

  if (!stockLoading && !stock_data?.stockData && !isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600 dark:text-red-400">
          هذا اليوم لا يوجد فيه معلومات او غير موجود ف قاعدة البينات
        </div>
      </div>
    );
  }

  return (
    // MainPageContainer - الي فيه الفريم او الحاويه الي فيها التصميم العام 
    <MainPageContainer
      selectedDay={selectedDay}
      stockLoading={stockLoading}
      stockData={stock_data?.stockData}
      traders={stock_data?.traders}
    >
      {/* Overview Section - هنا السيكشن المسؤول عن عرض البينات الاوليه */} 
      <OverviewSection
        stockLoading={stockLoading}
        stockData={stock_data?.stockData}
        selectedDay={selectedDay}
      />

      {/* Traders Quick View Section  - هنا المسؤول عن عرض التجار*/}
      <TradersQuickView
        stockLoading={stockLoading}
        traders={stock_data?.traders || []}
      />


    </MainPageContainer>
  );
}