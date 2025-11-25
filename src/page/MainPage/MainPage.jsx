import AppLoader from "../../AppLoader/AppLoader";
import { WarehouseManger } from "../../context/WarehouseManager";
import { useQuery } from "react-query";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
export default function MainPage() {
  const [params] = useSearchParams();
  const dayName = params.get("dayName");

  const { data: allDays, isLoading } = useQuery(
    ["allDays"],
    async () => {
      const wm = new WarehouseManger();
      return wm.getAllStock();
    }
  );

  if (isLoading) return <AppLoader />;

  const latestDay = allDays?.at(-1)?.id;

  // If user entered /home without dayName → redirect
  if (!dayName && latestDay) {
    return <Navigate to={`/home?dayName=${latestDay}`} replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
