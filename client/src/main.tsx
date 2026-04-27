import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GymLogProvider } from "./context/GymLogContext";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GymLogProvider>
      <App />
    </GymLogProvider>
  </StrictMode>
);