import ReactApexChart from "react-apexcharts";
import { useDashboard } from "@/context/DashboardContext";
import ChartCard from "./ChartCard";

export default function UserDistribution() {
  const { chartdata, loading, error } = useDashboard();

  const series = [
    chartdata?.dailyUsers || 0,
    chartdata?.weeklyUsers || 0,
    chartdata?.monthlyUsers || 0,
  ];

  const options = {
    labels: ["Daily", "Weekly", "Monthly"],
    colors: ["#6366f1", "#22c55e", "#f59e0b"],
    legend: { position: "bottom" },
  };

  return (
    <ChartCard title="User Activity" loading={loading} error={error}>
      <ReactApexChart options={options} series={series} type="donut" height={300} />
    </ChartCard>
  );
}