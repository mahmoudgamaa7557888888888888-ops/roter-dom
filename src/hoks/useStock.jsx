import { WarehouseManger } from "../context/WarehouseManager";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { useToast } from "./useToast";
import { useQueryClient } from "react-query";
import { useAllDays } from "../context/AllDaysProvider";


export function useStock() {
  const { selectedDay } = useAllDays();
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
      try {
        const stockData = await wm.getStock();
        const traders = await wm.getAllTraders();
        console.log("تمت العمليه");
        return { stockData, traders };
      } catch (err) {
        console.log("err when you get stock", err);
      }
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
    try {
      const trader = await wm.getTrader(traderID);
      const traderLog = await wm.getTraderLog(traderID);
      return { trader, traderLog };
    } catch (err) {
      console.log("err when you get all traders", err);
    }
  });
}

export function useAddNewTrader() {
  const { selectedDay, daysLoading } = useAllDays();
  const { showToast } = useToast();
  const wh = new WarehouseManger(selectedDay,showToast);
  async function addNewTrader(nameOfTrader, mlian, fadi, money) {
    try {
      await wh.addTrader(nameOfTrader, mlian, fadi, money);
    } catch (err) {
      console.log("err when you add new trader", err);
    }
  }
  return { addNewTrader }
}


export function getAllDayesPageData(dayid) {
  const { showToast } = useToast();
 
  return useQuery(["allPageData", dayid], async()=>{
    const wh = new WarehouseManger(dayid, showToast)
    try{
      const allTradersDaysPage = await wh.getAllTraders()
      const allStockDataDaysPage = await wh.getStock()
  

      return  {allTradersDaysPage, allStockDataDaysPage }
    }catch(e){
      console.log("Eror O.Killer", e);
      return
    }
  })
  
}