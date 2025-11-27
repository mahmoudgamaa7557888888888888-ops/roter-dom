import { WarehouseManger } from "./WarehouseManager";
import { createContext, useState } from "react";
import { useQuery } from "react-query";
import { useContext } from "react";
import { useEffect } from "react";

export const allDaysContext = createContext(null);
export default function AllDaysProvider({ children }) {
  const { data: allDays, isLoading: daysLoading } = useQuery(
    ["allDays"],
    async () => {
      const wm = new WarehouseManger();
      return wm.getAllStock();
    }
  );

  const [selectedDay, setSelectedDay] = useState(
    localStorage.getItem("selected") || null
  );

  useEffect(() => {
    localStorage.setItem("selected", selectedDay);
  }, [selectedDay]);

  useEffect(() => {
    if (!daysLoading && allDays.length > 0) {
      const LSvalue = localStorage.getItem("selected");
      if (!LSvalue || LSvalue === "null") {
        setSelectedDay(allDays?.at(-1)?.id);
      }
    }
  }, [daysLoading, allDays]);
  return (
    <allDaysContext.Provider
      value={{ allDays, daysLoading, selectedDay, setSelectedDay }}
    >
      {children}
    </allDaysContext.Provider>
  );
}
export const useAllDays = () => useContext(allDaysContext);
