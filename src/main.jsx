import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./i18n.js";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext.jsx";
import { HelmetProvider } from "react-helmet-async";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      {/* ✅ AuthProvider بقى يلف الكل */}
      <GoogleOAuthProvider clientId={clientId}>
        <HelmetProvider>
          <BrowserRouter>
            <SnackbarProvider
              maxSnack={3}
              autoHideDuration={3000}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <App />
            </SnackbarProvider>
          </BrowserRouter>
        </HelmetProvider>
      </GoogleOAuthProvider>
    </AuthProvider>
  </React.StrictMode>
);
