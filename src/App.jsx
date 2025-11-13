import LoginPage from "./page/login/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./page/MainPage/MainPage";
import RegisterPage from "./page/login/RegisterPage";
import NotFoundPage from "./page/NotFoundPage";
import { AuthStateContext } from "./context/AuthStateContext";
import { useContext, useEffect } from "react";
import MainPageContent from "./page/MainPage/components/mainPageContent/MainPageContent";
import AddDayPage from "./page/MainPage/components/addDayPage/AddDayPage";
import AllDaysPage from "./page/MainPage/components/allDaysPage/AllDaysPage";
import Traders from "./page/MainPage/components/Traders";
import { useState } from "react";
import { WarehouseManger } from "./context/WarehouseManager";

function App() {
  const [dayName, setDayName] = useState([])

  
  useEffect(() => {
    async function getDayName() {
      const m = new WarehouseManger();
      const d = await m.getAllStock();
      setDayName(d);
    }
    getDayName();
  }, []);

  const { user } = useContext(AuthStateContext);
  if (!user) {
    return (
      <>
        <Navigate to="/login" />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/home" element={<MainPage />}>
          <Route index element={<MainPageContent />} />
          <Route path="trader" element={<Traders />} />
          <Route path="add-day" element={<AddDayPage />} />
          <Route path="all-days" element={<AllDaysPage />} />
        </Route>

        <Route
          path="/login"
          element={user && dayName.length > 0 ? <Navigate to={`/home?dayName=${dayName.at(-1).id}`} /> : <LoginPage />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
