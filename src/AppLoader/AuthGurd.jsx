import { AuthStateContext } from "../context/AuthStateContext";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { WarehouseManger } from "../context/WarehouseManager";
import { useState } from "react";
import AppLoader from "./AppLoader";

export default function AuthGuard({ children }) {
  const { user, loading } = useContext(AuthStateContext);

  if (loading) return <AppLoader />;

  if (!user) return <Navigate to="/login" replace />;

  return children;  
}
