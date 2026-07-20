import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "leaflet/dist/leaflet.css";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { DashboardProvider } from "./context/DashboardContext";
import { ParkingUserProvider } from "./context/ParkingUserContext";
import { UserProvider } from "./context/UserContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <DashboardProvider>
        <ParkingUserProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </ParkingUserProvider>
      </DashboardProvider>
    </AuthProvider>
  </StrictMode>
);