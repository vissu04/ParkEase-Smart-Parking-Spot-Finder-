import ReactApexChart from "react-apexcharts";
import { useDashboard } from "@/context/DashboardContext";
import ChartCard from "./ChartCard";


export default function BookingTrend() {
  const { chartdata, loading, error } = useDashboard();

  const months = chartdata?.months?.map((m) => m || "N/A") || [];

  const series = [
    {
      name: "Bookings",
      data: chartdata?.monthlyBookings || [],
    },
  ];

  const options = {
    chart: { type: "line", toolbar: { show: false } },
    stroke: { curve: "smooth", width: 3 },
    colors: ["#6366f1"],
    xaxis: { categories: months },
  };

  return (
    <ChartCard title="Booking Trend" loading={loading} error={error}>
      <ReactApexChart options={options} series={series} type="line" height={300} />
    </ChartCard>
  );
}