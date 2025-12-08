import React from "react";
import TradersHeader from "./TradersHeader";

export default function TradersContainer({ name, children }) {
  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      <TradersHeader name={name} />
      {children}
    </div>
  );
}