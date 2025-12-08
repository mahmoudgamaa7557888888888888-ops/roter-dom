import React from "react";

export default function TradersHeader({ name }) {
  return (
    <header className="mb-6 text-center">
      <h1 className="text-3xl font-bold transform duration-150 hover:scale-110 hover:text-indigo-600 text-gray-800 dark:text-gray-100">
        سجل التاجر <br />
        <span className="text-5xl dark:text-gray-100">{name}</span>
      </h1>
      <p className="text-gray-600 text-lg mt-1 dark:text-gray-400">
        هنا ستجد جميع معاملات التاجر
      </p>
    </header>
  );
}