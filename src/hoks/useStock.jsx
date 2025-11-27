import { WarehouseManger } from "../context/WarehouseManager";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { useToast } from "./useToast";
import { useQueryClient } from "react-query";
import { useAllDays } from "../context/AllDaysProvider";
import AppLoader from "../AppLoader/AppLoader";

export function useStock() {
  const { selectedDay, daysLoading } = useAllDays();
  const [param] = useSearchParams();
 
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const dayName = selectedDay;

  const invalidData = () => {
    queryClient.invalidateQueries(["stock", dayName]);
  };

 
  const query = useQuery(
    ["stock", dayName],
    async () => {
      const wm = new WarehouseManger(dayName, showToast);
      const stockData = await wm.getStock();
      const traders = await wm.getAllTraders();
      console.log("تمت العمليه");
      return { stockData, traders };
    },
    {
      enabled: !!dayName,
    }
  );

  return {
    ...query,
    invalidData,
  };
}

export function useTrader(traderID) {
  const { selectedDay, daysLoading } = useAllDays();
  return useQuery(["trader", selectedDay, traderID], async () => {
    const wm = new WarehouseManger(selectedDay);
    const trader = await wm.getTrader(traderID);
    const traderLog = await wm.getTraderLog(traderID);
    return { trader, traderLog };
  });
}
