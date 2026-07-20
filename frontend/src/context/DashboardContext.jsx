import { createContext, useContext, useState, useEffect } from "react";
import { getDashboard } from "@/api/adminApi";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [chartdata, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboard();
        setChartData(res);
      } catch (err) {
        setError(err?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardContext.Provider value={{ chartdata, loading, error }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);