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
import AppLoader from "./AppLoader/AppLoader";
import LoginGurd from "./AppLoader/LoginGurd";
import AuthGurd from "./AppLoader/AuthGurd";

function App() {
  const { user, loading } = useContext(AuthStateContext);
  if (loading) {
    return <AppLoader />;
  }

  return (
    <>
      <Routes>
        <Route
          path="/home"
          element={
            <AuthGurd>
              <MainPage />
            </AuthGurd>
          }
        >
          <Route index element={<MainPageContent />} />
          <Route path="trader" element={<Traders />} />
          <Route path="add-day" element={<AddDayPage />} />
          <Route path="all-days" element={<AllDaysPage />} />
        </Route>
        <Route
          path="/"
          element={
            <AuthGurd>
              <MainPage />
            </AuthGurd>
          }
        />

        <Route
          path="/login"
          element={
            <LoginGurd>
              <LoginPage />
            </LoginGurd>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
