
import { useAllDays } from "../../context/AllDaysProvider";
import { Outlet, useParams } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
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
