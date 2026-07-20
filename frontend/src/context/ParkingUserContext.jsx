import React, { createContext, useState, useEffect } from "react";
import {
  getAllParkingsPublic,
  getParkingByIdPublic,
} from "@/api/parkingApi";

export const ParkingUserContext = createContext();

export const ParkingUserProvider = ({ children }) => {
  const [parkings, setParkings] = useState([]);
  const [parking, setParking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(parkings)

  const fetchParkings = async () => {
    setLoading(true);
    try {
      const data = await getAllParkingsPublic();

      console.log("✅ Backend Data:", data);

      
      const safeData = data.map((p) => ({
        ...p,
        parkingName: p.parkingName || "Unknown Parking",
        parkingAddress: p.parkingAddress || "Location not available",
        parkingPrice: p.parkingPrice || 20,
        availableSlot: p.availableSlot ?? 0,
        totalSlot: p.totalSlot ?? 0,
        evAvailable: p.evAvailable ?? 0,
        evStation: p.evStation ?? 0,
      }));

      setParkings(safeData);

    } catch (err) {
      console.error("❌ Context Error:", err);
      setError(err.message);
    }
    setLoading(false);
  };

  const fetchParking = async (id) => {
    setLoading(true);
    try {
      const data = await getParkingByIdPublic(id);
      setParking(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchParkings();
  }, []);

  return (
    <ParkingUserContext.Provider
      value={{
        parkings,
        parking,
        loading,
        error,
        fetchParking,
      }}
    >
      {children}
    </ParkingUserContext.Provider>
  );
};