import React from "react";
import { useState, useEffect, createContext, useContext } from "react";

const ThemeContext = createContext(null);
export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return(
    <ThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
    </ThemeContext.Provider>
  ) ;
}
export const useTheme = ()=> useContext(ThemeContext)
