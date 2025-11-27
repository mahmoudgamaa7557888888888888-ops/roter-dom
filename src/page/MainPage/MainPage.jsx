
import { useAllDays } from "../../context/AllDaysProvider";
import { Navigate, Outlet, useParams } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import AppLoader from "../../AppLoader/AppLoader";
export default function MainPage() {
  const {dayName} = useParams()
  const { selectedDay , daysLoading} = useAllDays()

 
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
