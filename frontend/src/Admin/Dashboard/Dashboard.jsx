import AdminLayout from "@/layouts/AdminLayout";
import StatCard from "@/layouts/StatCard";
import BookingTrend from "./BookingTrend";
import RevenueTrend from "./RevenueTrend";
import ParkingUsage from "./ParkingUsage";
import UserDistribution from "./UserDistribution";
import HourlyHeat from "./HourlyHeat";
import { useEffect, useState } from "react";
import { getDashboardStats } from "@/api/adminApi";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboardStats();
        setData(res);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = data
    ? [
        {
          title: "Total Parking Locations",
          value: data.totalLocations,
          change: "+0",
          changeType: "up",
          description: "Total locations",
        },
        {
          title: "Total Slots",
          value: data.totalSlots,
          change: "+0",
          changeType: "up",
          description: "All slots",
        },
        {
          title: "Available Slots",
          value: data.availableSlots,
          change: `${Math.round(
            (data.availableSlots / data.totalSlots) * 100
          )}%`,
          changeType: "up",
          description: "Live availability",
        },
        {
          title: "Booked Slots",
          value: data.bookedSlots,
          change: `${Math.round(
            (data.bookedSlots / data.totalSlots) * 100
          )}%`,
          changeType: "down",
          description: "Current occupancy",
        },
        {
          title: "Total Users",
          value: data.totalUsers,
          change: "+0",
          changeType: "up",
          description: "Registered users",
        },
        {
          title: "Total Bookings",
          value: data.totalBookings,
          change: "+0",
          changeType: "up",
          description: "All bookings",
        },
        {
          title: "Revenue",
          value: `₹${data.revenue}`,
          change: "+0",
          changeType: "up",
          description: "Total earnings",
        },
      ]
    : [];

  return (
    <AdminLayout>
      <div className="space-y-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array(4)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="h-24 bg-gray-100 animate-pulse rounded-xl"
                  />
                ))
            : stats.map((item, index) => (
                <StatCard key={index} {...item} />
              ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <BookingTrend />
          <RevenueTrend />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <ParkingUsage />
          <UserDistribution />
        </div>

        <div>
          <HourlyHeat />
        </div>

      </div>
    </AdminLayout>
  );
}