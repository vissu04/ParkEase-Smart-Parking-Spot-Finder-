import ReactApexChart from "react-apexcharts";
import { useDashboard } from "@/context/DashboardContext";
import ChartCard from "./ChartCard";

export default function ParkingUsage() {
  const { chartdata, loading, error } = useDashboard();

  const series = [
    {
      name: "Bookings",
      data: chartdata?.locationBookings || [],
    },
  ];

  const options = {
    chart: { type: "bar", toolbar: { show: false } },
    colors: ["#3b82f6"],
    plotOptions: {
      bar: { borderRadius: 6, columnWidth: "45%" },
    },
    xaxis: {
      categories: chartdata?.locations || [],
    },
  };

  return (
    <ChartCard title="Parking Usage" loading={loading} error={error}>
      <ReactApexChart options={options} series={series} type="bar" height={300} />
    </ChartCard>
  );
}