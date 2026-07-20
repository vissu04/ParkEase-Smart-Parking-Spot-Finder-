import ReactApexChart from "react-apexcharts";
import { useDashboard } from "@/context/DashboardContext";
import ChartCard from "./ChartCard";

export default function HourlyHeat() {
  const { chartdata, loading, error } = useDashboard();

  const series = [
    {
      name: "Bookings",
      data: chartdata?.hourlyBookings || [],
    },
  ];

  const options = {
    chart: { type: "line", toolbar: { show: false } },
    stroke: { curve: "smooth" },
    colors: ["#f59e0b"],
    xaxis: {
      categories: chartdata?.hours || [],
    },
  };

  return (
    <ChartCard title="Hourly Booking Activity" loading={loading} error={error}>
      <ReactApexChart options={options} series={series} type="line" height={300} />
    </ChartCard>
  );
}