import { AuthStateContext } from "../context/AuthStateContext";
import React, { useEffect } from "react";
import { useContext } from "react";
import AppLoader from "./AppLoader";
import { Navigate } from "react-router-dom";
import { WarehouseManger } from "../context/WarehouseManager";
import { useState } from "react";

export default function LoginGuard({ children }) {
  const { user, loading } = useContext(AuthStateContext);

  if (loading) return <AppLoader />;

  if (user) return <Navigate to="/home" replace />;

  return children;
}
