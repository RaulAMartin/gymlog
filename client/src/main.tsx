import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import { GymLogProvider } from "./context/GymLogContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <GymLogProvider>
          <App />
        </GymLogProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
