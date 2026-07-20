import ReactApexChart from "react-apexcharts";
import { useDashboard } from "@/context/DashboardContext";
import ChartCard from "./ChartCard";

export default function RevenueTrend() {
  const { chartdata, loading, error } = useDashboard();

  const months = chartdata?.months?.map((m) => m || "N/A") || [];

  const series = [
    {
      name: "Revenue",
      data: chartdata?.monthlyRevenue || [],
    },
  ];

  const options = {
    chart: { type: "area", toolbar: { show: false } },
    stroke: { curve: "smooth" },
    colors: ["#22c55e"],
    dataLabels: { enabled: false },
    fill: {
      type: "gradient",
      gradient: { opacityFrom: 0.7, opacityTo: 0.2 },
    },
    xaxis: { categories: months },
  };

  return (
    <ChartCard title="Revenue Growth" loading={loading} error={error}>
      <ReactApexChart options={options} series={series} type="area" height={300} />
    </ChartCard>
  );
}