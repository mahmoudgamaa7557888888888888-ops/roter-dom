import { WarehouseManger } from "../context/WarehouseManager";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { useToast } from "./useToast";
import { useQueryClient } from "react-query";

export function useStock() {
  const [param] = useSearchParams();
  const dayName = param.get("dayName");
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const invalidData = () => {
    queryClient.invalidateQueries(["stock", dayName]);
  };

  const query = useQuery(["stock", dayName], async () => {
    const wm = new WarehouseManger(dayName, showToast);
    const stockData = await wm.getStock();
    const traders = await wm.getAllTraders();
    return { stockData, traders };
  });
  return {
    ...query,
    invalidData,
  };
}

export function useTrader(dayName, traderID) {
  return useQuery(["trader", dayName, traderID], async () => {
    const wm = new WarehouseManger(dayName);
    const trader = await wm.getTrader(traderID);
    const traderLog = await wm.getTraderLog(traderID);
    return { trader, traderLog };
  });
}

