import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthStateProvider } from "./context/AuthStateProvider";
import ToastProvider from "./context/ToastContext";
import ThemeProvider from "./context/themeContext";
import QuryCacheClientProvider from "./context/QuryCacheClientProvider";
import AppLoader from "./AppLoader/AppLoader";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<AppLoader />}>
      <BrowserRouter>
        <QuryCacheClientProvider>
          <AuthStateProvider>
            <ToastProvider>
              <ThemeProvider>
                <App />
              </ThemeProvider>
            </ToastProvider>
          </AuthStateProvider>
        </QuryCacheClientProvider>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);
