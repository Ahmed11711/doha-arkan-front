import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./i18n.js";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack"; // ✅ استيراد المزود

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider
        maxSnack={3} // أقصى عدد رسائل تظهر في نفس الوقت
        autoHideDuration={3000} // المدة الزمنية قبل إخفاء الرسالة
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }} // مكان ظهور الرسائل
      >
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
