import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
    <RecoilRoot>
      <Router>
        <App />
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              icon: false,
              style: {
                fontFamily: "Poppins",
                background: "#28a745",
                color: "#fff",
                padding: "12px 20px",
                borderRadius: "6px",
              },
            },
            error: {
              icon: false,
              style: {
                fontFamily: "Poppins",
                background: "#dc3545",
                color: "#fff",
                padding: "12px 20px",
                borderRadius: "6px",
              },
            },
          }}
        />
      </Router>
    </RecoilRoot>
);